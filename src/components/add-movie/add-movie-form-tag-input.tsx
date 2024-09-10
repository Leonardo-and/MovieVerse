import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './strict-mode-dropabble'
import {
  Control,
  useFieldArray,
  type UseFieldArrayProps,
} from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { type FormValues } from './add-movie-form'
import { Badge } from '@/components/ui/badge'
import { X as CloseIcon } from 'lucide-react'

interface TagInputProps {
  control: Control<FormValues>
  tag: UseFieldArrayProps<FormValues>['name']
}

export function TagInput({ control, tag }: TagInputProps) {
  const { fields, append, replace, remove } = useFieldArray({
    name: tag,
    control,
  })
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const updatedTag = Array.from(fields)

    const [moved] = updatedTag.splice(result.source.index, 1)
    updatedTag.splice(result.destination.index, 0, moved)

    replace(updatedTag)
  }

  const removeComma = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target

    input.value = input.value.replace(/,/g, '')
  }

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',') {
      const input = event.target as HTMLInputElement

      if (input.value !== '') {
        let tag = input.value.trim().replace(',', '')
        tag = tag[0].toUpperCase() + tag.substring(1)

        append({ value: tag })
        input.value = ''
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId={tag} direction="horizontal">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-row flex-wrap gap-2"
            >
              {fields.map((tag, index) => (
                <Draggable key={tag.id} draggableId={tag.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Badge className="cursor-auto">
                        {tag.value}{' '}
                        <CloseIcon
                          size={14}
                          className="ml-3"
                          onClick={() => remove(index)}
                        />
                      </Badge>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <Input
        type="text"
        className="min-w-72"
        placeholder={`${tag}, press the comma key to insert`}
        onKeyUp={addTag}
        onChange={removeComma}
      />
    </div>
  )
}

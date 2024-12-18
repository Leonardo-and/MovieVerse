import {
  type Control,
  type UseFieldArrayProps,
  useFieldArray,
} from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { type FormValues } from '../add-movie-form'
import {
  DndContext,
  //  type DragEndEvent,
  closestCenter,
} from '@dnd-kit/core'
import {
  //   arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
// import { SortableItem } from './sortable-item'

interface TagInputProps {
  control: Control<FormValues>
  tag: UseFieldArrayProps<FormValues>['name']
}

export function TagInput({ control, tag }: TagInputProps) {
  const {
    fields,
    append,
    // replace,
    //  remove
  } = useFieldArray({
    name: tag,
    control,
  })
  //   const onDragEnd = (event: DragEndEvent) => {
  //     const { active, over } = event

  //     if (over && active.id !== over.id) {
  //       const oldIndex = fields.findIndex((item) => item.id === active.id)
  //       const newIndex = fields.findIndex((item) => item.id === over.id)
  //       const updatedFields = arrayMove(fields, oldIndex, newIndex)
  //       replace(updatedFields)
  //     }
  //   }

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
      <DndContext
        //   onDragEnd={onDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={rectSortingStrategy}
        >
          <ul className="flex flex-row flex-wrap gap-2">
            {fields.map((tag) => (
              <div key={tag.id}>{tag.value}</div>
              //   <SortableItem
              //     key={tag.id}
              //     id={tag.id}
              //     index={index}
              //     value={tag.value}
              //     // onClick={() => remove(index)}
              //   />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Input
        type="text"
        className="min-w-72"
        placeholder={`${tag}, add a comma after each tag`}
        onKeyUp={addTag}
        onChange={removeComma}
      />
    </div>
  )
}

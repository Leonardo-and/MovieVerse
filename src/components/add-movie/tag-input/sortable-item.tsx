import { useSortable } from '@dnd-kit/sortable'
import { DraggableAttributes } from '@dnd-kit/core'
import { Badge } from '@/components/ui/badge'
import { CSS } from '@dnd-kit/utilities'
import { X as Close } from 'lucide-react'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

type SortableItemProps = DraggableAttributes &
  SyntheticListenerMap & {
    id: string
    value: string
    index: number
  }

export function SortableItem({ id, value, onClick }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <>
      <li ref={setNodeRef} style={style} {...attributes} {...listeners}></li>
      <Badge>
        {value}
        <div>
          <Close
            onClick={() => {
              onClick()
            }}
          />
        </div>
      </Badge>
    </>
  )
}

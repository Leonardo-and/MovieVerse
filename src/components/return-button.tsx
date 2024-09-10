import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function ReturnButton({
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'group absolute flex items-center justify-evenly overflow-hidden transition-all duration-300 hover:w-24',
        className,
      )}
      {...rest}
    >
      <span>
        <ChevronLeft className="size-8" />
      </span>
      <span className=" mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Return
      </span>
    </Button>
  )
}

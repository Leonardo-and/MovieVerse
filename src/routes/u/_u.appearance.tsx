import { createFileRoute } from '@tanstack/react-router'
import { Switch } from '@/components/ui/switch'
import { useUserSettingsStore } from '@/stores/user-settings-store'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const Route = createFileRoute('/u/_u/appearance')({
  component: Appaearance,
})

function Appaearance() {
  const {
    setSetting,
    settings: { animatedCards },
  } = useUserSettingsStore()

  return (
    <main className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize your experience
        </p>
      </div>
      <Separator />
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="flex-1">
          <Label className="text-lg">Animated Cards</Label>
          <div className="text-sm text-muted-foreground">
            Enable or disable animated movie cards
          </div>
        </div>
        <TooltipProvider>
          <div className="m-6">
            <Tooltip>
              <TooltipTrigger>
                <Switch
                  onCheckedChange={() => {
                    setSetting('animatedCards', !animatedCards)
                  }}
                  checked={animatedCards}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{animatedCards ? 'Disable' : 'Enable'} animated cards</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </main>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useUserSettingsStore } from '@/stores/user-settings-store'

export const Route = createFileRoute('/u/settings')({
  component: Settings,
})

function Settings() {
  const {
    setSetting,
    settings: { animatedCards },
  } = useUserSettingsStore()

  // TODO: make the settings page
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <main>
        <Switch
          id="animated"
          onCheckedChange={() => {
            setSetting('animatedCards', !animatedCards)
          }}
          checked={animatedCards}
        />
        <Label htmlFor="animated">Animate Cards</Label>
      </main>
    </div>
  )
}

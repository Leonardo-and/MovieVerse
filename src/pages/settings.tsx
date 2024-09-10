import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { usePersistentState } from '@/hooks/usePersistState'

export function Settings() {
  const [shouldAnimateCards, setShouldAnimateCards] = usePersistentState(
    'animated',
    true,
  )

  console.log(shouldAnimateCards)

  // TODO: make the settings page
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <main>
        <Switch
          id="animated"
          onCheckedChange={() => {
            setShouldAnimateCards(!shouldAnimateCards)
          }}
          checked={shouldAnimateCards}
        />
        <Label htmlFor="animated">Animated Cards?</Label>
      </main>
    </div>
  )
}

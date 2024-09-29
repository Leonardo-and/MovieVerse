import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserSettings {
  animatedCards: boolean
}

interface UserSettingsStore {
  settings: UserSettings
  setSetting: <K extends keyof UserSettings>(
    setting: K,
    value: UserSettings[K],
  ) => void
}

export const useUserSettingsStore = create(
  persist<UserSettingsStore>(
    (set) => ({
      settings: {
        animatedCards: true,
      },
      setSetting: (setting, value) =>
        set((state) => ({ settings: { ...state.settings, [setting]: value } })),
    }),
    {
      name: 'user-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

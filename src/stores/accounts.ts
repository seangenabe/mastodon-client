import type { Account } from "@/types/Account"
import { persistentAtom } from "@nanostores/persistent"

export const accountsStore = persistentAtom<Account[]>("accounts", [], {
  encode: JSON.stringify,
  decode: JSON.parse
})

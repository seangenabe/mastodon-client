export interface Account {
  username: string
  instanceName: string
}

export function equals(a: Account, b: Account) {
  return a.username === b.username && a.instanceName === b.instanceName
}

export function toString(a: Account) {
  return `${a.username}@${a.instanceName}`
}

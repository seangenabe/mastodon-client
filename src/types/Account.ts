export interface Account {
  username: string
  instanceName: string
}

export function toString(a: Account) {
  return `${a.username}@${a.instanceName}`
}

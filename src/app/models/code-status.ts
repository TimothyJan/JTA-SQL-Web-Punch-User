export interface CodeStatus {
  status: string,
  l1code: number,
  found: number
}

export interface L3CodeStatus extends CodeStatus {
  empid: string
}

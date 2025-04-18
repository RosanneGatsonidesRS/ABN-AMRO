export interface Network {
  id: number
  name: string
  country: {
    name: string
    code: string
    timezone: string
  }
}

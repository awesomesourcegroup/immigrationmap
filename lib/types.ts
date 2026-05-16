export type Route = {
  name: string
  visaTypes: string[]
  description: string
  estimatedDuration: string
}

export type ImmigrationPath = {
  officialName: string
  criteria: string[]
  routes: Route[]
}

export type VisaDetail = {
  fullName: string
  description: string
  pathToPR: string
  pathToCitizenship: string
  timelineToPR: string
  timelineToCitizenship: string
  /** 0–100, or -1 if not applicable (e.g. visa is already a PR stage) */
  probabilityToPR: number
  probabilityToCitizenship: number
  probabilityNote: string
}

export type Country = {
  id: string
  name: string
  flagEmoji: string
  region: string
  permanentResidence: ImmigrationPath
  citizenship: ImmigrationPath
  visaDetails: Record<string, VisaDetail>
}

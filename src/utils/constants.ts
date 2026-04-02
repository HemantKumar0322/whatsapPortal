

export const PASSWORD_REGEX: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)/
export const API_BASE_URL: string = 'https://sitelog.devdskraft.in/api/v1';
export const API_TIMEOUT: number = 30000;

export const ENQUIRY_PANELS_KEYS: Record<string, string> = {
  exhibitor: "exhibitor",
  event: "event",
  service: "service",
  intention: "intention",
  collection: "collection",
  shipment: "shipment",
  return: "return",
  insurance: "insurance",
  onsite: "onsite",
}

export const SHIPMENT_INTENTION_KEYS: Record<string, string> = {
  intention: "intention",
  collection: "collection",
  shipment: "shipment",
  return: "return",
  insurance: "insurance",
  onsite: "onsite",
}

export const STATUS_LIST = [{ label: 'Draft', value: 'draft' }, { label: 'Submitted', value: 'submitted' }, { label: 'All', value: '' }]

export interface ICalculatePayload {
  eventId: string,
  qty: number,
  discount?: number,
  cost?: number,
  total?: number,
  discountTotal?: number,
  globalDiscountApplied?: boolean
}

import { orderBy, sumBy } from 'lodash'

import { findEventById } from '../models/events'
import { ICalculatePayload } from './interface'
import { PromotionModel } from '../models/promotions'

const applyDiscount = (total: number, discount: number): number => total - (total * discount / 100)

const findEvents = (payload) => {
  return new Promise(async (resolve) => {
    const e = await findEventById( payload.eventId )
    e.qty = payload.qty
    resolve(e)
  })
}

export const CalculateDiscount = async (payload: Array<ICalculatePayload>): Promise<Array<ICalculatePayload>> => {
  const processEvents = Promise.all(payload.map(findEvents))

  return processEvents
    .then(async (events: any) => {
      // Sort cart by lowest value events
      payload = orderBy(payload, 'cost', 'asc')

      // Fetch global discounts
      const cartQty = sumBy(payload, (o) => o.qty)
      const globalPromos = await PromotionModel.find({ global: true })

      globalPromos.forEach((promo) => {
        // If global discount applies. Alter cost of low value items first.
        // This has the potential side effect of applying two discounts to events.
        if (promo.rules.modulo % cartQty === 0 && cartQty >= promo.rules.modulo) {
          events[0].cost = applyDiscount((events[0].cost * events[0].qty), promo.rules.discount)
          events[0].globalDiscountApplied = true
        }
      })

      events.forEach((event: any, idx: number) => {
        let discount = 0
        let modulo = 0
        const { qty, cost, promotions, globalDiscountApplied } = event

        if (promotions && qty >= promotions[0].modulo) {
          discount = promotions[0].discount
          modulo = promotions[0].modulo
        }

        const remainder = qty % modulo

        payload[idx].total = cost * qty
        payload[idx].cost = cost
        payload[idx].globalDiscountApplied = globalDiscountApplied

        if (discount === 0) {
          payload[idx].discountTotal = 0
        } else if (remainder === 0) {
          payload[idx].discountTotal = applyDiscount(payload[idx].total, discount)
        } else {
          payload[idx].discountTotal = applyDiscount((cost * (qty - remainder)), discount) + (remainder * cost)
        }

      })

      return payload
    })
}

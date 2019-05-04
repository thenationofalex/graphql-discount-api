## 📝 Discount API

#### 🔨 Built with

- [Hapi 17](http://hapijs.com/)
- [Apollo Server](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-hapi)
- [Mongoose](http://mongoosejs.com/)

#### 🏗️ Setup

- Clone repo
- Define Server Config settings in `.env`
- Define API settings in `src/app/config`
- Start mongo locally

#### 🏢 Structure

- `src/index.ts` Hapi server application
- `src/config` Server config
- `src/graph` GraphQL Api Schema
- `src/lib` Shared libraries
- `src/models` Mongo Schemas and DB connection

#### 📖 Commands

Command            | Purpose
:----------------- | :---------------------------------------------------
`npm run start`    | Run local server -- `http://localhost:8080/`

#### Assumptions & Design decisions made.

- Rules regardless of wording can be converted down to a percentage.
  - E.g: `Buy 4, ONLY pay for 3` is a 25% discount when the quantity/modulo rule has matched.
- The same promotion can be applied to many events, hence an Array is used in the db collection.
- `Any` promotion is applied before individual product discounts have been applied.
- An `edit` promotion mutation does not exist as considerations would need to be made around past order reporting.
- GraphQL Playground has been enabled to view the API schema
- Calculating the discount `src/lib/discount.ts` should be optimized to limit the number of loops.

#### Example Queries & Mutations

**All Events**

```
query {
  allEvents {
    _id
    event,
    cost
  }
}
```

**Get Event By Id**

```
query {
  getEvent(id: "5c95cfa2c1338078a8fe45d1") {
    cost,
    promotions {
      text
      modulo,
      discount
    }
  }
}
```

**All Promotions**

```
query {
  allPromotions {
    _id,
    global,
    eventIds,
    active
    rules {
      text,
      modulo,
      discount
    }
  }
}
```

**Get Promotion**

```
query {
  getPromotion(id: "5c95f119e519e87d02e9e9c1") {
    eventIds,
    active,
    global,
    rules {
      text,
      modulo,
      discount
    }
  }
}
```

**New Event**

```
mutation {
  newEvent(event: "Event 1", cost: 100) {
    _id
  }
}
```

**Edit Event**

```
mutation {
  editEvent(
    id: "5c95cdc992dbb37854cd3eb3",
    event: "Wine Tour",
    cost: 400.00
  ) {
    _id
    event
    cost
  }
}
```

**New Promotion**

```
mutation {
  newPromotion(
    text: "Buy 2 for $1500"
    eventIds:["5c95cfa2c1338078a8fe45d1"],
    modulo: 2,
    discount:6.25
  ) {
    _id
  }
}
```

**New Global Promotion**

```
mutation {
  newGlobalPromotion(text: "Buy 10, get one free", modulo: 10, discount: 10) {
    _id
  }
}
```

**Set Promotion Status**

```
mutation {
  setPromotionStatus(id:"5c96036df575917ef52648a5", active:false) {
    _id
  }
}
```

**Calculate Discount**

```
query {
  calculateDiscount(input: [
    { eventId: "5c95cfa2c1338078a8fe45d1", qty: 2 },
    { eventId: "5c95cdc992dbb37854cd3eb3", qty: 2 },
    { eventId: "5c95cc05e221f278132e2a09", qty: 1 }
  ]) {
    eventId
    cost
    total
    discountTotal
    qty,
    globalDiscountApplied
  }
}
```
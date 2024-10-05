import { InteractionMetric } from "../models/InteractionMetrics";

export const interactions : InteractionMetric = {
  pageMetrics: [
      {
          page_number: "2",
          quantity: 22
      }
  ],
  limitWordMetrics: [
      {
          title_words_limit: "5",
          quantity: 20
      },

  ],
  typeMetrics: [
      {
          filter_type: "lessThan",
          quantity: 26
      }

  ]
}

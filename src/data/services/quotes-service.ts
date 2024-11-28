import { ApolloClient, NormalizedCacheObject } from "@apollo/client"
import { GET_COMPANY_DATA } from "~data/queries"
import type { Quote, RealtimeQuotes } from 'src/types/quotes'
import realtimeQuotesData from 'src/data/mocks/realtime-quotes.json'

class QuotesService {
  private client: ApolloClient<NormalizedCacheObject>

  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
  }

  async getQuotes(instrumentId: number): Promise<Quote> {
    return new Promise((resolve) => {
      const quote = realtimeQuotesData[instrumentId.toString()]
      if (!quote) {
        throw new Error(`Quote not found for instrument ID: ${instrumentId}`)
      }
      resolve(quote)
    })
  }

  async getRealtimeQuotes(): Promise<RealtimeQuotes> {
    return new Promise((resolve) => {
      resolve(realtimeQuotesData)
    })
  }
}

export default QuotesService
import { gql, useQuery } from "@apollo/client"
import { GET_COMPANY_DATA } from "~data/queries"
import apolloServerClient from "~lib/apollo-server-client"
import { Instrument, Quote, QuoteFundamentals } from "~types/quotes"
import CompanyHeader, { CompanyHeaderProps } from "../../_components/companyHeader"
import CompanyData from "../../_components/companyData"

async function CompanyPage({
  params,
}: {
  params: { symbol: string, exchange: string }
}) {
  const { symbol } = params
  const client = await apolloServerClient()
  const { data: companyData } = await client.query({
    query: GET_COMPANY_DATA,
  })

  // Normally would have generate types, but force it here
  const instrumentData = companyData.instrument.instrument as Instrument
  const quoteData = instrumentData.quote as Quote
  const quoteFundamentals = companyData.instrument.instrument.quoteFundamentals as QuoteFundamentals

  const headerData: CompanyHeaderProps = {
    instrumentId: instrumentData.instrumentId,
    instrument: instrumentData,
    symbol: instrumentData.symbol,
    name: instrumentData.name,
    currency: quoteData.currentPrice.currencyCode,
    price: quoteData.currentPrice.amount,
    change: quoteData.priceChange.amount,
    lastUpdate: quoteData.lastTradeDate,
  }

  return (
    <div>
      <CompanyHeader {...headerData} />
      <CompanyData quoteFundamentals={quoteFundamentals} quoteData={quoteData} />
    </div>
  )
}

export default CompanyPage


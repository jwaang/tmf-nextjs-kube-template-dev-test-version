import { Quote, QuoteFundamentals } from "~types/quotes"

type CompanyDataProps = {
  quoteFundamentals: QuoteFundamentals
  quoteData: Quote
}

const CompanyData = ({ quoteFundamentals, quoteData }: CompanyDataProps) => {
  const { dynamic: fundamentals } = quoteFundamentals;
  return (
    <div className="bg-gradient-to-r from-black via-slate-900 to-black p-6 font-mono text-slate-300 border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
      <dl className="grid grid-cols-2 gap-6">
        <div>
          <dt className="text-cyan-400 mb-1">Daily Change</dt>
          <dd className="text-blue-400">{quoteData.percentChange}% | ${quoteData.priceChange.amount}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Daily Range</dt>
          <dd>${quoteData.dailyRange.min.amount} - ${quoteData.dailyRange.max.amount}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">52-Week Range</dt>
          <dd>${quoteData.fiftyTwoWeekRange.min.amount} - ${quoteData.fiftyTwoWeekRange.max.amount}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Beta (Volatility)</dt>
          <dd>{quoteData.beta5y} <span className="text-red-400">High</span></dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Market Cap</dt>
          <dd>{fundamentals.marketCapitalization.data[0].value}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Employees</dt>
          <dd>{fundamentals.numberOfEmployees.data[0].value}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Market Cap / Employee</dt>
          <dd>{fundamentals.marketCapPerEmployee.data[0].value}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Gross Margin</dt>
          <dd>{quoteData.grossMargin}%</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">CEO</dt>
          <dd>{fundamentals.ceo.data[0].value}</dd>
        </div>
      </dl>
    </div>
  )
}

export default CompanyData
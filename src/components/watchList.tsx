'use client'

import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import { useEffect, useState } from 'react'
import { Instrument, RealtimeQuotes } from '~types/quotes'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'
import WatchListSkeleton from './loading/watchListSkeleton'
import { useWatchList } from 'src/contexts/WatchListContext'

type WatchListProps = {
  realtimeQuotes: RealtimeQuotes
}

const WatchList = ({ realtimeQuotes }: WatchListProps) => {
  const { loading } = useWatchedCompanies()
  const { watchedInstruments } = useWatchList()

  if (loading) {
    return <WatchListSkeleton />
  }
  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Change</th>
            <th className="px-4 py-2">Change %</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {watchedInstruments.map(watch => {
            const quote = realtimeQuotes[watch.instrumentId]
            return <tr key={watch.instrumentId} className="text-center">
              <td className="px-4 py-2">
                <CompanyLink exchange={watch.exchange} symbol={watch.symbol} />
              </td>
              <td className="px-4 py-2">{watch.name}</td>
              <td className="px-4 py-2">{quote.current_price}</td>
              <td className="px-4 py-2">{quote.change}</td>
              <td className="px-4 py-2">{quote.percent_change}</td>
              <td className="px-4 py-2">
                <WatchButton
                  instrumentId={watch.instrumentId}
                  includeText={false}
                />
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WatchList
'use client'

import Link from "next/link";
import { Ranking } from "~types/rankings";
import { formatPercent } from "~utils/formatters";
import WatchButton from "./ui/watchButton";
import CompanyLink from "./ui/companyLink";
import { useWatchList } from "src/contexts/WatchListContext";

type RankingsProps = {
  rankings: Ranking[]
}

const RankingsTable = ({ rankings }: RankingsProps) => {
  const { watchedInstruments } = useWatchList()
  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Sector</th>
            <th>Alien CEO %</th>
            <th>Watch</th>
          </tr>
        </thead>
        <tbody>
          {rankings.filter(ranking => !watchedInstruments.some(watch => watch.instrumentId === ranking.instrument.instrumentId)).map(ranking => {
            return <tr key={ranking.currentRank.value} className="text-center">
              <td>{ranking.currentRank.value}</td>
              <td>
                <CompanyLink exchange={ranking.instrument.exchange} symbol={ranking.instrument.symbol} />
              </td>
              <td>{ranking.instrument.name}</td>
              <td>{ranking.instrument.sector}</td>
              <td>{formatPercent(ranking.instrument.quantScore.value)}</td>
              <td>
                <WatchButton
                  instrument={ranking.instrument}
                  instrumentId={ranking.instrument.instrumentId}
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

export default RankingsTable

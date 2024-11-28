'use client'

import { useWatchList } from 'src/contexts/WatchListContext'
import { Instrument } from '~types/quotes'

type WatchButtonProps = {
  instrument?: Instrument
  instrumentId: number
  includeText?: boolean
}

const WatchButton = ({ instrument, instrumentId, includeText = false }: WatchButtonProps) => {
  const { isWatching, addToWatchList, removeFromWatchList } = useWatchList()
  const isCurrentlyWatching = isWatching(instrumentId)
  const text = includeText ? isCurrentlyWatching ? 'Watching' : 'Watch' : ''
  const indicator = isCurrentlyWatching ? '-' : '+'
  const textColor = isCurrentlyWatching ? 'text-red-500' : 'text-green-500'

  const onClick = () => {
    if (isCurrentlyWatching) {
      removeFromWatchList(instrumentId)
    } else {
      addToWatchList(instrument)
    }
  }

  return (
    <button onClick={onClick} className="px-8 hover:font-bold">
      <span className={textColor}>{text} {indicator}</span>
    </button>
  )
}

export default WatchButton
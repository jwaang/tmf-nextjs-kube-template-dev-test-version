import { createContext, useContext, useState, ReactNode } from 'react'
import { Instrument } from '~types/quotes'

type WatchListContextType = {
    watchedInstruments: Instrument[]
    addToWatchList: (instrument: Instrument) => void
    removeFromWatchList: (instrumentId: number) => void
    isWatching: (instrumentId: number) => boolean
}

const WatchListContext = createContext<WatchListContextType | undefined>(undefined)

export function WatchListProvider({ children }: { children: ReactNode }) {
    const [watchedInstruments, setWatchedInstruments] = useState<Instrument[]>([])

    const addToWatchList = (instrument: Instrument) => {
        setWatchedInstruments(prev => [...prev, instrument])
    }

    const removeFromWatchList = (instrumentId: number) => {
        setWatchedInstruments(prev =>
            prev.filter(instrument => instrument.instrumentId !== instrumentId)
        )
    }

    const isWatching = (instrumentId: number) => {
        return watchedInstruments.some(instrument => instrument.instrumentId === instrumentId)
    }

    return (
        <WatchListContext.Provider value={{
            watchedInstruments,
            addToWatchList,
            removeFromWatchList,
            isWatching
        }}>
            {children}
        </WatchListContext.Provider>
    )
}
export function useWatchList() {
    const context = useContext(WatchListContext)
    if (context === undefined) {
        throw new Error('useWatchList must be used within a WatchListProvider')
    }
    return context
}
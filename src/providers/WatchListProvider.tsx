'use client'

import { WatchListProvider as WatchListContextProvider } from 'src/contexts/WatchListContext'

export function WatchListProvider({ children }: { children: React.ReactNode }) {
    return <WatchListContextProvider>{children}</WatchListContextProvider>
}
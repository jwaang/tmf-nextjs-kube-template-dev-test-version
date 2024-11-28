import { useQuery } from '@apollo/client'
import { GET_WATCHED_INSTRUMENTS } from '../data/queries'
import { useWatchList } from 'src/contexts/WatchListContext'

let promise = null
let result = null

const useWatchedCompanies = () => {
  const { data, loading, error } = useQuery(GET_WATCHED_INSTRUMENTS)
  const { watchedInstruments, addToWatchList } = useWatchList()

  if (loading || error) {
    return { data: null, loading, error }
  }

  if (!promise && data) {
    promise = new Promise((resolve) => {
      setTimeout(() => {
        result = data
        result.instruments.forEach(instrument => addToWatchList(instrument))
        resolve(result)
      }, 1000)
    })
  }

  if (promise && !result) {
    throw promise
  }

  return { data: result, loading, error }
}

export default useWatchedCompanies
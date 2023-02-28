// stylesheets
import styles from './SearchPage.module.css'

// types
import { User } from '../../types/models'
import { SearchResult } from '../../types/models'
// service
import * as apiService from '../../services/apiService'

import { useState,useEffect } from 'react'

import SearchForm from '../../components/SearchForm/SearchForm'
import BusStopCard from '../../components/BusStopCard/BusStopCard'

interface SearchPageProps {
  user: User | null
}

const SearchPage = (props: SearchPageProps): JSX.Element => {
  const { user } = props
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setSearchResults([])
      setError(null)
    }
  }, [user]);

  const handleSearch = async (busStopNumber: string) => {
    try {
      const searchResults = await apiService.getStop(busStopNumber)
      //attach the input as part of the result
      const resultsWithSearchValue = searchResults.map((result: any) => ({
        ...result,
        searchValue: busStopNumber,
      }))
        setSearchResults(resultsWithSearchValue)
        setError(null)
      } catch (error) {
        setError(`Bus stop ${busStopNumber} not found. Please enter a valid bus stop number.`)
        setSearchResults([])
      }
      
    }
  return (
    <div className={styles.searchDisplay}>
      <h1>Next Bus</h1>
      <p>Next Bus is a quick way to look up departure, real time, or scheduled times for a specific bus stop.</p>
      {user && <SearchForm handleSearch={handleSearch} />}
      
      {error && <p className={styles.errorMessage}>{error}</p>}

      {searchResults.length === 0 ? (
      <p className={styles.errorMessage}>There are currently no buses scheduled for this stop.
      </p>
      ) : (
        searchResults.map((result) => (
          <div key={result.RouteNo}>
            <BusStopCard {...result} />
          </div>
        ))
      )}
    </div>
  )
}
export default SearchPage
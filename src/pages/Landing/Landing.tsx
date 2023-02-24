// stylesheets
import styles from './Landing.module.css'
// types
import { User } from '../../types/models'
import { SearchResult } from '../../types/models'
// service
import * as apiService from '../../services/apiService'

import { useState } from 'react'

import SearchForm from '../../components/SearchForm/SearchForm'
import BusStopCard from '../../components/BusStopCard/BusStopCard'

interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null);


const handleSearch = async (busStopNumber: string) => {
  try {
    const searchResults = await apiService.getStop(busStopNumber)
    //attach the input as part of the result
    const resultsWithSearchValue = searchResults.map((result: any) => ({
      ...result,
      searchValue: busStopNumber,
    }))
      setSearchResults(resultsWithSearchValue)
    } catch (error) {
      setError(`Bus stop ${busStopNumber} not found. Please enter a valid bus stop number.`);
    setSearchResults([]);
    }
    
  }


  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>

      {user && <SearchForm handleSearch={handleSearch} />}
      
      {error && <p className={styles.errorMessage}>{error}</p>}
      
      {searchResults.map((result) => (
        <div key={result.RouteNo}>
          <BusStopCard {...result} />
        </div>
      ))}
    </main>
  )
}

export default Landing

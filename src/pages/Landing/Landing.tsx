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

const handleSearch = async (busStopNumber: string) => {
  const searchResults = await apiService.getStop(busStopNumber)
  //attach the input as part of the result
  const resultsWithSearchValue = searchResults.map((result: any) => ({
    ...result,
    searchValue: busStopNumber,
  }))
    setSearchResults(resultsWithSearchValue)
  }


  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>

      {user && <SearchForm handleSearch={handleSearch} />}
      
      {searchResults.map((result) => (
        <div key={result.RouteNo}>
          <BusStopCard {...result} />
        </div>
      ))}
    </main>
  )
}

export default Landing

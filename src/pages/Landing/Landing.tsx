// stylesheets
import styles from './Landing.module.css'
// types
import { User } from '../../types/models'
// service
import * as apiService from '../../services/apiService'

import { useState } from 'react'

import SearchForm from '../../components/SearchForm/SearchForm'

interface LandingProps {
  user: User | null
}
interface SearchResult {
  RouteNo: string
  RouteName: string
}
const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const handleSearch = async (busStopNumber: string) => {
    const searchResults = await apiService.getStop(busStopNumber)
    console.log(searchResults)
    //setSearchResults()
  }


  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      <SearchForm handleSearch={handleSearch} />
      {searchResults.map((result) => (
        <div key={result.RouteNo}>
          <p>Bus Route: {result.RouteNo}</p>
          <p>Route Name: {result.RouteName}</p>
        </div>
      ))}
    </main>
  )
}

export default Landing

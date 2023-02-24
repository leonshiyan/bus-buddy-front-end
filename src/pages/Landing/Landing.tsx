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
  RouteNo: string;
  RouteName: string;
  Direction: string;
  ExpectedLeaveTime: string;
  ExpectedCountdown: number;
}
const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

    // handle search
    const handleSearch = async (query: string) => {
      const result = await apiService.getStop(query);
      const data = result as SearchResult[];
      setSearchResult(data);
    }

  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      <SearchForm onSearch={handleSearch} />
      {/* render search results here */}
    </main>
  )
}

export default Landing

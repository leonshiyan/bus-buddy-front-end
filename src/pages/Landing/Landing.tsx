// stylesheets
import styles from './Landing.module.css'
// types
import { User } from '../../types/models'

import { Link } from 'react-router-dom'


interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>

      {user && (
      <Link to="/search">
        <button>Search for bus stops</button>
      </Link>
      )}
    </main>
  )
}

export default Landing

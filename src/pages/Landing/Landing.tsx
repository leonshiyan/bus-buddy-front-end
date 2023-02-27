// stylesheets
import styles from './Landing.module.css'
// types
import { User } from '../../types/models'
import { Link } from 'react-router-dom'
//import component
import Button from 'react-bootstrap/Button'


interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <>
    <main className={styles.container}>
      <div className = {styles.banner}>
        <div className={styles.welcome}>
          <h1>Hello, {user ? user.name : 'friend'}</h1>
          <h1>Welcome to BusBuddy</h1>
          <p>To make your daily commute easier</p>
        </div>
      </div>
      <article className={styles.article}>
        <div className={styles.display}>
          {user && (
            <div className="d-grid gap-2">
              <Link to="/search">
                <Button variant="primary" size="lg">
                  Start search for Next Bus
                </Button>
              </Link>
            </div>
          )}
        </div>
      </article>
    </main>
    </>
  )
}

export default Landing

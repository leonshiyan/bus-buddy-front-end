// stylesheets
import styles from './Landing.module.css'
// types
import { User } from '../../types/models'
import { Link } from 'react-router-dom'
//import component
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'



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
      < br/>
      <Carousel>
        <Carousel.Item>
          <img
            src="/bus1.jpg"
            height="400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Traditional Stop Sign</h3>
            <p>Signs you will see at city center</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/bus2.jpg"
            height="400"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>New Stop Sign</h3>
            <p>New types of sign implemented recently.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/bus3.jpg"
            height="400"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Slim Stop Sign</h3>
            <p>
              Signs most likely to see on minor roads.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      < br/>
      <article className={styles.article}>
        <div className={styles.display}>
          {user && (
            <div className="d-grid gap-3">
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

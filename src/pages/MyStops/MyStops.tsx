// stylesheets
import styles from './MyStops.module.css'
// hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// types
import { MyStop } from '../../types/models'
// service
import * as stopServices from '../../services/stopService'
// components
import { ListGroup, Button } from 'react-bootstrap';


interface MyStopsProps {
  user: any;
}
const MyStops = (props: MyStopsProps): JSX.Element => {
  const { user } = props
  const [stops, setStops] = useState<MyStop[]>([]);
  useEffect(() => {
    const fetchStops = async () => {
      try {
        const fetchedStops = await stopServices.getAllStops();
        setStops(fetchedStops);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStops()
  }, [])
  if(!stops.length) return <p>No stops yet</p>

  return (
    <main className={styles.container}>
      <h1>My Favourite Stops</h1>
      <ListGroup>
        {stops.map(stop => (
          <ListGroup.Item action key={stop.stopNo}>
            <Link
              to={`/stops/${stop.stopNo}`}
              state={stop}
            >
              {stop.title}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </main>
  )
}
export default MyStops

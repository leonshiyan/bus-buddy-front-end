import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

// types
import { MyStop } from '../../types/models'
//service
import * as stopServices from '../../services/stopService'

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
    <>
      <h1>This is my Stop page</h1>
      
      <ul>
        {stops.map(stop => (
          <li key={stop.stopNo}>
            <Link
              to={`/stops/${stop.stopNo}`}
              state={stop}
            >
              {stop.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default MyStops

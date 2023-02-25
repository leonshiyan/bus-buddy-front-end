import { useState, useEffect } from 'react';

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
  return (
    <>
      <h1>This is my Stop page</h1>
      <ul>
        {stops.map(stop => (
          <li key={stop.stopNo}>{stop.stopNo}</li>
        ))}
      </ul>
    </>
  )
}
export default MyStops

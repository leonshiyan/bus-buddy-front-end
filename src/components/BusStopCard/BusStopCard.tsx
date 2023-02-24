import { Link } from 'react-router-dom'
import { SearchResult } from '../../types/models'

const BusStopCard = (result:SearchResult) => {
  return ( 
    <>
        <p>Bus Route: {result.RouteNo}</p>
        <p>Route Name: {result.RouteName}</p>
        <p>Schedules:</p>
        {result.Schedules.map((schedule) => (
          <p key={schedule.ExpectedLeaveTime}>Time: {schedule.ExpectedLeaveTime}</p>
        ))}
    </>
  )
}

export default BusStopCard
import { Link } from 'react-router-dom'
import { SearchResult } from '../../types/models'
import { AddFavStopData } from '../../types/forms'
import * as addStopServices from '../../services/stopService'

const BusStopCard = (result:SearchResult) => {
  const handleAddStop = async () => {
    const formData: AddFavStopData = {
      stopNo: result.searchValue
    }
    try {
      await addStopServices.create(formData)
    } catch (error) {
      console.error(error)
    }
  }
  return ( 
    <>
      <p>Bus Stop: {result.searchValue}</p>
      <p>Bus Route: {result.RouteNo}</p>
      <p>Route Name: {result.RouteName}</p>
      <p>Schedules:</p>
      {result.Schedules.map((schedule) => (
        <p key={schedule.ExpectedLeaveTime}>Time: {schedule.ExpectedLeaveTime}</p>
      ))}
      <button onClick={handleAddStop}>
        Add to my favourite!
      </button>
    </>
  )
}

export default BusStopCard
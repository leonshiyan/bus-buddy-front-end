import { useState,useEffect } from "react"
import * as apiService from "../../services/apiService"
import { useParams, useLocation } from 'react-router-dom'
//types
import { SearchResult } from '../../types/models'

type StopParams = {
  stopNo: string
}
const MyStopDetails = (): JSX.Element  => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const { stopNo } = useParams<StopParams>()
  const location = useLocation()
  const myStop = location.state

  useEffect(() => {
    const fetchData = async () => {
      if (stopNo !== undefined) {
        const searchResults = await apiService.getStop(stopNo)
        setSearchResults(searchResults)
      }
    }
    fetchData()
  }, [stopNo])
  
  const deleteStop = async () => {
    try {
      await apiService.deleteStop(myStop.id);
      // Redirect to the home page or another appropriate page after deletion
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1>Stop Details</h1>
      {searchResults.map((result) => (
        <div key={result.RouteNo}>
          <p>Bus Stop: {myStop.stopNo}</p>
          <p>Bus Route: {result.RouteNo}</p>
          <p>Route Name: {result.RouteName}</p>
          <p>Schedules:</p>
          {result.Schedules.map((schedule) => (
            <p key={schedule.ExpectedLeaveTime}>Time: {schedule.ExpectedLeaveTime}</p>
          ))}
        </div>
      ))}
      <button onClick={deleteStop}>Delete Stop</button>
    </div>
  )
}


export default MyStopDetails
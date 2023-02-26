import { useState,useEffect } from "react"
import * as apiService from "../../services/apiService"
import * as stopService from "../../services/stopService"
import { useParams, useLocation, useNavigate  } from 'react-router-dom'
//types
import { SearchResult } from '../../types/models'

type StopParams = {
  stopNo: string
}
const MyStopDetails = (): JSX.Element  => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [newTitle, setNewTitle] = useState("");

  const { stopNo } = useParams<StopParams>()
  const location = useLocation()
  const myStop = location.state
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      if (stopNo !== undefined) {
        const searchResults = await apiService.getStop(stopNo)
        setSearchResults(searchResults)
      }
    }
    console.log("Data fetched!!!!")
    fetchData()
  }, [stopNo])

  const deleteStop = async () => {
    try {
      await stopService.deleteStop(myStop.id);
      navigate("/stops")
    } catch (error) {
      console.error(error);
    }
  }
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  }

  const updateTitle = async() => {
    try {
      await stopService.update(myStop.id,newTitle);
      navigate("/stops")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Stop Details</h1>
      <h2>{myStop.title}</h2>
      <input type="text" value={newTitle} onChange={handleTitleChange} />
      <button onClick={updateTitle}>Update Title</button>
      <button onClick={deleteStop}>Delete this stop</button>
      <h3>Bus Stop: {myStop.stopNo}</h3>
      {searchResults.map((result) => (
        <div key={result.RouteNo}>
          
          
          <p>Bus Route: {result.RouteNo}</p>
          <p>Route Name: {result.RouteName}</p>
          <p>Schedules:</p>
          {result.Schedules.map((schedule) => (
            <p key={schedule.ExpectedLeaveTime}>Time: {schedule.ExpectedLeaveTime}</p>
          ))}
        </div>
      ))}
      
    </div>
  )
}


export default MyStopDetails
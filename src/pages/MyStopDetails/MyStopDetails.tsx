// stylesheets
import styles from './MyStopDetails.module.css'
// hooks
import { useState,useEffect } from "react"
import { useParams, useLocation, useNavigate  } from 'react-router-dom'
//services
import * as apiService from "../../services/apiService"
import * as stopService from "../../services/stopService"
//types
import { SearchResult } from '../../types/models'
//components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    setNewTitle(myStop.title)
    const fetchData = async () => {
      if (stopNo !== undefined) {
        const searchResults = await apiService.getStop(stopNo)
        setSearchResults(searchResults)
      }
    }
    fetchData()
  }, [stopNo, myStop.title])

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
    if (newTitle.trim() !== '') {
      try {
        await stopService.update(myStop.id,newTitle);
        navigate("/stops")
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1>Stop Details</h1>
      <h2>{myStop.title}</h2>
      <Form >
        <Form.Control type="text" value={newTitle} onChange={handleTitleChange}/>
        <Button onClick={updateTitle} variant="warning">Update Title</Button>
        <Button onClick={deleteStop} variant="danger">Delete this stop</Button>
      </Form>



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
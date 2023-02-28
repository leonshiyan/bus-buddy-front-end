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
import Card from 'react-bootstrap/Card'

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
        <Card   className= "shadow-sm" bg = "light" style={{ width: '100%' }}>
        <Card.Body >
          <Card.Title>Bus Route : {result.RouteNo}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Name : {result.RouteName} {result.Direction}</Card.Subtitle>
          <Card.Text>
            Departing in : <b>{result.Schedules[0].ExpectedCountdown <= 0 ? "Now": `${result.Schedules[0].ExpectedCountdown} minutes `}</b>
          </Card.Text>
          <Card.Text>
            Next :< br/>
            {result.Schedules.map((schedule,idx) => (
              <div key={idx}> {schedule.ExpectedLeaveTime}</div>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
          ))}
    </div>
  )
}


export default MyStopDetails
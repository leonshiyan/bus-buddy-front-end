import { Link } from 'react-router-dom'
import { SearchResult } from '../../types/models'
import { AddFavStopData } from '../../types/forms'
import * as addStopServices from '../../services/stopService'
//components
import Card from 'react-bootstrap/Card'

const BusStopCard = (result:SearchResult) => {
  const handleAddStop = async () => {
    const formData: AddFavStopData = {
      stopNo: result.searchValue,
      title: `${result.searchValue} - ${result.RouteName} (${result.Direction})`
    }
    try {
      await addStopServices.create(formData)
    } catch (error) {
      console.error(error)
    }
  }
  return ( 
    <>
    < br/> 
      <Card   className= "shadow-sm" bg = "light" style={{ width: '100%' }}>
        <Card.Body >
          <Card.Title>Bus Stop: {result.searchValue}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Bus Route: {result.RouteNo}</Card.Subtitle>
          <Card.Text>
            <span>Name: {result.RouteName} {result.Direction}</span> 
              < br/> 
              Departing in : <b>{result.Schedules[0].ExpectedCountdown <= 0 ? "Now": `${result.Schedules[0].ExpectedCountdown} minutes `}</b>
          </Card.Text>
          <Card.Text>
            Next:< br/>
            {result.Schedules.map((schedule) => (
              <div key={schedule.ExpectedLeaveTime}> {schedule.ExpectedLeaveTime}</div>
            ))}
          </Card.Text>
          <Card.Link  href="/stops" onClick={handleAddStop}>Add this to my stop</Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default BusStopCard
import { useState,useEffect } from "react"
import * as apiService from "../../services/apiService"
import { useParams } from 'react-router-dom'

type StopParams = {
  stopNo: string
}
const MyStopDetails = (): JSX.Element  => {
  const [stopData, setStopData] = useState<string>();
  const { stopNo } = useParams<StopParams>()
  useEffect(() => {
    const fetchData = async () => {
      if (stopNo !== undefined) {
        const response = await apiService.getStop(stopNo)
        const data = await response.json()
        setStopData(data)
      }
    }

    fetchData();
  }, [stopData]);


  return (
    <div>
      <h1>Stop Details</h1>
      {stopData ? (
        <h1>{stopData}</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}


export default MyStopDetails
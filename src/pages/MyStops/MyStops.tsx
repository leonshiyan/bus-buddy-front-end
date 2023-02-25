// types
import { User } from '../../types/models'
import { MyStop } from '../../types/models'
import { useState,useEffect } from 'react'
//service
import * as addStopServices from '../../services/stopService'


interface MyStopsProps {
  user: User | null
}

const MyStops = (props: MyStopsProps): JSX.Element => {
  const { user } = props
  const [stops, setStops] = useState<MyStop[]>([]) 

  useEffect(() => {
    async function fetchStops() {
      try {
        await addStopServices.index()
      } catch (error) {
        console.error(error)
      }
    }
    fetchStops()
  }, [])
  return (
    <>
      <h1>This is my Stop page</h1>
    </>
  )
}
export default MyStops

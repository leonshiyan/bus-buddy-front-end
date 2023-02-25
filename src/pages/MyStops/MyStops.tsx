// types
import { User } from '../../types/models'


interface MyStopsProps {
  user: User | null
}

const MyStops = (props: MyStopsProps): JSX.Element => {
  const { user } = props
  return (
    <>
      <h1>This is my Stop page</h1>
    </>
  )
}
export default MyStops

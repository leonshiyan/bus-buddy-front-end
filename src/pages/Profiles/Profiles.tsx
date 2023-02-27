// stylesheets
import styles from './Profiles.module.css'
// types
import { Profile } from '../../types/models'
// components
import ProfileCard from '../../components/ProfileCard/ProfileCard'

interface ProfilesProps {
  profiles: Profile[];
}

const Profiles = (props: ProfilesProps): JSX.Element => {
  const { profiles } = props

  if(!profiles.length) return <p>No profiles yet</p>
  
  return (
    <main className={styles.container}>

      <h1>Hello. This is a list of all the profiles.</h1>
      {profiles.map((profile: Profile) =>
        <ProfileCard key={profile.id} profile={profile} />
      )}
    
    </main>
    
  )
}
export default Profiles

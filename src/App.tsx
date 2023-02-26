// npm modules 
import { useState,useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import SearchPage from './pages/SearchPage/SearchPage'
import MyStopDetails from './pages/MyStopDetails/MyStopDetails'
import MyStops from './pages/MyStops/MyStops'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'


// stylesheets
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// types
import { User,Profile } from './types/models'


function App(): JSX.Element {
  const navigate = useNavigate()
  //States
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect((): void => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const profileData: Profile[] = await profileService.getAllProfiles()
        setProfiles(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    user ? fetchProfiles() : setProfiles([])
  }, [user])

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute user={user}>
              <SearchPage user={user}/>
            </ProtectedRoute>} />
        <Route
          path="/stops"
          element={
            <ProtectedRoute user={user}>
              <MyStops user={user}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path= "/stops/:stopNo"
          element = {
            <ProtectedRoute user={user}>
              <MyStopDetails/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles profiles={profiles}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

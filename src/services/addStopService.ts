// services
import * as tokenService from './tokenService'

// types
import { Profile } from '../types/models'
import { AddFavStopData } from '../types/forms'
import { MyStop } from '../types/models'


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/stops`

async function create(formData:AddFavStopData): Promise<MyStop> {
	try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as MyStop
  } catch (error) {
    throw error
  }
}

export { create }
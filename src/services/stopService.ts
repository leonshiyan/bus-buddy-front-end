// services
import * as tokenService from './tokenService'

// types

import { AddFavStopData } from '../types/forms'
import { MyStop } from '../types/models'



const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/stops`


async function getAllStops(): Promise<MyStop[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json() as MyStop[]
  } catch (error) {
    console.log(error)
    return []
  }
}

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

async function deleteStop(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      }
    })
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

async function update(id: number, title: string) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title })
    })
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

export { create, getAllStops,deleteStop,update}
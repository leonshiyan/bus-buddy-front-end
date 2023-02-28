const baseURL = "https://api.translink.ca/rttiapi/v1/stops/"
const baseKeyURL =  `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/keys`
// services
import * as tokenService from './tokenService'

async function getStop(stopNo: string) {
  const apiKey = await getApiKey()
  const url = `${baseURL}${stopNo}/estimates?apikey=${apiKey}`
  try {
    
    const res = await fetch(url, {
      headers: {
        "accept": "application/JSON"
      }
    })
    return res.json()
  } catch (error) {
    console.log(error);
  }
}
async function getApiKey() {
  try {
    const res = await fetch(baseKeyURL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.text()
  } catch (error) {
    console.log(error)
  }
}

export {getStop}
import axios from 'axios'

const userMeApi = async () => {
  let token = sessionStorage.getItem('token')
  return await axios.get("http://localhost:5000/user/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getAchievement = async () => {
  let email = ''
  await userMeApi().then(res => {
    email = res.data.data[0].email
  })
  return await axios.get("http://localhost:5000/user/achievement", {
    params: {
      email: email
    }
  })
}
  
export {
  userMeApi,
  getAchievement,
}
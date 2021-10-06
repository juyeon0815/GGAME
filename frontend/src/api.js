import axios from 'axios'

const UserMeApi = () => {
  let token = sessionStorage.getItem('token')
  axios.get("https://j5a104.p.ssafy.io/user/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    // console.log(res.data.data[0].email)
    localStorage.setItem('email', res.data.data[0].email)
  }).catch(err => {
    console.log(err)
    // alert('로그인 페이지로 이동합니다.')
    // sessionStorage.removeItem('token')
    // localStorage.removeItem('email')
    // history.push({pathname: "/login"})
  })
}

const getAchievement = async () => {
  let email = localStorage.getItem('email')
  return await axios.get("https://j5a104.p.ssafy.io/user/achievement", {
    params: {
      email: email
    }
  })
}
  
export {
  UserMeApi,
  getAchievement,
}
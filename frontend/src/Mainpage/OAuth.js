const client_id = `fbb0739223a635262d2dcd957dd4c17c`
const redirect_uri = `http://localhost:3000/callback/kakao`

export const kakao_auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
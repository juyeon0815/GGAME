import React from 'react'

const SingleReport = (props) => {
  // api를 호출해서 report에 저장한다
  const report = {
    'nickname': 'AAAAAA',
    
  }
  return (
    <div>
      <table>
        <tr>
          <th>닉네임</th>
          <th>일시</th>
          <th>점수</th>
          <th>랭킹</th>
        </tr>
      </table>
    </div>
  )
}

export default SingleReport
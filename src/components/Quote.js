import React from 'react'

const Quote = () => {
    const array=["Your career will load faster than this",
    "The best thing about a boolean is even if you are wrong you are only off by a bit",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand"]
    const randomIndex = Math.floor(Math.random() * array.length);
    return (
    <div style={{color:"white" ,textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold',margin:'0 0 0 30px' }}>{array[randomIndex]}</div>
  )
}

export default Quote
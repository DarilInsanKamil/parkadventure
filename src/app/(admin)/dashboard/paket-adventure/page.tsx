import React from 'react'

const Page = async() => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  return (
    <p>{JSON.stringify(data)}</p>    
  )
}

export default Page
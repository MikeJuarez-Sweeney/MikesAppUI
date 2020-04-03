import React from "react";

export const FetchNames = () => {

  const componentDidMount = async() => {
    const url = "http://localhost:8081/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    console.log(data);
  }
  return(
    <button onClick={componentDidMount}>PRESS ME</button>
  )
}

export default FetchNames
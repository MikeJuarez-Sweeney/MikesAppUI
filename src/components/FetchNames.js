import React from "react";

export default class FetchNames extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  };

  async componentDidMount() {
    const url = "http://localhost:8081/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    console.log(data);
  }

  render() {
    return (
      <div>
        {/* <div>{this.state.data.firstName}</div>
        <div>{this.state.lastName}</div> */}
      </div>
    );
  }
}

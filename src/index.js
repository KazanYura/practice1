import React, { useState } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import MapChart from "./App";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const textStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
  return (
    <div id="main_body">
      <h1 style={textStyle}>COVID-19 Map</h1>
      <h3>Enter date in order to get map according to that date</h3>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <MapChart  date={startDate}/>
      <h3>Description:</h3>
      <p>We have two main parameters in this data piece. 
        So I would like to separate them to save as big an amount of information as possible. 
        The first variant was to show each country separately and after that manipulate with the date. 
        But this variant won't allow us to compare the information. 
        So I choose the second variant. 
        Here you can choose a date and get all maps according to that date. 
        This saves as much info as the previous case but allows us to compare it.</p>
      <p>Made by Yurii Kazan</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
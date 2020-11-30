import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import MapChart from "./App";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <MapChart  date={startDate}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import jsonData from './toISO2.json';

 
import "react-datepicker/dist/react-datepicker.css";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 70000])
  .range(["#fffdfd", "#ff0000"]);

function swap(json){
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    return ret;
  }
const MapChart = (date) => {

  let countries = []
  const loadData = () => JSON.parse(JSON.stringify(jsonData));
  countries = swap(loadData());
  const [data, setData] = useState([]);
  useEffect(() => {
    csv(process.env.PUBLIC_URL + `/cases.csv`).then((data) => {
      console.log(data)
      let day = date.date.getDate();
      let mounth = date.date.getMonth();
      let year = date.date.getFullYear();
      data = data.filter((entry) => parseInt(entry.date.split("-")[0]) === year && parseInt(entry.date.split("-")[1]) === mounth && parseInt(entry.date.split("-")[2]) === day);
      setData(data);
    });

  }, [date]);

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => countries[s.country_region] === geo.properties.ISO_A2 || (s.country_region === "US" && s.country_region === geo.properties.ISO_A2));
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d["confirmed_cases"]) : "#F5F4FF"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;

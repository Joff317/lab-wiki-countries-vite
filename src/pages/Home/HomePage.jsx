import "./home.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then(function (response) {
        console.log(response.data);
        setDatas(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="home">
      <h1>List of Countries</h1>
      <div className="list">
        <ul>
          {datas.map((data) => (
            <li className="countries-name" key={data.alpha3Code}>
              <Link to={`/${data.alpha3Code}`}>
                <div>
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${data.alpha2Code.toLowerCase()}.png`}
                    alt=""
                  />
                  <p>{data.name.common}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetailsPage(props) {
  const { countryId } = useParams();
  const [countriesDetail, setCountriesDetail] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((res) => {
        console.log(res.data);
        setCountriesDetail(res.data);
      })
      .catch((error) => console.error(error));
  }, [countryId]);

  if (!countriesDetail) {
    return <p style={{ marginTop: "70px" }}>Loading...</p>;
  }

  return (
    <div className="home">
      <h1> Country Details</h1>
      <div>
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${countriesDetail.alpha2Code.toLowerCase()}.png`}
          alt=""
        />
        <h2>{countriesDetail.name.common}</h2>
      </div>
      <div className="capital-container">
        <p>Capital</p>
        <p>{countriesDetail.capital}</p>
      </div>
      <div className="area-container">
        <p>Area</p>
        <p>{countriesDetail.area} km2</p>
      </div>
      <div className="border-container">
        <p>Borders</p>
        <ul>
          {countriesDetail.borders.map((border) => (
            <li key={border}>
              <Link to={`/${border}`}>{border}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CountryDetailsPage;

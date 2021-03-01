import Axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../Components/CoronaTracker/Cards";
import Corona from "../Components/CoronaTracker/Corona";

const Covid19 = () => {
  const [confirmed, setConfirmed] = useState();
  const [recovered, setRecovered] = useState();
  const [deaths, setDeaths] = useState();
  const [confirmedByCountry, setConfirmedByCountry] = useState();
  const [recoveredByCountry, setRecoveredByCountry] = useState();
  const [deathsByCountry, setDeathsByCountry] = useState();
  const [summary, setSummary] = useState({});
  const [country, setcountry] = useState();
  const [days, setDays] = useState(7);
  const [coronaCountArr, setCoronaCountArr] = useState([]);
  const [label, setLabel] = useState([]);

  const fetchCorona = () => {
    Axios.get("https://covid19.mathdro.id/api")
      .then((response) => {
        const { confirmed, recovered, deaths } = response.data;
        setConfirmed(confirmed.value);
        setRecovered(recovered.value);
        setDeaths(deaths.value);
      })
      .catch((err) => console.log(err));

    Axios.get("https://api.covid19api.com/summary")
      .then((response) => {
        setSummary(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCorona();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    // const month = `0${d.getMonth() + 1}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    // const _date = d.getDate();
    const _date = (d.getDate() < 10 ? "0" : "") + d.getDate();
    return `${year}-${month}-${_date}`;
  };

  const countryHandler = (e) => {
    setcountry(e.target.value);

    const d = new Date();
    const to = formatDate(d.setDate(d.getDate() - 1));
    const from = formatDate(d.setDate(d.getDate() - days));

    console.log(from, to);
    getCoronaByDate(e.target.value, from, to);
  };

  const daysHandler = (e) => {
    setDays(parseInt(e.target.value));
  };

  const getCoronaByDate = (countrySlug, from, to) => {
    Axios.get(
      `https://api.covid19api.com/total/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
    )
      .then((res) => {
        const yAxis = res.data.map((d) => d.Cases);
        const xAxis = res.data.map((d) => d.Date);
        setCoronaCountArr(yAxis);
        setLabel(xAxis);
        const covidDetails = summary.Countries.find(
          (x) => x.Slug === countrySlug
        );
        setConfirmedByCountry(covidDetails.TotalConfirmed);
        setRecoveredByCountry(covidDetails.TotalRecovered);
        setDeathsByCountry(covidDetails.TotalDeaths);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h1 className="text-center mt-3 mb-4">COVID-19 Update</h1>
      </div>

      <Cards
        totalConfirmed={confirmed}
        totalRecovered={recovered}
        totalDeaths={deaths}
        country=""
      />

      <div>
        <h4 className="text-center mt-3 mb-4">
          Select a country to get specific Update
        </h4>
      </div>

      <center className="mb-5 container">
        <select value={country} onChange={countryHandler} className="mb-3">
          {summary.Countries &&
            summary.Countries.map((x) => (
              <option key={x.Slug} value={x.Slug}>
                {x.Country}
              </option>
            ))}
        </select>
        <select value={days} onChange={daysHandler} className="mb-3">
          <option value="7"> Last 7 days</option>
          <option value="15"> Last 15 days</option>
          <option value="30"> Last 30 days</option>
        </select>
      </center>

      {country && (
        <>
          <Cards
            totalConfirmed={confirmedByCountry}
            totalRecovered={recoveredByCountry}
            totalDeaths={deathsByCountry}
            country={country}
          />
          <Corona yAxis={coronaCountArr} xAxis={label} />
        </>
      )}
      <br />
      <br />
    </div>
  );
};

export default Covid19;

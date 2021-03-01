import React from "react";
import "./Card.css";
const Cards = (props) => {
  const { totalConfirmed, totalRecovered, totalDeaths, country } = props;
  return (
    <div className="mb-5">
      <div className="container cetagories">
        <h2
          className="text-center mb-4"
          style={{ textTransform: "capitalize" }}
        >
          {country ? country : "World Wide Corona Report"}
        </h2>
        <div className="row text-white">
          <div className="col-md-4 ">
            <div className="cat1 d-flex flex-column justify-content-between align-items-center">
              <h3 className="text-center">Total Confirmed</h3>
              <img
                className="img-fluid mb-1"
                src="https://cdn3.iconfinder.com/data/icons/coronavirus-53/64/virus-covid19-corona-coronavirus-cell-64.png"
                alt="Confirmed"
              />
              <h2>{totalConfirmed}</h2>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="cat2 d-flex flex-column justify-content-between align-items-center">
              <h3 className="text-center">Total Recovered</h3>
              <img
                className="img-fluid mb-1"
                src="https://cdn0.iconfinder.com/data/icons/covid-19-36/512/Recovered-recuperate-covid19-convalescence-rehabilitation-restitution-restoration-64.png"
                alt="Recovered"
              />
              <h2>{totalRecovered}</h2>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="cat3 d-flex flex-column justify-content-between align-items-center">
              <h3 className="text-center">Total Deaths</h3>
              <img
                className="img-fluid mb-1"
                src="https://cdn3.iconfinder.com/data/icons/halloween-29/64/grave-64.png"
                alt="Watch"
              />
              <h2>{totalDeaths}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;

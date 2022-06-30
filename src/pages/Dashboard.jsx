import React from "react";
import Navbar from "../components/Navbar";
import { useIsAuthenticated, AccountIdentifiers } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResults from "../components/SearchResults";

const Dashboard = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const country = JSON.parse(localStorage.getItem("country"));
  const vaccineOne = JSON.parse(localStorage.getItem("vaccineOne"));
  const vaccineTwo = JSON.parse(localStorage.getItem("vaccineTwo"));
  const params = new URLSearchParams();
  params.append("grant_type", process.env.REACT_APP_GRANT_TYPE);
  params.append("client_id", process.env.REACT_APP_API_CLIENT_ID);
  params.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
  const [token, setToken] = useState("");
  const [countryCode, setCode] = useState("");
  const [travelData, setTravelData] = useState("");

  const getToken = async () => {
    await axios
      .post("https://test.api.amadeus.com/v1/security/oauth2/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(
        (response) => (
          console.log(response), setToken(response.data.access_token)
        )
      );

    if (token) {
      await axios
        .get(
          `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${countryCode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => setTravelData(response.data));
    }
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar></Navbar>
      <hr></hr>
      <div className="flex justify-center p-4">
        <div className="px-2">Country: {country}</div>
        <div className="px-2">Vaccine One: {vaccineOne}</div>
        <div className="px-2">Vaccine Two: {vaccineTwo}</div>
      </div>
      <div className="flex justify-center items-center">
        {" "}
        <input
          placeholder="Search Counties"
          className="bg-[#191B1F] rounded-2xl text-white w-[70%] placeholder:text-[#B2B9D2] placeholder:p-4 h-[3rem] pr-2"
          onChange={(e) => setCode(e.target.value)}
        ></input>
        <div className="cursor-pointer px-4" onClick={getToken}>
          Search
        </div>
      </div>
      {travelData && (
        <SearchResults
          data={travelData}
          country={country}
          vaccineOne={vaccineOne}
          vaccineTwo={vaccineTwo}
        ></SearchResults>
      )}
    </div>
  );
};

export default Dashboard;

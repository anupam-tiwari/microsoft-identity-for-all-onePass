import React from "react";
import Navbar from "../components/Navbar";
import {
  useIsAuthenticated,
  AccountIdentifiers,
  useMsal,
} from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { callMsGraph } from "../graph";
import { loginRequest } from "../authConfig";
import { QrReader } from "react-qr-reader";
import { HiQrcode } from "react-icons/hi";

const Profile = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [country, setCountry] = useState("");
  const [vaccineOne, setVaccineOne] = useState("");
  const [vaccineTwo, setVaccineTwo] = useState("");
  const [data, setData] = useState("");
  const [openOR, setQR] = useState(false);
  const [vaccineArray, SetArray] = useState([]);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
      });
  }

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, refresh]);

  useEffect(() => {
    if (graphData == null) {
      RequestProfileData();
    }
  });

  useEffect(() => {
    if (country != "") {
      localStorage.setItem("country", JSON.stringify(country));
    }
  }, [country]);

  useEffect(() => {
    if (vaccineOne != "") {
      localStorage.setItem("vaccineOne", JSON.stringify(vaccineOne));
    }
  }, [vaccineOne, localStorage.getItem("vaccineOne")]);

  useEffect(
    () => {
      if (vaccineTwo != "") {
        localStorage.setItem("vaccineTwo", JSON.stringify(vaccineTwo));
      }
    },
    [vaccineTwo],
    localStorage.getItem("vaccineTwo")
  );

  function refresher() {
    if (refresh == true) {
      setRefresh(false);
    } else setRefresh(true);
  }

  const QR = () => {
    if (openOR == false) {
      setQR(true);
    } else {
      setQR(false);
    }
  };

  const processQR = (data) => {
    const vaccineData = data.split("|");
    console.log(vaccineData);
    vaccineData.forEach((element) => {
      if (
        element == "Comirnaty" ||
        element == "BioNTech" ||
        element == "AstraZeneca" ||
        element == "SinoVac" ||
        element == "Moderna"
      ) {
        if (vaccineArray.length > 1) {
          return;
        } else {
          if (element == "Comirnaty" || element == "BioNTech") {
            vaccineArray.push("Pfizer");
          } else {
            vaccineArray.push(element);
          }
        }
      }
    });

    console.log(vaccineArray.length);

    if (vaccineArray.length == 2) {
      localStorage.setItem("vaccineOne", JSON.stringify(vaccineArray[0]));
      localStorage.setItem("vaccineTwo", JSON.stringify(vaccineArray[1]));
    } else if (vaccineArray.length == 1) {
      localStorage.setItem("vaccineOne", JSON.stringify(vaccineArray[0]));
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <hr></hr>
      <div className="w-screen flex items-center justify-center mt-14 text-white">
        <div className="bg-[#191B1F] w-[40rem] rounded-2xl p-4">
          <div className="flex justify-end cursor-pointer" onClick={refresher}>
            <BiRefresh className="w-5 h-5"></BiRefresh>
          </div>
          <div className="flex justify-center text-[#008AD7] p-8">
            <FaUser className="w-20 h-20"></FaUser>
          </div>

          {openOR && (
            <div className="flex justify-center">
              <div className="w-[50%] h-[50%] rounded-lg">
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      setData(result?.text);
                    }

                    if (!!error) {
                      //console.info(error);
                    }
                  }}
                  //style={{ width: '50%'}}

                  containerStyle={{ width: "100%" }}
                />
              </div>
            </div>
          )}

          {graphData && (
            <div>
              <div className="p-2">Name: {graphData.displayName} </div>
              <div className="p-2">Email: {graphData.userPrincipalName}</div>
            </div>
          )}
          <div className="p-2 flex justify-between">
            <div>Country: {JSON.parse(localStorage.getItem("country"))}</div>
            <div>
              <input
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="country"
                className="rounded bg-[#45474b] w-[50%]"
              ></input>
              <button className="pl-2">Add</button>
            </div>
          </div>

          <div className="p-2 flex justify-between">
            <div>
              First Vaccine: {JSON.parse(localStorage.getItem("vaccineOne"))}
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setVaccineOne(e.target.value)}
                placeholder="First Vaccine"
                className="rounded bg-[#45474b] w-[50%]"
              ></input>
              <button className="pl-2">Add</button>
            </div>
          </div>
          <div className="p-2 flex justify-between">
            <div>
              Second Vaccine: {JSON.parse(localStorage.getItem("vaccineTwo"))}
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setVaccineTwo(e.target.value)}
                placeholder="Second Vaccine"
                className="rounded bg-[#45474b] w-[50%]"
              ></input>
              <button className="pl-2">Add</button>
            </div>
          </div>
          {data && (
            <div className="p-2 flex justify-between">
              <div>Found Vaccine: {vaccineArray}</div>
            </div>
          )}
          <div
            className="bg-[#008AD7] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]"
            onClick={QR}
          >
            <div>Scan QR code </div>
            <div className="text-4xl pl-2">
              <HiQrcode></HiQrcode>
            </div>
          </div>
          {data && (
            <div
              className="bg-[#008AD7] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]"
              onClick={processQR(data)}
            >
              <div>Add to record</div>
              <div className="text-4xl pl-2"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

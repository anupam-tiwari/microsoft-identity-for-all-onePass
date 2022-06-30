import React, { useState } from "react";
import DOMPurify from "dompurify";

const SearchResults = (props) => {
  const [traveldata, setData] = useState(props.data);

  const vaccines =
    traveldata.data.areaAccessRestriction.diseaseVaccination.qualifiedVaccines;
  const Infection = traveldata.data.diseaseCases;
  const tracingApp =
    traveldata.data.areaAccessRestriction.tracingApplication.text;
  const quarantine = traveldata.data.areaAccessRestriction.quarantineModality;

  const checkVaccine = (dose) => {
    const name = dose[0];
    console.log(name);
    if (name == props.vaccineOne) {
      return <div> Approved ☑️</div>;
    }
  };

  return (
    <div className="w-screen flex items-center justify-center mt-14 text-white">
      {traveldata && (
        <div className="bg-[#191B1F] w-[80%] rounded-2xl p-4">
          <div className="flex justify-between">
            <div className="text-4xl text-[#008AD7]">
              {traveldata.data.area.name}
            </div>
            <div className="text-2xl">
              Number of cases: {Infection.confirmed}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <div className="text-xl">Quarantine: {quarantine.duration}</div>
            <div className="text-xl">
              Quarantine Type: {quarantine.quarantineType}
            </div>
          </div>
          <div className="pt-6">
            <div className="text-2xl pb-2 text-[#008AD7]">Approved Vaccine</div>
            <div className="p-2">
              {vaccines.map((item) => (
                <div>
                  <div className=" flex">
                    <div>{item}</div>
                    <div>{checkVaccine(item.split(" "))}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-4 text-2xl text-[#008AD7]">Tracing APP</div>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tracingApp) }}
          ></div>
          <div className="py-4 text-2xl text-[#008AD7]">
            Quarantine Requirements
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(quarantine.text),
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

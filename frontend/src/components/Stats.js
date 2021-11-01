import React from "react";
import { BsFillPiggyBankFill, BsFillPeopleFill } from "react-icons/bs";
import { HiServer } from "react-icons/hi";

function Stats() {
  return (
    <div
      className="flex flex-col items-center justify-between w-full mt-6 lg:flex-row lg:my-1"
      style={{ maxWidth: 1140, minHeight: 200 }}
    >
      <div className="flex items-center justify-center w-full py-8 border-r-0 border-gray-300 lg:py-2 lg:border-r">
        <div className="">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 55, height: 55, background: "#FFECEC" }}
            >
              <BsFillPiggyBankFill size="19" color="#ff0c29" />
            </div>
            <div className="w-32 ml-6">
              <div style={{ fontWeight: 700, fontSize: 25 }}>90 +</div>
              <div style={{ fontWeight: 400, fontSize: 20 }}>
                Ethereum Available
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full py-8 border-r-0 border-gray-300 lg:py-2 lg:border-r">
        <div className="">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 55, height: 55, background: "#FFECEC" }}
            >
              <BsFillPeopleFill size="19" color="#ff0c29" />
            </div>
            <div className="w-32 ml-6">
              <div style={{ fontWeight: 700, fontSize: 25 }}>40 +</div>
              <div style={{ fontWeight: 400, fontSize: 20 }}>Contributors</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full py-8 border-r-0 border-gray-300 lg:py-2">
        <div className="">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 55, height: 55, background: "#FFECEC" }}
            >
              <HiServer size="19" color="#ff0c29" />
            </div>
            <div className="w-32 ml-6">
              <div style={{ fontWeight: 700, fontSize: 25 }}>50 +</div>
              <div style={{ fontWeight: 400, fontSize: 20 }}>Requests</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

import React from "react";
import { BsFillPiggyBankFill, BsFillPeopleFill } from "react-icons/bs";
import { HiServer } from "react-icons/hi";
import styled from "styled-components";

function Stats() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className="relative flex flex-col items-center justify-between w-full mt-6 lg:flex-row lg:my-1"
        style={{ maxWidth: 1140, minHeight: 200 }}
      >
        <div className="z-20 flex items-center justify-center w-full py-8 bg-white border-r-0 border-gray-200 h-36 lg:py-2 lg:border-r">
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
        <div className="z-20 flex items-center justify-center w-full py-8 bg-white border-r-0 border-gray-200 h-36 lg:py-2 lg:border-r">
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
                <div style={{ fontWeight: 400, fontSize: 20 }}>
                  Contributors
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="z-20 flex items-center justify-center w-full py-8 bg-white border-r-0 border-gray-200 h-36 lg:py-2">
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
      <div className="relative flex justify-center w-full px-12">
        <TheBox></TheBox>
        {/* <a href="/"> */}
        <TheMakers className="mt-12 lg:mt-4">BlockchainBuilders</TheMakers>
        {/* </a> */}
      </div>
    </div>
  );
}

export default Stats;

const TheBox = styled.div`
  border: 2px solid red;
  top: 0px;
  z-index: 0;
  position: absolute;
  width: 1068.84px;
  height: 19.22px;

  background: #0d1025;
  opacity: 0.63;
  filter: blur(94px);
  border-radius: 10px;
`;

const TheMakers = styled.a`
  cursor: pointer;

  position: absolute;
  width: 148px;
  height: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  /* identical to box height, or 187% */

  color: #4f5665;
  :hover {
    color: black;
  }
  z-index: 9999;
`;

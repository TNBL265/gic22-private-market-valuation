import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import LeftNavbar from "../../../components/common/LeftNavbar/LeftNavbar";
import InstrumentChart from "../../../components/Instruments/Instrument/InstrumentChart";
import Transactions from '../../../components/Transactions/Transactions'

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import { getInstrumentById, getMarketValues, getMarketValuesById } from "../../../components/common/Apis";
import { useEffect, useState } from "react";

const BlockClassName = "p-4 rounded-2xl bg-white relative z-10";

const InstrumentBuySell = () => {
  return (
    <>
      <h2 className="text-xl my-2">Buy/Sell</h2>
      {/* <div> */}
      {/* <div className="text-sm font-semibold my-2">Quantity:</div> */}
      <div>
        <TextField
          id="qty"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className="my-3"
        />
      </div>
      <div>
        <TextField
          id="amt"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className="my-3"
        /></div>
      <div className="flex justify-around">
        <Button variant="outlined" color="success" className="text-my-green-1 border-my-green-1 mr-8">BUY</Button>
        <Button variant="outlined" color="info" className="text-my-orange-1 border-my-orange-1 ml-8">SELL</Button>
      </div>
      {/* </div> */}
    </>
  );
};

const InstrumentDetails = ({ instDetails }: any) => {
  const Entry = ({ label, value }: any) => {
    return (
      <div className="flex justify-between text-sm font-semibold my-2">
        <div className="text-my-gray-2">{label}</div>
        <div>{value}</div>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-2xl mb-2">Details</h2>
      {instDetails && (
        <>
          <Entry label="Country" value={instDetails["country"]} />
          <Entry label="Currency" value={instDetails["instrumentCurrency"]} />
          <Entry label="Sector" value={instDetails["sector"]} />
          <Entry label="Type" value={instDetails["instrumentType"]} />
          <Entry label="Tradeable" value={instDetails["isTradeable"]} />
          <Entry label="Created At" value={instDetails["createdAt"]} />
          <Entry label="Modified At" value={instDetails["modifiedAt"]} />
          <div className="text-my-gray-2 text-sm font-semibold my-2">Notes</div>
          <p>{instDetails["notes"]} </p>
        </>
      )}

    </>
  );
};



const InstrumentPage = () => {
  const router = useRouter();
  const [instDetails, setInstDetails] = useState(null);
  const [instMVs, setInstMVs] = useState(null);
  // const { id } = router.query
  const fetchInstrumentData = async (id: number) => {
    let res = (await getInstrumentById(id))?.data;
    setInstDetails(res);
  }
  const fetchInstrumentMV = async (id: number) => {
    let res = (await getMarketValuesById(id))?.data;
    setInstMVs(res);
  }
  useEffect(() => {
    console.log(router.query)
    const id = router.query.id as string;
    console.log(`id ${id}`);
    fetchInstrumentData(id as unknown as number)
    fetchInstrumentMV(id as unknown as number)
  }, [])

  return (
    <div className="page__container flex relative ">
      {/* <div className=""> */}
      <LeftNavbar />
      {/* </div> */}
      <div className="page__body grow relative">
        <div className="p-8 z-10 relative">
          <div className="flex items-center my-6">
            <h1 className="text-5xl text-white font-bold mr-2">
              {instDetails ? instDetails["instrumentName"] : "Loading..."}
            </h1>
            <EditIcon className="text-white w-8 h-8 mr-2" />
            <DeleteForeverIcon className="text-white w-8 h-8" />
          </div>
          <div className="flex items-center justify-between my-6">
            <div className="p-4 bg-white rounded-2xl flex items-center grow mr-4">
              <div className="">
                <h4 className="text-2xl">PnL</h4>
                <div className="text-my-green-1">+24%</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl flex items-center grow mx-4">
              <div className="">
                <h4 className="text-2xl">Portfolio Value</h4>
                <div className="text-my-green-1">$35600</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl flex items-center grow mx-4">
              <div className="">
                <h4 className="text-2xl">Risk/Volatility</h4>
                <div className="text-my-green-1">4/10</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl flex items-center grow ml-4">
              <div className="">
                <h4 className="text-2xl">Percentage Portfolio</h4>
                <div className="text-my-green-1">10%</div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grow mr-2 w-2/3">
              <div className={BlockClassName + " mb-4"}>
                <InstrumentChart />
              </div>
              <div className={BlockClassName}>
                <Transactions />
              </div>
            </div>
            <div className="shrink-0 w-1/3 ml-2">
              <div className={BlockClassName + " mb-4"}>
                <InstrumentDetails instDetails={instDetails} />
              </div>
              <div className={BlockClassName}>
                <InstrumentBuySell />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full bg-zinc-800 rounded-tl-2xl h-[20%] z-0"></div>
      </div>
    </div>
  );
};
// export async function getStaticPaths() {
//     const paths = ["abc"];
//     return {
//       paths,
//       fallback: false,
//     };
//   }
export default InstrumentPage;

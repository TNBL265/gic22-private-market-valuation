import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import LeftNavbar from "../../../components/common/LeftNavbar/LeftNavbar";
import InstrumentChart from "../../../components/Instruments/Instrument/InstrumentChart";
import Transactions from '../../../components/Transactions/Transactions'

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";

const BlockClassName = "p-4 rounded-2xl bg-white relative z-10";

const InstrumentBuySell = () => {
  return (
    <>
      <h2>Buy/Sell</h2>
      {/* <div> */}
      {/* <div className="text-sm font-semibold my-2">Quantity:</div> */}
      <TextField
        id="qty"
        label="Quantity"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        className="my-3"
      />
      <TextField
        id="amt"
        label="Amount"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        className="my-3"
      />
      <div className="flex justify-center">
        <Button variant="outlined" color="success" className="text-my-green-1 border-my-green-1 mr-8">BUY</Button>
        <Button variant="outlined" color="info" className="text-my-orange-1 border-my-orange-1 ml-8">SELL</Button>
      </div>
      {/* </div> */}
    </>
  );
};

const InstrumentDetails = () => {
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
      <Entry label="Country" value="USA" />
      <Entry label="Currency" value="USA" />
      <Entry label="Sector" value="USA" />
      <Entry label="Type" value="USA" />
      <Entry label="Tradeable" value="Yes" />
      <Entry label="Created At" value="Yes" />
      <Entry label="Modified At" value="Yes" />
      {/* <Entry label="Tradeable" value="Yes"/> */}
      <div className="text-my-gray-2 text-sm font-semibold my-2">Notes</div>
      <p>Private Equity; Financials; Tradable Instrument</p>
    </>
  );
};

const InstrumentPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  // const { id } = router.query
  console.log(`id ${id}`);
  return (
    <div className="page__container flex relative ">
      {/* <div className=""> */}
      <LeftNavbar />
      {/* </div> */}
      <div className="page__body grow relative">
        <div className="p-8 z-10 relative">
          <div className="flex items-center my-6">
            <h1 className="text-5xl text-white font-bold mr-2">
              Armstrong - Jacobi
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
              <div className={BlockClassName  + " mb-4"}>
                <InstrumentChart />
              </div>
              <div  className={BlockClassName}>
                <Transactions />
              </div>
            </div>
            <div className="shrink-0 w-1/3 ml-2">
              <div className={BlockClassName + " mb-4"}>
                <InstrumentDetails />
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

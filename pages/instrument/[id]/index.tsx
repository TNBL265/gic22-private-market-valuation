import { useRouter } from "next/router";
import TextField from '@mui/material/TextField';
import LeftNavbar from "../../../components/common/LeftNavbar/LeftNavbar";
import InstrumentChart from "../../../components/Instruments/Instrument/InstrumentChart";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BlockClassName = "p-4 rounded-lg bg-white relative z-10";

const InstrumentDetails = () => {
  const Entry = ({label, value}: any) => {
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
      <Entry label="Country" value="USA"/>
      <Entry label="Currency" value="USA"/>
      <Entry label="Sector" value="USA"/>
      <Entry label="Type" value="USA"/>
      <Entry label="Tradeable" value="Yes"/>
      <Entry label="Created At" value="Yes"/>
      <Entry label="Modified At" value="Yes"/>
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
            <div className="grow mr-2">
              <div className={BlockClassName}>
                <InstrumentChart />
              </div>
            </div>
            <div className="shrink-0 w-1/3 ml-2">
              <div className={BlockClassName}>
                <InstrumentDetails />
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

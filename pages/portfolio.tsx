import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import LeftNavbar from "../components/common/LeftNavbar/LeftNavbar";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import {
  getMyInstrumentValue,
  getMyPortfolioPnL,
} from "../components/common/Apis";
import Table from "../components/common/Table/Table";
import InstrumentChart from "../components/Instruments/Instrument/InstrumentChart";

const ChartOptions = {
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  },
};
const headings = [
  { name: "Instruments" },
  { name: "Type" },
  { name: "Country" },
  { name: "Sector" },
  { name: "Currency" },
  { name: "Tradeable?" },
  { name: " " },
];

const toDateString = (d: Date) => {
  console.log("toDateString");
  console.log(d);
  return d.toISOString().split("T")[0];
};

const parseGraphMV = (data: any) => {
  const res = data?.map((el: any) => {
    return {
      x: el["marketValueDate"],
      y: el["marketValue"],
    };
  });
  return res;
};
const PortfolioPage = () => {
  const [startDate, setStartDate] = useState<string>(
    toDateString(new Date(2020, 1, 1))
  );
  const [endDate, setEndDate] = useState<string>(toDateString(new Date()));
  const [myPnL, setMyPnL] = useState([]);
  const [myInvestments, setMyInvs] = useState([]);
  const [myValue, setMyValue] = useState(0);
  useEffect(() => {
    // const fetchInvestments = async () => {
    //   let res = (await getMarketValuesById(id))?.data;
    //   console.log(myInvestments)
    //   setMyInvs(res);
    // };
    const fetchTotalValue = async () => {
      let acc = 0;
      let acc_arr = [];
      for (let i = 1; i < 20; i++) {
        let res = (await getMyInstrumentValue(i, startDate, endDate))?.data;
        acc += res[res.length - 1]["marketValue"];
        acc_arr.push(res[res.length - 1]);
      }
      console.log("acc_arr");
      console.log(acc_arr);
      setMyValue(acc);
      setMyInvs(acc_arr);
    };
    const fetchPortfolioPnL = async () => {
      let res = (await getMyPortfolioPnL())?.data;
      console.log("PNL")
      
      setMyPnL(res);
      console.log(myPnL)
    };
    fetchTotalValue();
    fetchPortfolioPnL();
  }, []);
  return (
    <div className="page__container flex relative ">
      <div className="page__left">
        <LeftNavbar />
      </div>
      <div className="page__body  grow relative">
        <div className="p-12 z-10 relative">
          <div className="flex justify-between">
            <h1 className="text-my-gray-1 font-bold text-5xl mb-8">
              Your Portfolio
            </h1>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              //   className="text-white border-white"
              options={["STOCKS PLS"]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Asset" />}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-center">
                <div className="text-3xl text-my-gray-3 font-bold">
                  {" "}
                  Total Value
                </div>
                <div className="text-2xl text-my-green-1">${myValue}</div>
              </div>
              <div className="border-2 border-my-gray-2 h-12 mx-6"></div>
              <div className="text-center">
                <div className="text-3xl text-my-gray-3 font-bold">Risk</div>
                <div className="text-2xl text-my-green-1">6/10</div>
              </div>
              <div className="border-2 border-my-gray-2 h-12 mx-6"></div>
              <div className="text-center">
                <div className="text-3xl text-my-gray-3 font-bold">
                  Overall PnL
                </div>
                <div className="text-2xl text-my-green-1">+2.5%</div>
              </div>
            </div>
            <div>
              <div>Date Range</div>
              <div>
                <TextField
                  id="startDate"
                  label="From"
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  // defaultValue="2019-05-24" // to reflect earliest
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="mx-3"
                />
                <TextField
                  id="endDate"
                  label="To"
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                  defaultValue="2019-05-24" // to reflect latest
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="mx-3"
                />
              </div>
            </div>
          </div>

          <div id="chart">
            {/* <Chart
              options={ChartOptions.options as any}
              series={parseGraphMV(myInvestments)}
              type="line"
              height={350}
            /> */}
            <InstrumentChart
              title={"Overall Market Values"}
              data={parseGraphMV(myInvestments)}
            />
          </div>
          {/* <div>
            <Table
              columns={headings.length}
              tableHeaders={headings.map((heading) => heading.name)}
              rows={myInvestments}
              // width="65vw"
              buttonName="View"
            ></Table>
          </div> */}
        </div>
        {/* <div className="absolute top-0 left-0 w-full bg-zinc-800 rounded-tl-2xl h-[20%] z-0"></div> */}
      </div>
    </div>
  );
};

export default PortfolioPage;

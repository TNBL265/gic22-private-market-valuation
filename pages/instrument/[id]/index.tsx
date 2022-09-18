import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import LeftNavbar from "../../../components/common/LeftNavbar/LeftNavbar";
import InstrumentChart from "../../../components/Instruments/Instrument/InstrumentChart";
import Transactions from "../../../components/Transactions/Transactions";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Fade, IconButton, Modal } from "@mui/material";
import {
  delInstrument,
  getInstrumentById,
  getMarketValues,
  getMarketValuesById,
  postTransactions,
} from "../../../components/common/Apis";
import { ChangeEvent, useEffect, useState } from "react";

const BlockClassName = "p-4 rounded-2xl bg-white relative z-10";

const InstrumentBuySell = ({ id, instMVs }: any) => {
  const [qty, setQty] = useState(0);
  const [amt, setAmt] = useState(0);
  const [transStats, setTransStats] = useState("none"); // either none, pending, failed or success
  // let latestMV = latestMVs?latestMVs[-1]:1;
  console.log("latestMVs");
  console.log(instMVs);
  let mv =
    instMVs && instMVs.length > 0
      ? instMVs[instMVs.length - 1]["marketValue"]
      : 1;
  console.log(`mv: ${mv}`);
  const handleQtyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let val = e.target.value as unknown as number;
    console.log(`handleQtyChange: ${val}`);
    setQty(val);
    setAmt(val * mv);
    console.log(`New amt ${amt}`);
  };

  const handleAmtChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    let val = e.target.value as unknown as number;
    setAmt(val);
    setQty(Math.floor(val / mv));
  };

  const handleTransaction = async (isBuy: boolean) => {
    let curAmt = amt;
    if (isBuy) {
      curAmt = -amt;
    }
    setTransStats("pending");
    let res = await postTransactions({
      data: {
        instrumentId: id,
        quantity: qty,
        transactionAmount: curAmt,
        transactionType: "BUY",
        transactionDate: Date.now(),
      },
    });
    console.log(res);

    let status = res?.status;
    if (status == 200) {
      setTransStats("success");
    } else {
      setTransStats("failed");
    }
  };

  const handleBuyClick = async (e: any) => {
    e.preventDefault();
    handleTransaction(true);
  };

  const handleSellClick = async (e: any) => {
    e.preventDefault();
    handleTransaction(false);
  };
  const StatusMsg = () => {
    if (transStats == "success") {
      return <div className="text-my-green-1">Transaction went through!</div>;
    } else if (transStats == "failed") {
      return (
        <div className="text-my-red-1">Transaction DIDN'T went through!</div>
      );
    } else if (transStats == "pending") {
      return <div className="text-my-gray-2">Attempting transaction</div>;
    }
    return <div></div>;
  };
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
          value={qty}
          className="my-3"
          onChange={handleQtyChange}
        />
      </div>
      <div>
        <TextField
          id="amt"
          label="Amount"
          type="number"
          value={amt}
          InputLabelProps={{
            shrink: true,
          }}
          className="my-3"
          onChange={handleAmtChange}
        />
      </div>
      <StatusMsg />
      <div className="flex justify-around">
        {transStats == "pending" ? (
          <Button
            variant="outlined"
            color="success"
            disabled
            className=" mr-8"
            onClick={handleBuyClick}
          >
            BUY
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="success"
            className="text-my-green-1 border-my-green-1 mr-8"
            onClick={handleBuyClick}
          >
            BUY
          </Button>
        )}
        {transStats == "pending" ? (
          <Button
            variant="outlined"
            color="info"
            disabled
            className=" ml-8"
            onClick={handleSellClick}
          >
            SELL
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="info"
            className="text-my-orange-1 border-my-orange-1 ml-8"
            onClick={handleSellClick}
          >
            SELL
          </Button>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

const InstrumentDetails = ({ instDetails }: any) => {
  console.log(instDetails);
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
          <Entry
            label="Tradeable"
            value={instDetails["isTradeable"] ? "True" : "False"}
          />
          <Entry label="Created At" value={instDetails["createdAt"]} />
          <Entry label="Modified At" value={instDetails["modifiedAt"]} />
          <div className="text-my-gray-2 text-sm font-semibold my-2">Notes</div>
          <p>{instDetails["notes"]} </p>
        </>
      )}
    </>
  );
};

const getGraphTitle = (s: string) => {
  switch (s) {
    case "MV":
      return "Market Value";

    case "PnL":
      return "Profit and Loss";
  }
};

const parseGraphMVData = (data: any) => {
  return data?.map((el: any) => {
    return {
      x: el["marketValueDate"],
      y: el["marketValue"],
    };
  });
};

const InstrumentPage = () => {
  const router = useRouter();
  const [instDetails, setInstDetails] = useState(null);
  const [instMVs, setInstMVs] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [instrumentId, setInstrumentId] = useState<string>("");

  const [showDelModal, setShowDelModal] = useState(false);
  const [dataType, setDataType] = useState("MV");
  // const { id } = router.query

  const displayTransactions = () => {
    return <Transactions instrumentId={instrumentId} />;
  };

  useEffect(() => {
    console.log(router.query);
    const id = router.query.id as string;
    setInstrumentId(id);
    console.log(`id ${id}`);
    const fetchInstrumentData = async (id: number) => {
      let res = (await getInstrumentById(id))?.data;
      console.log(res);
      setInstDetails(res);
    };
    const fetchInstrumentMV = async (id: number) => {
      let res = (await getMarketValuesById(id))?.data;
      setInstMVs(res);
    };

    fetchInstrumentData(id as unknown as number);
    fetchInstrumentMV(id as unknown as number);
  }, [router.isReady]);

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
            <IconButton
              // color="primary"
              size="large"
              aria-label="Upload instrument data"
              className="text-my-blue-2"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <EditIcon className="text-white w-8 h-8 mr-2" />
            </IconButton>
            <IconButton
              // color="primary"
              size="large"
              aria-label="Upload instrument data"
              className="text-my-blue-2"
              onClick={() => {
                setShowDelModal(true);
              }}
            >
              <DeleteForeverIcon className="text-white w-8 h-8" />
            </IconButton>
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
                <InstrumentChart
                  title={getGraphTitle(dataType)}
                  data={parseGraphMVData(instMVs)}
                />
              </div>
              <div className={BlockClassName}>
                {instrumentId?.length > 0 && displayTransactions()}
              </div>
            </div>
            <div className="shrink-0 w-1/3 ml-2">
              <div className={BlockClassName + " mb-4"}>
                <InstrumentDetails instDetails={instDetails} />
              </div>
              <div className={BlockClassName}>
                <InstrumentBuySell instMVs={instMVs} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full bg-zinc-800 rounded-tl-2xl h-[20%] z-0"></div>
      </div>
      <Modal
        open={showDelModal}
        onClose={() => {
          setShowDelModal(false);
        }}
        closeAfterTransition
        className="h-full w-full flex justify-center items-center"
      >
        <Fade in={showDelModal}>
          <div className="bg-white h-1/8 w-1/5 p-8 rounded-2xl flex flex-col">
            <div className="text-2xl font-bold mb-8">Are you sure?</div>
            <Button
              variant="outlined"
              className="text-my-red-1 border-my-red-1"
              onClick={() => {
                instDetails ? delInstrument(instDetails["instrumentId"]) : 1;
                window.location.replace("/instruments");
              }}
            >
              Totally~
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default InstrumentPage;

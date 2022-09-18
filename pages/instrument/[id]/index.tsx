import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import LeftNavbar from '../../../components/common/LeftNavbar/LeftNavbar'
import InstrumentChart from '../../../components/Instruments/Instrument/InstrumentChart'
import Transactions from '../../../components/Transactions/Transactions'

import {
  requiredFields,
  selectFields,
  optionalFields,
} from "../../../components/Instruments/constants";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, Fade, IconButton, MenuItem, Modal } from "@mui/material";

import {
  delInstrument,
  editInstruments,
  getInstrumentById,
  getMarketValues,
  getMarketValuesById,
  getMyInstrumentPnL,
  getMyInstrumentValue,
  getMyInstrumentPnLDate,
  postTransactions,
} from '../../../components/common/Apis'
import { ChangeEvent, useEffect, useState } from 'react'
import Section from '../../../components/common/Section/Section'

const BlockClassName = 'p-4 rounded-2xl bg-white relative z-10'

const toDateString = (d: Date) => {
  console.log("toDateString")
  console.log(d)
  return d.toISOString().split('T')[0]
}

const InstrumentBuySell = ({ id, instMVs }: any) => {
  const [qty, setQty] = useState(0)
  const [amt, setAmt] = useState(0)
  const [transStats, setTransStats] = useState('none') // either none, pending, failed or success
  // let latestMV = latestMVs?latestMVs[-1]:1;
  console.log('latestMVs')
  console.log(instMVs)
  let mv =
    instMVs && instMVs.length > 0
      ? instMVs[instMVs.length - 1]['marketValue']
      : 1
  console.log(`mv: ${mv}`)

  const handleQtyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let val = (e.target.value as unknown) as number
    console.log(`handleQtyChange: ${val}`)
    setQty(val)
    setAmt(val * mv)
    console.log(`New amt ${amt}`)
  }

  const handleAmtChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    let val = (e.target.value as unknown) as number
    setAmt(val)
    setQty(Math.floor(val / mv))
  }

  const handleTransaction = async (isBuy: boolean) => {
    let curAmt = amt
    if (isBuy) {
      curAmt = -amt
    }
    const transDate = toDateString(new Date())
    console.log(`Formatted Date: ${transDate}`)
    setTransStats('pending')
    let res = await postTransactions({
      data: {
        instrumentId: id,
        quantity: qty,
        transactionAmount: curAmt,
        transactionType: 'BUY',
        transactionDate: transDate,
      },
    })
    console.log(res)

    let status = res?.status
    if (status == 200) {
      setTransStats('success')
    } else {
      setTransStats('failed')
    }
  }

  const handleBuyClick = async (e: any) => {
    e.preventDefault()
    handleTransaction(true)
  }

  const handleSellClick = async (e: any) => {
    e.preventDefault()
    handleTransaction(false)
  }
  const StatusMsg = () => {
    if (transStats == 'success') {
      return <div className="text-my-green-1">Transaction went through!</div>
    } else if (transStats == 'failed') {
      return (
        <div className="text-my-red-1">Transaction DIDN'T went through!</div>
      )
    } else if (transStats == 'pending') {
      return <div className="text-my-gray-2">Attempting transaction</div>
    }
    return <div></div>
  }
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
        {transStats == 'pending' ? (
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
        {transStats == 'pending' ? (
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
  )
}

const InstrumentDetails = ({ instDetails }: any) => {
  console.log(instDetails)
  const Entry = ({ label, value }: any) => {
    return (
      <div className="flex justify-between text-sm font-semibold my-2">
        <div className="text-my-gray-2">{label}</div>
        <div>{value}</div>
      </div>
    )
  }

  return (
    <>
      <h2 className="text-2xl mb-2">Details</h2>
      {instDetails && (
        <>
          <Entry label="Country" value={instDetails['country']} />
          <Entry label="Currency" value={instDetails['instrumentCurrency']} />
          <Entry label="Sector" value={instDetails['sector']} />
          <Entry label="Type" value={instDetails['instrumentType']} />
          <Entry
            label="Tradeable"
            value={instDetails['isTradeable'] ? 'True' : 'False'}
          />
          <Entry label="Created At" value={instDetails['createdAt']} />
          <Entry label="Modified At" value={instDetails['modifiedAt']} />
          <div className="text-my-gray-2 text-sm font-semibold my-2">Notes</div>
          <p>{instDetails['notes']} </p>
        </>
      )}
    </>
  )
}

const getGraphTitle = (s: string) => {
  switch (s) {
    case 'MV':
      return 'Market Value'

    case 'PnL':
      return 'Profit and Loss'
  }
}

const parseGraphMVData = (data: any) => {
  return data?.map((el: any) => {
    return {
      x: el['marketValueDate'],
      y: el['marketValue'],
    }
  })
}

const parseGraphMVDateForPNL = (data: any) => {
  const res = data?.map((el: any) => {
    return {
      x: el["marketValueDate"],
      y: el["net_profitloss"],
    };
  });
  console.log(res);
  return res;
};

const InstrumentPage = () => {
  const router = useRouter();
  // const [instDetails, setInstDetails] = useState(null);
  // const [instMVs, setInstMVs] = useState(null);
  const [myInvestmentValue, setMyInvVal] = useState(0);
  // const [instrPnL, setInstrPnL] = useState(0);
  const [instDetails, setInstDetails] = useState({});
  const [instMVs, setInstMVs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [instrumentId, setInstrumentId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(toDateString(new Date(2020,1)));
  const [endDate, setEndDate] = useState<string>(toDateString(new Date()));
  const [netProfits, setNetProfits] = useState<any>();

  const [showDelModal, setShowDelModal] = useState(false)
  const [dataType, setDataType] = useState('MV')
  // const { id } = router.query

  const displayTransactions = () => {
    return <Transactions instrumentId={instrumentId} />
  }

  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setInstDetails({ ...instDetails, [name]: newValue });
  };

  const handleEdit = async (evt: any) => {
    evt.preventDefault();

    let data = { data: instDetails };
    //check if all the required inputs are entered
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await editInstruments(data, instrumentId);
    console.log(res);
  };

  const displayInstrumentForm = () => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mt: 2, mb: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ backgroundColor: "white" }}>
          {requiredFields.map((requiredField) => {
            return (
              <TextField
                required
                id="outlined-required"
                name={requiredField.name}
                label={requiredField.label}
                value={instDetails[`${requiredField.name}`]}
                key={requiredField.label}
                onChange={handleInput}
              />
            );
          })}
          {selectFields.map((selectField) => {
            return (
              <TextField
                select
                id="outlined-required"
                name={selectField.name}
                label={selectField.label}
                value={instDetails?.isTradeable == "True" ? "True" : "False"}
                key={selectField.label}
                onChange={handleInput}
              >
                <MenuItem key={"True"} value={"True"}>
                  {"True"}
                </MenuItem>
                <MenuItem key={"False"} value={"False"}>
                  {"False"}
                </MenuItem>
              </TextField>
            );
          })}
          {optionalFields.map((optionalField) => {
            return (
              <TextField
                id="outlined-helperText"
                name={optionalField.name}
                label={optionalField.label}
                key={optionalField.label}
              />
            );
          })}
        </div>
        <Button
          variant="contained"
          color="success"
          className="text-my-green-1 border-my-green-1 mr-8"
          onClick={handleEdit}
        >
          Update
        </Button>
      </Box>
    );
  };

  const submitDate = async (evt: any) => {
    evt.preventDefault();
    console.log("submitDate")
    console.log(startDate)
    const start = startDate.replaceAll("-", "");
    const end = endDate.replaceAll("-", "");
    const res = await getMyInstrumentPnLDate(instrumentId, start, end);
    console.log("netProfits")
    setNetProfits(res["data"]);
    console.log(res);
  };

  const displayAnalytics = () => {
    return (
      <div title="Analytics" >
        <div className="text-4xl font-bold">Analytics</div>
        <div className="flex justify-center items-center">
          <div>
            <div>Start Date</div>
            <TextField
              type="date"
              required
              id="outlined-required"
              name={"startDate"}
              // label={'Enter Start Date'}
              value={startDate}
              onChange={(e: any) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <div>End Date</div>
            <TextField
              type="date"
              required
              id="outlined-required"
              name={"endDate"}
              // label={'Enter Start Date'}
              value={endDate}
              onChange={(e: any) => setEndDate(e.target.value)}
            />
          </div>

          <Button
            variant="contained"
            color="success"
            className="text-my-green-1 border-my-green-1 mr-8"
            onClick={submitDate}
          >
            Submit
          </Button>
          <div className={BlockClassName + ' mb-4 w-9/10'}>
            {netProfits && (
              <InstrumentChart
                title={"Net Profit/Loss"}
                data={parseGraphMVDateForPNL(netProfits)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log(router.query)
    const id = router.query.id as string
    setInstrumentId(id)
    console.log(`id ${id}`)
    const fetchInstrumentData = async (id: number) => {
      let res = (await getInstrumentById(id))?.data
      console.log(res)
      setInstDetails(res)
    }
    const fetchInstrumentMV = async (id: number) => {
      let res = (await getMarketValuesById(id))?.data;
      setInstMVs(res);
    };
    const fetchMyInstrumentValue = async (id: number) => {
      const start = startDate.replaceAll("-", "");
      const end = endDate.replaceAll("-", "");
      let res = (await getMyInstrumentValue(id, start, end))?.data;
      console.log(res);
      setMyInvVal(res);
    };
    // const fetchMyPnL = async (id: number) => {
    //   let res = (await getMyInstrumentPnL(id))?.data;
    //   console.log(res);
    //   setInstrPnL(res);
    // };

    fetchInstrumentData(id as unknown as number);
    fetchInstrumentMV(id as unknown as number);
    // fetchMyPnL(id as unknown as number);
    fetchMyInstrumentValue(id as unknown as number);
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
              {instDetails ? instDetails['instrumentName'] : 'Loading...'}
            </h1>
            <IconButton
              // color="primary"
              size="large"
              aria-label="Upload instrument data"
              className="text-my-blue-2"
              onClick={() => {
                setEditMode((prev) => !prev);
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
                setShowDelModal(true)
              }}
            >
              <DeleteForeverIcon className="text-white w-8 h-8" />
            </IconButton>
          </div>
          <div>{editMode && displayInstrumentForm()}</div>
          <div className="flex items-center justify-between my-6">
            <div className="p-4 bg-white rounded-2xl flex items-center grow mr-4">
              <div className="">
                <h4 className="text-2xl">PnL</h4>
                <div className="text-my-green-1">{`${netProfits?netProfits[netProfits.length-1]:0}%`}</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl flex items-center grow mx-4">
              <div className="">
                <h4 className="text-2xl">Portfolio Value</h4>

                <div className="text-my-green-1">
                  {instDetails
                    ? `${instDetails["instrumentCurrency"]} ${myInvestmentValue}`
                    : "-"}
                </div>
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
              <div className={BlockClassName + ' mb-4'}>
                <InstrumentChart
                  title={getGraphTitle(dataType)}
                  data={parseGraphMVData(instMVs)}
                />
              </div>
              <div className={BlockClassName}>
                {displayAnalytics()}
                {instrumentId?.length > 0 && displayTransactions()}
              </div>
            </div>
            <div className="shrink-0 w-1/3 ml-2">
              <div className={BlockClassName + ' mb-4  '}>
                <InstrumentDetails instDetails={instDetails} />
              </div>
              <div className={BlockClassName}>
                <InstrumentBuySell id={instrumentId} instMVs={instMVs} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full bg-zinc-800 rounded-tl-2xl h-[20%] z-0"></div>
      </div>
      <Modal
        open={showDelModal}
        onClose={() => {
          setShowDelModal(false)
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
                instDetails ? delInstrument(instDetails['instrumentId']) : 1
                window.location.replace('/instruments')
              }}
            >
              Totally~
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default InstrumentPage

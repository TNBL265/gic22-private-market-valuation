import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Section from '../common/Section/Section'
import Table from '../common/Table/Table'

import { headings, selectFields } from './constants'
import {
  InstrumentFormData,
  InstrumentsData,
  InstrumentsRowData,
} from '../../types/instruments'
import { sampleData } from './sampleData'
import { requiredFields, optionalFields } from './constants'
import { INSTRUMENTS_BASE_URL } from './constants'

import styles from './Instruments.module.css'
import { parseInstrumentsViewData } from '../common/Parser/Parser'
import { Button, IconButton, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/material'
import axios from 'axios'

import { getInstruments } from '../common/Apis'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
// import Modal from '../common/Modal/Modal'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import InstrUpload from './InstrumentsUpload'

const Instruments = () => {
  const router = useRouter()
  const [userSearchInput, setUserSearchInput] = useState<string>('')
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>('Search')
  const [queriedInstruments, setQueriedInstruments] = useState<
    InstrumentsRowData[]
  >([])
  const [instruments, setInstruments] = useState<InstrumentsRowData[]>([])
  const [formData, setFormData] = useState<InstrumentFormData>({
    instrumentName: '',
    instrumentType: '',
    country: '',
    sector: '',
    instrumentCurrency: '',
    isTradeable: 'False',
  })
  const [showForm, setShowForm] = useState<boolean>(false)
  const [file, setFile] = useState(null)
  const [fileType, setFileType] = useState<string>('')
  const [showUploadModal, setUploadModal] = useState<boolean>(false)

  const toggleModal = () => {
    setUploadModal(!showUploadModal)
  }

  const handleInput = (evt: any) => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormData({ ...formData, [name]: newValue })
  }

  const handleRowClick = (id: number) => {
    const route = `/instruments/${id}`
    window.open(route, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (evt: any) => {
    evt.preventDefault()

    let data = { data: formData }
    //check if all the required inputs are entered
    console.log(data)
    const headers = {
      'Content-Type': 'application/json',
    }
    const res = await axios
      .post(INSTRUMENTS_BASE_URL, data, { headers })
      .then((res) => {
        console.log(res)
      })
  }

  const displayInstrumentForm = () => {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mt: 2, mb: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {requiredFields.map((requiredField) => {
            return (
              <TextField
                required
                id="outlined-required"
                name={requiredField.name}
                label={requiredField.label}
                key={requiredField.label}
                onChange={handleInput}
              />
            )
          })}
          {selectFields.map((selectField) => {
            return (
              <TextField
                select
                id="outlined-required"
                name={selectField.name}
                label={selectField.label}
                value={formData?.isTradeable == 'True' ? 'True' : 'False'}
                key={selectField.label}
                onChange={handleInput}
              >
                <MenuItem key={'True'} value={'True'}>
                  {'True'}
                </MenuItem>
                <MenuItem key={'False'} value={'False'}>
                  {'False'}
                </MenuItem>
              </TextField>
            )
          })}
          {optionalFields.map((optionalField) => {
            return (
              <TextField
                id="outlined-helperText"
                name={optionalField.name}
                label={optionalField.label}
                key={optionalField.label}
              />
            )
          })}
        </div>
        <div className={styles.button}>
          <div className={styles.text} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </Box>
    )
  }

  // Search currently resets Filter to none since it filters from crafts
  const handleSearch = (userQuery: string) => {
    userQuery = userQuery.toLowerCase()

    console.log(instruments)
    const filteredInstruments = instruments.filter((instrument) =>
      instrument.instrumentName.toLowerCase().includes(userQuery),
    )
    console.log(filteredInstruments)
    setQueriedInstruments(filteredInstruments)
  }

  useEffect(() => {
    //fetch data
    const fetchData = async () => {
      console.log(INSTRUMENTS_BASE_URL)
      const data: InstrumentsData[] = (await getInstruments())?.data
      if (data == undefined || data.length == 0) {
        return
      }
      console.log(data)
      const fetchedData = parseInstrumentsViewData(data)
      setInstruments(fetchedData)
      setQueriedInstruments(fetchedData)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title="Add Instrument" size={'L'}>
            {/* Add instruments form */}
            <>
              <div className={styles.button}>
                <div
                  className={styles.text}
                  onClick={() => setShowForm((prevData) => !prevData)}
                >
                  {showForm ? 'Cancel' : 'Add'}
                </div>
              </div>
              <div>{showForm && displayInstrumentForm()}</div>
            </>
          </Section>
        </div>
        <div className={styles.section}>
          <Section title="Browse Instruments" size={'L'}>
            {/* View the instruments based on search */}
            <div>
              <div className="flex justify-between">
                <input
                  id="searchBar"
                  value={userSearchInput}
                  type="text"
                  className={styles.searchBar}
                  placeholder={searchPlaceholder}
                  onChange={(event) => {
                    setUserSearchInput(event.target.value)
                    handleSearch(event.target.value)
                  }}
                  onFocus={() => setSearchPlaceholder('e.g Armstrong...')}
                  onBlur={() => setSearchPlaceholder('Search')}
                />
                <IconButton
                  color="primary"
                  size="large"
                  aria-label="Upload instrument data"
                  className="text-my-blue-2"
                  onClick={toggleModal}
                >
                  <CloudUploadIcon className="w-8 h-8" />
                </IconButton>
              </div>
              <Table
                columns={headings.length}
                tableHeaders={headings.map((heading) => heading.name)}
                rows={queriedInstruments}
                width="65vw"
                buttonName="More Info"
                idColumn={'instrumentId'}
                skipColumns={['instrumentId']}
                handleClick={handleRowClick}
              ></Table>
            </div>
          </Section>
        </div>
      </div>
      <InstrUpload
        showUploadModal={showUploadModal}
        toggleModal={toggleModal}
      />
    </div>
  )
}
export default Instruments

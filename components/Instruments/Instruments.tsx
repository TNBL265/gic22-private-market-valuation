import { useEffect, useState } from 'react'

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
import { MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/material'
import axios from 'axios'
import Modal from '../common/Modal/Modal'

const Instruments = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>('')
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>('Search')
  const [queriedInstruments, setQueriedInstruments] = useState<
    InstrumentsRowData[]
  >([])
  const [instruments, setInstruments] = useState<InstrumentsRowData[]>([])
  const [formData, setFormData] = useState<InstrumentFormData | null>(null)

  const [open, setOpen] = useState<boolean>(false)
  const [modal, setModal] = useState(<div></div>)
  const handleOpenModal = (open: boolean) => {
    if (open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleInput = (evt: any) => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormData({ ...formData, [name]: newValue })
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
          '& .MuiTextField-root': { m: 1, width: '25ch' },
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
      const data: InstrumentsData[] = (
        await axios.get(INSTRUMENTS_BASE_URL).then((res) => {
          return res
        })
      ).data.data
      console.log(data)
      const fetchedData = parseInstrumentsViewData(data)
      setInstruments(fetchedData)
      setQueriedInstruments(fetchedData)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <Modal
        open={open}
        height={'80vh'}
        width={'50vw'}
        handleClose={() => handleOpenModal(false)}
      ></Modal>
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title="Add Instrument" size={'L'}>
            {/* Add instruments form */}
            <>
              <div className={styles.button}>
                <div
                  className={styles.text}
                  onClick={() => handleOpenModal(true)}
                >
                  Add an Instrument
                </div>
              </div>
              <div>{displayInstrumentForm()}</div>
            </>
          </Section>
        </div>
        <div className={styles.section}>
          <Section title="Browse Instruments" size={'L'}>
            {/* View the instruments based on search */}
            <div>
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
              <Table
                columns={headings.length}
                tableHeaders={headings.map((heading) => heading.name)}
                rows={queriedInstruments}
                width="65vw"
              ></Table>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
export default Instruments

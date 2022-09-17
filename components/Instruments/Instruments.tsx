import { useEffect, useState } from 'react'

import Section from '../common/Section/Section'
import Table from '../common/Table/Table'

import { headings } from './constants'
import { InstrumentsData, InstrumentsRowData } from '../../types/instruments'
import { sampleData } from './sampleData'
import { requiredFields, optionalFields } from './constants'
import { INSTRUMENTS_BASE_URL } from './constants'

import styles from './Instruments.module.css'
import { parseInstrumentsViewData } from '../common/Parser/Parser'
import { TextField } from '@mui/material'
import { Box } from '@mui/material'
import axios from 'axios'

const Instruments = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>('')
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>('Search')
  const [queriedInstruments, setQueriedInstruments] = useState<
    InstrumentsRowData[]
  >([])
  const [instruments, setInstruments] = useState<InstrumentsRowData[]>([])

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
                label={requiredField.label}
                key={requiredField.label}
              />
            )
          })}
          {optionalFields.map((optionalField) => {
            return (
              <TextField
                id="outlined-helperText"
                label={optionalField.label}
                key={optionalField.label}
              />
            )
          })}
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
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title="Add Instrument" size={'L'}>
            {/* Add instruments form */}
            <>
              <div className={styles.button}>
                <div className={styles.text}>Add an Instrument</div>
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

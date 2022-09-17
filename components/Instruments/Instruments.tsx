import { useEffect, useState } from 'react'

import Section from '../common/Section/Section'
import Table from '../common/Table/Table'

import { headings } from './constants'
import { InstrumentsData, InstrumentsRowData } from '../../types/instruments'
import { sampleData } from './sampleData'

import styles from './Instruments.module.css'
import { parseInstrumentsViewData } from '../common/Parser/Parser'

const Instruments = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>('')
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>('Search')
  const [queriedInstruments, setQueriedInstruments] = useState<
    InstrumentsRowData[]
  >([])
  const [instruments, setInstruments] = useState<InstrumentsRowData[]>([])

  // Search currently resets Filter to none since it filters from crafts
  const handleSearch = (userQuery: string) => {
    userQuery = userQuery.toLowerCase()

    setQueriedInstruments(
      instruments.filter((instrument) =>
        instrument.instrumentName.toLowerCase().includes(userQuery),
      ),
    )
  }

  useEffect(() => {
    //fetch data
    const fetchedData = parseInstrumentsViewData(sampleData)
    setInstruments(fetchedData)
    setQueriedInstruments(fetchedData)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title="Browse Instruments" size={'L'}>
            {/* Add instruments form */}
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
                onFocus={() => setSearchPlaceholder('e.g The Savana...')}
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

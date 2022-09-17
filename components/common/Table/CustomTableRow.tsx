import { MouseEventHandler, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Button, Modal } from '@mui/material'
import Image from 'next/image'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const CustomTableRow = ({ row }: any) => {
  const [tableRow, setTableRow] = useState(row)
  const [newRow, setNewRow] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [attributes, setAttributes] = useState<string[]>(Object.keys(row))

  useEffect(() => {}, [isLoading])

  return (
    <>
      {attributes.map((attribute, idx) => {
        if (idx == 0) {
          return (
            <StyledTableCell component="th" scope="row" key={idx}>
              {tableRow[attribute]}
            </StyledTableCell>
          )
        }
        return (
          <StyledTableCell align="right" key={idx}>
            {idx == 3 && tableRow[attribute] == 'YES' ? (
              <div style={{ fontWeight: 600 }}>{tableRow[attribute]}</div>
            ) : (
              tableRow[attribute]
            )}
          </StyledTableCell>
        )
      })}
    </>
  )
}

export default CustomTableRow

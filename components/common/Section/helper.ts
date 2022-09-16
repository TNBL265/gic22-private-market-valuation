export const getSectionWidth = (size: string) => {
  const width = size == 'S' ? '22.75vw' : size == 'M' ? '34.5vw' : '70vw'
  return width
}

export const getSectionMarginRight = (size: string) => {
  const marginRight = size == 'S' ? '1vw' : '1vw'
  return marginRight
}

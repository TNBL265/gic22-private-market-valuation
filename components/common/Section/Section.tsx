import { ReactElement } from 'react'
import { getSectionMarginRight, getSectionWidth } from './helper'
import styles from './Section.module.css'

interface SectionProps {
  title: string
  titleColor?: string
  size: string
  height?: string
  width?: string
  marginRight?: string
  background?: string
  children?: ReactElement
}

const Section = ({
  title,
  titleColor,
  size,
  height,
  width,
  marginRight,
  background,
  children,
}: SectionProps) => {
  const sectionWidth = width ? width : getSectionWidth(size)
  const sectionMarginRight = marginRight
    ? marginRight
    : getSectionMarginRight(size)
  return (
    <div
      className={`${styles.container}`}
      style={{
        height,
        background,
        width: sectionWidth,
        marginRight: sectionMarginRight,
      }}
    >
      <div className={styles.title} style={{ color: titleColor }}>
        {title}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default Section

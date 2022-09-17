import LeftNavbar from '../components/common/LeftNavbar/LeftNavbar'
import Instruments from '../components/Instruments/Instruments'

const instruments = () => {
  return (
    <div className="page__container flex relative">
      <div className="page__left">
        <LeftNavbar />
      </div>
      <div className="page__body">
        <Instruments />
      </div>
    </div>
  )
}

export default instruments

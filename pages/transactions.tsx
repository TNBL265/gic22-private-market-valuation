import LeftNavbar from '../components/common/LeftNavbar/LeftNavbar'
import Transactions from '../components/Transactions/Transactions'

const transactions = () => {
  return (
    <div className="page__container flex relative">
      <div className="page__left">
        <LeftNavbar />
      </div>
      <div className="page__body grow">
        <Transactions />
      </div>
    </div>
  )
}

export default transactions

import LeftNavbar from '../components/common/LeftNavbar/LeftNavbar'
import Transactions from '../components/Transactions/Transactions'

const transactions = () => {
  return (
    <div className="page__container">
      <div className="page__left">
        <LeftNavbar />
      </div>
      <div className="page__body">
        <Transactions />
      </div>
    </div>
  )
}

export default transactions

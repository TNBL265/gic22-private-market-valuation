import LeftNavbar from '../components/common/LeftNavbar/LeftNavbar'
import Dashboard from '../components/Dashboard/Dashboard'

const dashboard = () => {
  return (
    <div className="page__container">
      <div className="page__left">
        <LeftNavbar />
      </div>
      <div className="page__body">
        <Dashboard />
      </div>
    </div>
  )
}

export default dashboard

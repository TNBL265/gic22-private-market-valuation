import { useRouter } from "next/router";
import LeftNavbar from "../../../components/common/LeftNavbar/LeftNavbar";
import InstrumentChart from "../../../components/Instruments/Instrument/InstrumentChart";

const BlockClassName = "p-4 rounded-lg bg-white";

const InstrumentPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  // const { id } = router.query
  console.log(`id ${id}`);
  return (
    <div className="page__container">
      <div className="page__left">
        <LeftNavbar />
      </div>
      <div className="page__body">
        <div className={BlockClassName}>
          <InstrumentChart />
        </div>
      </div>
    </div>
  );
};
// export async function getStaticPaths() {
//     const paths = ["abc"];
//     return {
//       paths,
//       fallback: false,
//     };
//   }
export default InstrumentPage;

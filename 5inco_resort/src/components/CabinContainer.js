import { withCabinConsumer } from "../Context";
import Loading from "./Loading";
import CabinsList from "./CabinsList";
import CabinsFilter from "./CabinsFilter";

function CabinContainer({ context }) {
  const { loading, sortedCabins, cabins } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <CabinsFilter cabins={cabins} />
      <CabinsList cabins={sortedCabins} />
    </div>
  );
}
export default withCabinConsumer(CabinContainer);

import Cabin from "./Cabin";

export default function CabinsList({ cabins }) {
  if (cabins.length === 0) {
    return (
      <div className="empty-search">
        <h3>Unfortunately no cabins matched your search</h3>
      </div>
    );
  }
  return (
    <section className="cabins-list">
      <div className="cabins-list-center">
        {cabins.map((item) => {
          return <Cabin key={item.id} cabin={item} />;
        })}
      </div>
    </section>
  );
}

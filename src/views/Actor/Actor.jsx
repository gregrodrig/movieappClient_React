import InfoTable from "../../components/InfoTable/InfoTable";

export default function Actor() {
  return (
    <div>
      <InfoTable
        path={"actores"}
        nameModel={"nombre"}
        idModel={"idActor"}
        tableNameModel={"Actores"}
      />
    </div>
  );
}

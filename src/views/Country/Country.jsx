import InfoTable from "../../components/InfoTable/InfoTable";

export default function Actor() {
  return (
    <div>
      <InfoTable
        path={"pais"}
        idModel={"idPais"}
        confirmColumn="pais"
        columnsTableHeader={["País"]}
        columnDataName={["pais"]}
        inputLabel={"país"}
        formTitle="País"
      />
    </div>
  );
}

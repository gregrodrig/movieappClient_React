import InfoTable from "../../components/InfoTable/InfoTable";

export default function Actor() {
  return (
    <div>
      <InfoTable
        path={"actores"}
        idModel={"idActor"}
        confirmColumn="nombre"
        columnsTableHeader={["Actor", "Apellidos"]}
        columnDataName={["nombre", "apellidos"]}
        inputLabel={"nombre"}
        formTitle="Actor"
      />
    </div>
  );
}

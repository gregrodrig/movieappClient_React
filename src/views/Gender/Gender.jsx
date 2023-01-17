import InfoTable from "../../components/InfoTable/InfoTable";

export default function Actor() {
  return (
    <div>
      <InfoTable
        path={"generos"}
        idModel={"idGenero"}
        confirmColumn="genero"
        columnsTableHeader={["Genero"]}
        columnDataName={["genero"]}
        inputLabel={"genero"}
        formTitle="Genero"
      />
    </div>
  );
}

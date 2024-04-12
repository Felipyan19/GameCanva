import * as React from "react";
import { motion } from "framer-motion";
import Title from "../../components/Title";
import Navbar from "./../../components/Navbar";
import { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function CustomizedTables() {
  const [rows, setRows] = React.useState([]);
 // const apiUrl = process.env.REACT_APP_API_URL;
 useEffect(() => {
  const obtenerHistorial = async () => {
    try {
      const response = await fetch(
        `https://zr5zwb0d-5000.use.devtunnels.ms/api/partidas`
      );
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  obtenerHistorial(); 

}, []);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 120,
          damping: 10,
        }}
        style={{ width: "80%", margin: "auto" }}
      >
        <Title title="Historial" />
        <div className="p-card p-shadow-4 p-mb-4">
          <DataTable
            value={rows}
            scrollable
            scrollDirection="both"
            scrollHeight="60vh"
            className="data-table-container striped-rows"
          >
            <Column
              field="id"
              header="ID"
              className="custom-column"
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="ganador"
              header="Nombre"
              className="custom-column"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="perdedor"
              header="Nombre"
              className="custom-column"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="tiempo"
              header="Nombre"
              className="custom-column"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="fecha"
              header="Nombre"
              className="custom-column"
            ></Column>
          </DataTable>
        </div>
      </motion.div>
    </>
  );
}

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

// const getLocalStorage = () => {
//   const data = localStorage.getItem("data");
//   if (data) {
//     const parsedData = JSON.parse(data); // Convierte la cadena JSON en un objeto JavaScript.
//     return ( parsedData );
//   }
//   return [];
// };

export default function CustomizedTables() {
  const [jugadores, setJugadores] = React.useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    const obtenerJugadores = async () => {
      try {
        const response = await fetch(
          `https://zr5zwb0d-5000.use.devtunnels.ms/api/posiciones`
        );
        if (!response.ok) {
          throw new Error("Error al obtener jugadores");
        }
        const data = await response.json();
        setJugadores(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    obtenerJugadores();
  }, []);

  const puesto = (posicion) => {
    switch (posicion) {
      case 1:
        return <FaTrophy className="p-icon-lg p-text-info" />;
      case 2:
        return <FaMedal className="p-icon-lg p-text-success" />;
      case 3:
        return <FaAward className="p-icon-lg p-text-warning" />;
      default:
        return <div className="p-tag p-tag-rounded p-tag-secondary">{posicion}</div>;
    }
  };

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
        <Title title="Posiciones" />

        <div className="p-card p-shadow-4 p-mb-4">
          <DataTable
            value={jugadores}
            scrollable
            scrollDirection="both"
            scrollHeight="60vh"
            className="data-table-container striped-rows"
          >
            <Column
              field="posicion"
              header="Posicion"
              className="custom-column"
              style={{ textAlign: "center" }}
              body={(rowData) => puesto(rowData.posicion)}
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="nombre"
              header="Nombre"
              className="custom-column"
            ></Column>
            <Column
              field="partidas_jugadas"
              header="Partidas jugadas"
              className="custom-column"
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="partidas_ganadas"
              header="Partidas Ganadas"
              className="custom-column"
            ></Column>
            <Column
              field="partidas_perdidas"
              header="Partidas Perdidas"
              className="custom-column"
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="tiempo_sumado"
              header="Tiempo Total Ganador"
              className="custom-column"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              field="foto"
              header="Foto"
              body={(rowData) => (
                <img
                  src={`data:image/png;base64, ${rowData.foto}`}
                  className="custom-image"
                  width={"100px"}
                  alt="Foto de jugador"
                />
              )}
              className="custom-column"
            ></Column>
          </DataTable>
        </div>
      </motion.div>
    </>
  );
}

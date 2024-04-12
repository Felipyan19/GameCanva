import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Users() {
  //const apiUrl = process.env.REACT_APP_API_URL;
  const [jugadores, setJugadores] = useState([]);
  
  useEffect(() => {
    const obtenerJugadores = async () => {
      try {
        const response = await fetch(
          `https://zr5zwb0d-5000.use.devtunnels.ms/api/jugadores`
        );
        if (!response.ok) {
          throw new Error("Error al obtener jugadores");
        }
        const data = await response.json();
        setJugadores(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    obtenerJugadores();
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
        <Title title="Jugadores" />

        <div className="p-card p-shadow-4 p-mb-4">
          <DataTable
            value={jugadores}
            scrollable
            scrollDirection="both"
            scrollHeight="60vh"
            className="data-table-container striped-rows"
          >
            <Column field="id" header="ID" className="custom-column" style={{ textAlign: "center" }}></Column>
            <Column
            style={{ textAlign: "center" }}
              field="nombre"
              header="Nombre"
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

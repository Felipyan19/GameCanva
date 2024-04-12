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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: "60vh",
  overflowY: "auto",
});

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
        <Table
          sx={{ minWidth: 700, background: "var(--azure-600)" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Partidas jugadas</StyledTableCell>
              <StyledTableCell align="center">Partidas ganadas</StyledTableCell>
              <StyledTableCell align="center">
                Partidas perdidas
              </StyledTableCell>
              <StyledTableCell align="center">
                Tiempo total ganador(s)
              </StyledTableCell>
              <StyledTableCell align="center">Foto</StyledTableCell>{" "}
              {/* Nueva columna para la foto */}
            </TableRow>
          </TableHead>
        </Table>
        <ScrollableTableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
              {jugadores.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.nombre}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.partidas_jugadas}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.partidas_ganadas}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.partidas_perdidas}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.tiempo_total_ganador}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={`data:image/png;base64, ${row.foto}`}
                      width="200px"
                      alt="Foto de jugador"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollableTableContainer>
      </motion.div>
    </>
  );
}

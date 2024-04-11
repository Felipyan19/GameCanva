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

const getLocalStorage = () => {
  const data = localStorage.getItem("data");
  if (data) {
    const parsedData = JSON.parse(data);
    // Crear un objeto para almacenar los puntos por jugador
    const playerPoints = {};
    parsedData.forEach((item) => {
      if (playerPoints[item.id]) {
        // Si el jugador ya existe en el objeto, sumar los puntos
        playerPoints[item.id] += item.time;
      } else {
        // Si el jugador no existe en el objeto, inicializar con los puntos actuales
        playerPoints[item.id] = item.time;
      }
    });
    // Convertir el objeto en un array de objetos para mostrar en la tabla
    const formattedData = Object.keys(playerPoints).map((playerId) => ({
      id: playerId,
      totalPoints: parsedData.filter((item) => item.id === playerId).length,
      timesPlayed: playerPoints[playerId],
    }));
    return formattedData;
  }
  return [];
};

export default function CustomizedTables() {
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Jugador</StyledTableCell>
                <StyledTableCell align="center">Gana</StyledTableCell>
                <StyledTableCell align="center">Tiempo(s)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getLocalStorage().map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.totalPoints}</StyledTableCell>
                  <StyledTableCell align="center">{row.timesPlayed}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </>
  );
}

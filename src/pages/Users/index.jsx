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

export default function Users() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [jugadores, setJugadores] = React.useState([]);
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

  React.useEffect(() => {
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
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Id</StyledTableCell>
              <StyledTableCell align="left">Nombre</StyledTableCell>
              <StyledTableCell align="left">Foto</StyledTableCell>{" "}
              {/* Nueva columna para la foto */}
            </TableRow>
          </TableHead>
        </Table>
        <ScrollableTableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
              {jugadores.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.nombre}</StyledTableCell>
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

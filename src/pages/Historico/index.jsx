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
import Navbar from "./../../components/Navbar";
import { useEffect } from "react";

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

export default function CustomizedTables() {
  const [rows, setRows] = React.useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://zr5zwb0d-5000.use.devtunnels.ms/api/partidas`
        );
        const data = await response.json();
        setRows(data);
        console.log(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
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
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Ganador</StyledTableCell>
              <StyledTableCell align="center">Perdedor</StyledTableCell>
              <StyledTableCell align="center">Tiempo(s)</StyledTableCell>
              <StyledTableCell align="center">Fecha</StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
        <ScrollableTableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.ganador}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.perdedor}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.tiempo}</StyledTableCell>
                  <StyledTableCell align="center">{row.fecha}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollableTableContainer>
      </motion.div>
    </>
  );
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import Title from '../../components/Title';
import Navbar from './../../components/Navbar';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getLocalStorage = () => {
  const data = localStorage.getItem("data");
  if (data) {
    const parsedData = JSON.parse(data);
    // Ordenar los datos por fecha en orden descendente
    const sortedData = parsedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedData;
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
      transition={{ duration: 1, type: "spring", stiffness: 120, damping: 10 }}
      style={{ width: "80%", margin: "auto"}}
    >
      <Title title="Historial" />
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="sticky table" >
        <TableHead>
          <TableRow>
           <StyledTableCell align="center">Jugador</StyledTableCell>
            <StyledTableCell align="center">Gana</StyledTableCell>
            <StyledTableCell align="center">Tiempo(s)</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getLocalStorage().map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
              <StyledTableCell align="center">{row.time}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </motion.div>
    </>
  );
}

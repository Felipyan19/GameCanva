import React, { useState, useEffect, useRef } from "react";
import { Box, Slider, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import ProductionQuantityLimitsSharpIcon from "@mui/icons-material/ProductionQuantityLimitsSharp";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Title from "../../components/Title";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import "./style.css";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import Confetti from "react-confetti";
import raceImg from "../../assets/race.avif";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const apiUrl = process.env.REACT_APP_API_URL;

const StyledSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    color: "#52af77",
    backgroundColor: "#52af77",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
});

const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: "60vh",
  overflowY: "auto",
});

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

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

export default function Game() {
  const [slider1Value, setSlider1Value] = useState({ jugador: null, value: 0 });
  const [slider2Value, setSlider2Value] = useState({ jugador: null, value: 0 });
  const [winner, setWinner] = useState({ jugador: null, value: 0 });
  const [perdedor, setPerdedor] = useState({ jugador: null, value: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [game, setGame] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [jugadores, setJugadores] = React.useState([]);
  const [open2, setOpen2] = React.useState(false);
  const [remainingPlayers, setRemainingPlayers] = React.useState([]);

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
      setOpen2(true);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleStart = () => {
    setStart(true);
    Swal.fire({
      title: "3",
      icon: "info",
      text: "¡Prepárate para la carrera!",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
      .then(() => {
        return Swal.fire({
          title: "2",
          icon: "info",
          text: "¡Prepárate para la carrera!",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .then(() => {
        return Swal.fire({
          title: "1",
          icon: "info",
          text: "¡Prepárate para la carrera!",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .then(() => {
        return Swal.fire({
          title: "¡Comienza la carrera!",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          setGame(true);
          setStart(false);
        });
      });
  };
  const handleRegister = async () => {
    try {
      const response = await fetch(
        `https://zr5zwb0d-5000.use.devtunnels.ms/api/partidas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ganador: winner.jugador,
            perdedor: perdedor.jugador,
            fecha: new Date(),
            tiempo: elapsedTime,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al registrar el jugador");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const [posicion, setPosicion] = React.useState([]);

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
        setPosicion(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    obtenerJugadores();
  }, [winner]);

  useEffect(() => {
    if (winner.jugador && !open) {
      console.log("El ganador es:", winner);
      const endTime = new Date();
      const timeDifference = endTime - startTime;
      setElapsedTime(timeDifference);
      speak(`El ganador es: ${winner.jugador}`);
      handleOpen();
      handleRegister();
    }
  }, [winner, open]);

  const handleSlider1Change = (event, newValue) => {
    if (newValue >= 100 && !winner.jugador) {
      setWinner({ ...slider1Value });
      setPerdedor({ ...slider2Value });
      setStartTime(new Date());
    }
    setSlider1Value({ ...slider1Value, value: newValue });
  };

  const handleSlider2Change = (event, newValue) => {
    if (newValue >= 100 && !winner.jugador) {
      setWinner({ ...slider2Value });
      setPerdedor({ ...slider1Value });
      setStartTime(new Date());
    }
    setSlider2Value({ ...slider2Value, value: newValue });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 120, damping: 10 }}
      style={{ overflowY: "auto", height: "100vh", padding: "20px" }}
    >
      {(open || start) && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Title title="Carrera" />

      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `${
                !game
                  ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(" +
                    raceImg +
                    ")"
                  : "url(" + raceImg + ")"
              }`,
              backgroundSize: "contain",
              borderRadius: "10px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
            onClick={obtenerJugadores}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "70%",
                maxWidth: "300px",
                textAlign: "center",
                zIndex: 1,
              }}
            >
              {!game && (
                <>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 1,
                      color: "var(--azure-500)",
                      fontWeight: "bold",
                    }}
                  >
                    Empezar la carrera
                  </Typography>
                  <Typography
                    variant="body1 "
                    sx={{ color: "var(--azure-50)" }}
                  >
                    Mueve los sliders para ganar
                  </Typography>
                </>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 0,
              }}
            >
              <img
                src={`data:image/png;base64, ${
                  jugadores.find((j) => j.nombre === slider1Value.jugador)?.foto
                }`}
                width={"80px"}
                style={{
                  position: "absolute",
                  left: `calc(${slider1Value.value}%)`,
                  top: "10%",
                  fontSize: "2rem",
                  color: "var(--azure-400)",
                  zIndex: 1,
                }}
              />
              <img
                src={`data:image/png;base64, ${
                  jugadores.find((j) => j.nombre === slider2Value.jugador)?.foto
                }`}
                width={"80px"}
                style={{
                  position: "absolute",
                  left: `calc(${slider2Value.value}%)`,
                  top: "60%",
                  fontSize: "2rem",
                  color: "var(--azure-400)",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  zIndex: 0,
                }}
              ></div>
            </div>
          </Box>
          {game && (
            <>
              <div style={{ marginTop: "2rem" }}>
                <StyledSlider
                  value={slider1Value.value}
                  onChange={handleSlider1Change}
                  aria-label="player 1 slider"
                />
                <StyledSlider
                  value={slider2Value.value}
                  onChange={handleSlider2Change}
                  aria-label="player 2 slider"
                />
              </div>

              <Box sx={{ margin: "2rem 5rem" }}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item>
                    <Paper
                      elevation={3}
                      sx={{ padding: "1rem", textAlign: "center" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "var(--azure-500)", marginBottom: "1rem" }}
                      >
                        {slider1Value.jugador ? ` ${slider1Value.jugador}` : ""}
                      </Typography>
                      <img
                        src={`data:image/png;base64, ${
                          jugadores.find(
                            (j) => j.nombre === slider1Value.jugador
                          )?.foto
                        }`}
                        width="100px"
                        alt="Foto de Jugador 1"
                      />
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3" sx={{ color: "var(--azure-500)" }}>
                      VS
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Paper
                      elevation={3}
                      sx={{ padding: "1rem", textAlign: "center" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "var(--azure-500)" }}
                      >
                        {slider2Value.jugador ? `${slider2Value.jugador}` : ""}
                      </Typography>
                      <img
                        src={`data:image/png;base64, ${
                          jugadores.find(
                            (j) => j.nombre === slider2Value.jugador
                          )?.foto
                        }`}
                        width="100px"
                        alt="Foto de Jugador 2"
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nombre</StyledTableCell>
                <StyledTableCell align="center">
                  Partidas ganadas
                </StyledTableCell>
                <StyledTableCell align="center">Foto</StyledTableCell>{" "}
                {/* Nueva columna para la foto */}
              </TableRow>
            </TableHead>
          </Table>
          <ScrollableTableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                {posicion.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">
                      {row.nombre}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.partidas_jugadas}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <img
                        src={`data:image/png;base64, ${row.foto}`}
                        width="50px"
                        alt="Foto de jugador"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollableTableContainer>
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <Box sx={{ p: 3, bgcolor: "#f0f0f0", position: "relative" }}>
            <Typography variant="h6" sx={{ color: "#3f51b5", mb: 2 }}>
              Felicidades Ganaste {winner?.jugador}
            </Typography>
            <div className={`audio-waves ${isSpeaking ? "speaking" : ""}`}>
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="wave"
                  style={{ animationDuration: `${0.5 + i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <img
              src={`data:image/png;base64, ${
                jugadores.find((j) => j.nombre === winner.jugador)?.foto
              }`}
              width="200px"
              alt="Foto de jugador"
            />
            <Button></Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClose();
                setWinner({ jugador: null, value: 0 });
                setSlider1Value({ ...slider1Value, value: 0 });
                setSlider2Value({ ...slider2Value, value: 0 });
                Swal.fire({
                  title: "Gracias por jugar",
                  text: "¿Deseas cambiar de jugador?",
                  icon: "success",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, cambiar",
                  cancelButtonText: "No, cerrar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setOpen2(true);
                  }
                });
              }}
              sx={{ mt: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ p: 3, bgcolor: "#f0f0f0", position: "relative" }}>
          <div>
            <Typography variant="h6" sx={{ color: "#3f51b5", mb: 2 }}>
              Escoge los jugadores
            </Typography>
            <TextField
              id="outlined-basic-1"
              label="Jugador 1"
              select
              variant="outlined"
              value={slider1Value.jugador}
              onChange={(event) => {
                const selectedPlayer = event.target.value;
                setSlider1Value({ ...slider1Value, jugador: selectedPlayer });
                // Filtrar la lista de jugadores disponibles para el segundo select
                const remainingPlayers = jugadores.filter(
                  (jugador) => jugador.nombre !== selectedPlayer
                );
                setRemainingPlayers(remainingPlayers);
              }}
              style={{ width: "200px" }}
            >
              {jugadores.map((jugador) => (
                <MenuItem key={jugador.id} value={jugador.nombre}>
                  {jugador.nombre}
                </MenuItem>
              ))}
            </TextField>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              VS
            </Typography>
            <TextField
              id="outlined-basic-2"
              label="Jugador 2"
              select
              variant="outlined"
              value={slider2Value.jugador}
              onChange={(event) =>
                setSlider2Value({
                  ...slider2Value,
                  jugador: event.target.value,
                })
              }
              style={{ width: "200px" }}
            >
              {/* Usar la lista de jugadores filtrada */}
              {remainingPlayers.map((jugador) => (
                <MenuItem key={jugador.id} value={jugador.nombre}>
                  {jugador.nombre}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose2();
              handleStart();
            }}
            sx={{ mt: 2 }}
          >
            Aceptar
          </Button>
        </Box>
      </Modal>
    </motion.div>
  );
}

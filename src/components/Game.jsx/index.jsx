import React, { useState, useEffect, useRef } from "react";
import { Box, Slider, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import ProductionQuantityLimitsSharpIcon from "@mui/icons-material/ProductionQuantityLimitsSharp";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Title from "../../components/Title";
import "./style.css";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
import Confetti from "react-confetti";
import raceImg from "../../assets/race.avif";
import Photo from "../../components/Photo";

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

const WinnerAnnouncement = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.success.light,
  textAlign: "center",
}));

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

export default function Game() {
  const [slider1Value, setSlider1Value] = useState(0);
  const [slider2Value, setSlider2Value] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [game, setGame] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const saveInLocalStorage = (key, value) => {
    try {
      if (localStorage.getItem(key)) {
        let existingData = JSON.parse(localStorage.getItem(key));
        const updatedData = [...existingData, value];
        localStorage.setItem(key, JSON.stringify(updatedData));
      } else {
        localStorage.setItem(key, JSON.stringify([value]));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al guardar en localStorage",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (winner && !open) {
      const endTime = new Date();
      const timeDifference = endTime - startTime;
      setElapsedTime(timeDifference);
      speak(`El ganador es: ${winner}`);
      saveInLocalStorage("data", {
        id: winner,
        value: winner,
        time: elapsedTime,
        date: new Date(),
      });
      handleOpen();
    }
  }, [winner, open]);

  const handleSlider1Change = (event, newValue) => {
    if (newValue >= 100 && !winner) {
      setWinner("Player 1");
      setStartTime(new Date());
    }
    setSlider1Value(newValue);
  };

  const handleSlider2Change = (event, newValue) => {
    if (newValue >= 100 && !winner) {
      setWinner("Player 2");
      setStartTime(new Date());
    }
    setSlider2Value(newValue);
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
              overflow: "hidden",
            }}
            onClick={handleStart}
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
              <PetsIcon
                style={{
                  position: "absolute",
                  left: `calc(${slider1Value}%)`,
                  top: "30%",
                  fontSize: "2rem",
                  color: "var(--azure-400)",
                  zIndex: 1,
                }}
              />
              <ProductionQuantityLimitsSharpIcon
                style={{
                  position: "absolute",
                  left: `calc(${slider2Value}%)`,
                  top: "70%",
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
            <div style={{ marginTop: "2rem" }}>
              <StyledSlider
                value={slider1Value}
                onChange={handleSlider1Change}
                aria-label="player 1 slider"
              />
              <StyledSlider
                value={slider2Value}
                onChange={handleSlider2Change}
                aria-label="player 2 slider"
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <WinnerAnnouncement>
            <Typography variant="h6">Gano: {winner}</Typography>
            {winner && (
              <div className="audio-waves">
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    key={i}
                    className="wave"
                    style={{ animationDuration: `${0.5 + i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            )}
            <Typography variant="body1">
              {winner ? "¡Felicidades!" : "¡Intenta de nuevo!"}
            </Typography>
            <Typography variant="body2">
              Jugador ganador: {winner ? winner : "Ninguno"}
            </Typography>
            <Typography variant="body2">
              Tiempo de partida: {elapsedTime / 1000} segundos
            </Typography>
          </WinnerAnnouncement>

          <div style={{ marginTop: "2rem" }}>
            <Typography variant="h6">Jugadores</Typography>
            <Typography variant="body2">Jugador 1: {slider1Value}</Typography>
            <Typography variant="body2">Jugador 2: {slider2Value}</Typography>
          </div>
          <Typography variant="body2">
            Fecha y hora actual: {currentTime.toLocaleString()}
          </Typography>
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
          <Box sx={{ p: 3, bgcolor: "#f0f0f0" }}>
            <Typography variant="h6" sx={{ color: "#3f51b5", mb: 2 }}>
              Felicidades Ganaste {winner}
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
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Tu tiempo de juego es de {elapsedTime / 1000} segundos
            </Typography>
            <Button>
              <Photo />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClose();
                setWinner(null);
                setSlider1Value(0);
                setSlider2Value(0);
              }}
              sx={{ mt: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </motion.div>
  );
}

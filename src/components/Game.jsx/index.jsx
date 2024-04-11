import React, { useState, useEffect } from "react";
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

const StyledBox = styled(Box)({
  borderRadius: 8,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  width: "80%",
  height: "20%",
  position: "relative",
  backgroundColor: "white", // Add a background color if needed
});

const IconContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
});

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

const ConfettiContainer = styled(Box)({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  });

const WinnerAnnouncement = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.success.light,
  textAlign: "center",
}));

const DrawAnnouncement = styled(Box)(({ theme }) => ({
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

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Game() {
  const [slider1Value, setSlider1Value] = useState(0);
  const [slider2Value, setSlider2Value] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [open, setOpen] = React.useState(false);
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
  }, [winner]);

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
      style={{ width: "80%", margin: "auto" }}
    >
      {open && (
      <ConfettiContainer>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </ConfettiContainer>
      )}
      <Title title="Game Canva" />

      <Grid container spacing={2} style={{ height: "100%" }}>
      <Grid item xs={12} md={9} style={{ marginBottom: "20px" }}>
          <StyledBox>
            <Box
              sx={{
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconContainer sx={{ left: `${slider1Value}%`, top: "30%" }}>
                <PetsIcon />
              </IconContainer>
              <IconContainer sx={{ left: `${slider2Value}%`, top: "70%" }}>
                <ProductionQuantityLimitsSharpIcon />
              </IconContainer>
            </Box>
          </StyledBox>
          <div style={{ width: "70%", marginTop: 25 }}>
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
        </Grid>
        <Grid item xs={12} md={3}>
          <WinnerAnnouncement>
            <Typography variant="h6">Gano: {winner}</Typography>
            <Typography variant="body1">¡Felicidades!</Typography>
            <Typography variant="body2">
              Jugador ganador: {winner ? winner : "Ninguno"}
            </Typography>
            <Typography variant="body2">
              Tiempo de partida: {elapsedTime / 1000} segundos
            </Typography>
          </WinnerAnnouncement>

          <DrawAnnouncement>
            <Typography variant="h6">Perdio</Typography>
            <Typography variant="body1">¡Intenta de nuevo!</Typography>
          </DrawAnnouncement>

          <div>
            <Typography variant="h6">Jugadores</Typography>
            Jugador 1: {slider1Value}
            <br />
            Jugador 2: {slider2Value}
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
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "#3f51b5" }}
            >
              Feliciaddes Ganaste {winner}
            </Typography>
            <div
              className={`audio-waves ${isSpeaking ? "speaking" : ""}`}
              style={{ width: "100%", height: "100px" }}
            >
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClose();
                setWinner(null);
                setSlider1Value(0);
                setSlider2Value(0);
              }}
              sx={{ mt: 2, bgcolor: "#9c27b0" }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </motion.div>
  );
}

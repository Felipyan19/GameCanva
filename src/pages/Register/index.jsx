import React, { useState } from "react";
import Photo from "../../components/Photo";
import Navbar from "../../components/Navbar";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import Title from "../../components/Title";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Box, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("nombre", nombre);
    formdata.append("foto", foto);
    formdata.append("fecha", new Date().toISOString());

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        `https://zr5zwb0d-5000.use.devtunnels.ms/api/jugadores`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Error al registrar el jugador");
      }
      setData(await response.json());
      handleOpen();
    } catch (error) {
      console.error("Error:", error.message);
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
        style={{ overflowY: "auto", height: "100vh", padding: "20px" }}
      >
        <Title title="Registrar Jugador" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "var(--azure-50)",
            borderRadius: "1rem",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            marginBottom: "10rem",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "auto",
              padding: "2rem",
            }}
          >
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <Photo setFoto={setFoto} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Registrar Jugador
            </Button>
          </form>
        </div>
      </motion.div>
      <Modal
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
        <Box
          sx={{
            p: 3,
            bgcolor: "#ffffff",
            borderRadius: "0.5rem",
            position: "relative",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#3f51b5", mb: 2 }}>
            ¡Felicidades! El jugador se registró con éxito.
          </Typography>
          <Typography variant="body1" sx={{ color: "#3f51b5", mb: 2 }}>
            Nombre del jugador: {nombre}
          </Typography>
          <Typography variant="body1" sx={{ color: "#3f51b5", mb: 2 }}>
            Foto:
          </Typography>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src={`data:image/png;base64, ${data.foto}`}
              width="200px"
              alt="Foto de jugador"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ mt: 2, alignSelf: "flex-end" }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Register;

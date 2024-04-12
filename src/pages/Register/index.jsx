import React, { useState } from "react";
import Photo from "../../components/Photo";
import Navbar from "../../components/Navbar";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Title from "../../components/Title";
import { ProgressSpinner } from 'primereact/progressspinner';
import Backdrop from "@mui/material/Backdrop";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado de carga
  const [data, setData] = useState([]);
  const [cameraOn, setCameraOn] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Establecer carga en true al iniciar la petición

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
    } finally {
      setLoading(false); // Establecer carga en false al finalizar la petición
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setFoto(null)
    setNombre("")
    setCameraOn(true)
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
            <Photo setFoto={setFoto} setCameraOn={setCameraOn} cameraOn={cameraOn}/>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "20px" }}
              disabled={loading} // Deshabilitar el botón mientras se carga
            >
              Registrar Jugador
            </Button>
          </form>
        </div>
      </motion.div>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            ¡Felicidades! El jugador se registró con éxito.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nombre del jugador: {nombre}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Foto:
          </Typography>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            {loading ? (
              <ProgressSpinner />
            ) : (
              <img
                src={`data:image/png;base64, ${data.foto}`}
                width="200px"
                alt="Foto de jugador"
              />
            )}
          </Box>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Register;

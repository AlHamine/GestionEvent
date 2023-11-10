import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
// import Input from "@mui/material/Input";
// import Box from "@mui/material/Box";
// import Select from "@mui/joy/Select";
// import Option from "@mui/joy/Option";

function AddEvent(props) {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({
    nom: "",
    desciption: "",
    lieu: "",
    organisateur: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addEvent(event);
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  return (
    <div>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      > */}
      {/* <Input
          color="primary"
          disabled={false}
          placeholder="Rechercher un événement"
          size="md"
          variant="solid"
          sx={{ marginRight: 2, marginLeft: 2 }}
        />

        <Select
          sx={{ marginRight: "auto" }}
          color="primary"
          placeholder="Trier par événement ..."
          size="sm"
          variant="solid"
        >
          <Option value="dahira">Dahira</Option>
          <Option value="meting">Meting</Option>
        </Select> */}

      {/* <Button
        variant="contained"
        disableElevation
        sx={{ margin: "0 16px" }}
        onClick={handleClickOpen}
      >
        Créer un événement
      </Button> */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          disableElevation
          onClick={handleClickOpen}
          style={{ marginRight: "10px" }}
        >
          Créer un événement
        </Button>
      </div>

      {/* </Box> */}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Nouvel événement</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nom de l'événement"
              name="nom"
              autoFocus
              variant="standard"
              value={event.nom}
              onChange={handleChange}
            />
            <TextField
              label="Date"
              name="date"
              variant="standard"
              value={event.date}
              onChange={handleChange}
            />
            <TextField
              label="Desciption"
              name="desciption"
              variant="standard"
              value={event.desciption}
              onChange={handleChange}
            />
            <TextField
              label="Lieu"
              name="lieu"
              variant="standard"
              value={event.lieu}
              onChange={handleChange}
            />

            <TextField
              label="Organisateur"
              name="organisateur"
              variant="standard"
              value={event.organisateur}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        ></div>
      )}
    </div>
  );
}

export default AddEvent;

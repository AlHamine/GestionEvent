import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../constants";

import Email from "@mui/icons-material/Email";
import StarRate from "@mui/icons-material/StarRate";
import { InputAdornment, Container } from "@mui/material";
import CommentBankTwoToneIcon from "@mui/icons-material/CommentBankTwoTone";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ReviewForm = () => {
  const [emailPrestataire, setEmailPrestataire] = useState("");
  const [emailClient, setEmailClient] = useState(
    sessionStorage.getItem("UserMail")
  );
  const [comment, setComment] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [open, setOpen] = useState(true);

  const handleSubmit = async () => {
    setLoading(true);
    setSubmissionError(null);
    setEmailClient(sessionStorage.getItem("UserMail"));
    console.log(emailClient);
    try {
      const response = await fetch(SERVER_URL + "prestataires/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          emailPrestataire,
          emailClient,
          comment,
          note,
        }),
      });

      if (!response.ok) {
        throw new Error("La soumission de la revue a échoué.");
      }

      // Réinitialisez les champs après une soumission réussie
      setEmailPrestataire("");
      setEmailClient("");
      setComment("");
      setNote("");
        alert("La revue a été soumise avec succès.");
        window.location.href = "/profile";
    } catch (error) {
      console.error("Erreur lors de la soumission de la revue", error);
      setSubmissionError(
        "La soumission de la revue a échoué. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      window.location.href = "/profile";
  };

  return (
      <>
      {/* <Button className="profile-card__button button--orange" variant="contained" onClick={handleOpen}>
        <CommentBankTwoToneIcon /> Noter les prestations
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Nouveau Commentaire </DialogTitle>
        <DialogContent>
          <Container>
            <form>
              <div>
                <TextField
                  label="Email du Prestataire"
                  value={emailPrestataire}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setEmailPrestataire(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Commentaire"
                  multiline
                  rows={4}
                  value={comment}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setComment(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommentBankTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Note"
                  type="number"
                  value={note}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNote(e.target.value)}
                  inputProps={{ min: 0, max: 5 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StarRate />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {submissionError && (
                <p style={{ color: "red" }}>{submissionError}</p>
              )}
              <div>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={<CheckCircleOutlineIcon color="success" />}
                  >
                    {loading ? "En cours..." : "Soumettre la Revue"}
                  </Button>
                  <Button onClick={handleClose}>
                    <CancelSharpIcon color="error" />
                  </Button>
                </DialogActions>
              </div>
            </form>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewForm;
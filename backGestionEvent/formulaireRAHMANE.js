import React, { Component } from "react";

class ImageUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    this.setState({ selectedImage });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer l'image au serveur ou effectuer d'autres actions.

    // Exemple : Envoyer l'image à un serveur (côté client uniquement)
    if (this.state.selectedImage) {
      const formData = new FormData();
      formData.append("image", this.state.selectedImage);

      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Gérer la réponse du serveur ici
          console.log(data);
        })
        .catch((error) => {
          // Gérer les erreurs ici
          console.error(error);
        });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            accept="image/*" // Limite le type de fichier à des images
            onChange={this.handleImageChange}
          />
          <button type="submit">Télécharger l'image</button>
        </form>

        {this.state.selectedImage && (
          <div>
            <h2>Aperçu de l'image :</h2>
            <img
              src={URL.createObjectURL(this.state.selectedImage)}
              alt="Image sélectionnée"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ImageUploadForm;

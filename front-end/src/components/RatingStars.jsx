import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const renderStars = () => {
    const stars = [];
<<<<<<< HEAD
=======
    stars.push("Star : ")
>>>>>>> 503d3932705f1682978b13a09b40178a196df1da

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<StarOutlineIcon key={fullStars} />);
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default RatingStars;
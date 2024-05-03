import styles from "../../css/Rating.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useEffect } from 'react';

function renderStarIcons(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starIcons = [];

  for (let i = 0; i < fullStars; i++) {
    starIcons.push(<StarIcon className={styles.Star} key={`full-${i}`} />);
  }

  if (hasHalfStar) {
    starIcons.push(<StarHalfIcon className={styles.Star} key="half" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(<StarBorderIcon className={styles.Star} key={`empty-${i}`} />);
  }

  return starIcons;
}

export default function Rating({ rating }) {
  useEffect(() => {
    console.log(rating);
  }, [rating]);

  return (
    <div className={styles.Rating}>
      {rating < 0.5 ? (
        <>
          <StarBorderIcon className={styles.Star} />
          <StarBorderIcon className={styles.Star} />
          <StarBorderIcon className={styles.Star} />
          <StarBorderIcon className={styles.Star} />
          <StarBorderIcon className={styles.Star} />
        </>
      ) : (
        renderStarIcons(rating)
      )}
    </div>
  );
}
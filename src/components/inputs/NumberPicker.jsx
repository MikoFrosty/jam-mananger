import styles from '../../css/Inputs/NumberPicker.module.css';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function NumberPicker({ value, adjustValue, handleValueChange }) {
  return (
    <div className={styles.NumberPicker}>
      <div onClick={() => adjustValue(-1)} className={styles.Left}>
        <RemoveIcon />
      </div>
      <div className={styles.Middle}>
        <input
          className={styles.NumberInput}
          min={0}
          onChange={(e) => handleValueChange(e.target.value)}
          value={value}
          type="number"
        />
      </div>
      <div onClick={() => adjustValue(1)} className={styles.Right}>
        <AddIcon />
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import Switch from '@mui/joy/Switch';

export default function DecoratedSwitch({ firstIcon, secondIcon}) {
  const [dark, setDark] = useState(false);
  return (
    <Switch
      color={dark ? 'primary' : 'danger'}
      slotProps={{ input: { 'aria-label': 'dark mode' } }}
      startDecorator={firstIcon}
      endDecorator={secondIcon}
      checked={false}
      onChange={(event) => setDark(event.target.checked)}
    />
  );
}
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

// type Action = 'plus' | 'less';

interface Props {
  currentValue: number;
  updateQuantity: (accion: number) => void;
  maxValue: number;
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  maxValue,
  updateQuantity,
}) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton
        onClick={() => updateQuantity(-1)}
        disabled={currentValue <= 1}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}{' '}
      </Typography>
      <IconButton
        onClick={() => updateQuantity(1)}
        disabled={currentValue >= maxValue}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

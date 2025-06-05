import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface BedProps {
  length: number; // in centimeters
  width: number;  // in centimeters
}

const BedBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#8D4004', // dark brown
  borderRadius: theme.spacing(1),
  border: '2px solid #654321',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  minHeight: '40px',
  minWidth: '40px',
  maxWidth: '200px',
  maxHeight: '200px',
}));

export function Bed({ length, width }: BedProps) {
  // Calculate aspect ratio (length:width)
  // Length is horizontal, width is vertical
  const aspectRatio = length / width;
  
  return (
    <BedBox
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: `min(200px, ${200 * aspectRatio}px)`,
        maxHeight: `min(200px, ${200 / aspectRatio}px)`,
        aspectRatio: `${aspectRatio}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
} 
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface BedProps {
  index: number; // User-readable bed index
  length: number; // in centimeters
  width: number;  // in centimeters
}

const BedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const BedIndex = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  minWidth: '24px',
  textAlign: 'center',
}));

const BedBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.garden.bed,
  borderRadius: theme.spacing(1),
  border: `2px solid ${theme.palette.garden.bedBorder}`,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  minHeight: '40px',
  minWidth: '40px',
  maxWidth: '200px',
  maxHeight: '200px',
}));

export function Bed({ index, length, width }: BedProps) {
  // Calculate aspect ratio (length:width)
  // Length is horizontal, width is vertical
  const aspectRatio = length / width;
  
  return (
    <BedContainer>
      <BedIndex variant="body2">
        {index}
      </BedIndex>
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
    </BedContainer>
  );
} 
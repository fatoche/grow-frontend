import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Bed } from './Bed';

interface GardenProps {
  numberOfBeds: number;
  bedLength: number; // in centimeters
  bedWidth: number;  // in centimeters
}

const GardenContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.garden.main,
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.garden.main} 0%, ${theme.palette.garden.light} 50%, ${theme.palette.garden.dark} 100%)`,
  display: 'flex',
  alignItems: 'center',
}));

const BedsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  minHeight: '80vh',
  alignContent: 'center',
  justifyItems: 'center',
  
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(2),
  },
  
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(4),
  },
}));

export function Garden({ numberOfBeds, bedLength, bedWidth }: GardenProps) {
  // Create array of beds
  const beds = Array.from({ length: numberOfBeds }, (_, index) => (
    <Bed 
      key={index}
      length={bedLength} 
      width={bedWidth} 
    />
  ));

  return (
    <GardenContainer>
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        <BedsGrid>
          {beds}
        </BedsGrid>
      </Container>
    </GardenContainer>
  );
} 
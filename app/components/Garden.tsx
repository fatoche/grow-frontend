import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Bed } from './Bed';
import type { Bed as BedType } from '../types/bed';

interface GardenProps {
  beds: BedType[];
}

const GardenContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.garden.main,
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.garden.main} 0%, ${theme.palette.garden.light} 50%, ${theme.palette.garden.dark} 100%)`,
  display: 'flex',
  alignItems: 'center',
}));

const BedsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(2),
}));

const BedWrapper = styled(Box)(({ theme }) => ({
  width: '90%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
}));

export function Garden({ beds }: GardenProps) {
  return (
    <GardenContainer>
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        <BedsContainer>
          {beds.map((bed) => (
            <BedWrapper key={bed.id}>
              <Bed 
                index={bed.index}
                length={bed.length} 
                width={bed.width} 
              />
            </BedWrapper>
          ))}
        </BedsContainer>
      </Container>
    </GardenContainer>
  );
} 
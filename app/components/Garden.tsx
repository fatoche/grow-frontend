import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Bed } from './Bed';
import type { Bed as BedType } from '../types/bed';
import { StyledButton } from '~/components/mui-helpers';

interface GardenProps {
  beds: BedType[];
  setShowForm: (showForm: boolean) => void;
}

const GardenContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
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
  maxWidth: 'xl',
  margin: '0 auto',
  padding: 0,
}));

const BedWrapper = styled(Box)(() => ({
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
}));

export function Garden({ beds, setShowForm }: GardenProps) {
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <StyledButton 
            variant="contained" 
            sx={{ backgroundColor: 'primary.main' }}
            onClick={() => setShowForm(true)}
          >
            <Typography>
              Neuen Garten anlegen
            </Typography>
          </StyledButton>
        </Box>
      </Container>
    </GardenContainer>
  );
} 
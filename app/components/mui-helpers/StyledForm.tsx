import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledForm = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2), // space-y-4 equivalent
}));

export { StyledForm }; 
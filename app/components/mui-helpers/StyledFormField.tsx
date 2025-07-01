import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormField = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export { StyledFormField }; 
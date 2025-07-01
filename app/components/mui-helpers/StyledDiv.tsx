import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDiv = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: '28rem', // max-w-md equivalent
  margin: '0 auto',
  padding: theme.spacing(3), // p-6 equivalent
  backgroundColor: 'white',
  borderRadius: theme.spacing(1), // rounded-lg equivalent
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md equivalent
}));

export { StyledDiv }; 
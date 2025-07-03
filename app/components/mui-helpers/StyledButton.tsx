import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  variant: 'contained',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontSize: '1rem',
  fontWeight: 600,
}));

export { StyledButton }; 
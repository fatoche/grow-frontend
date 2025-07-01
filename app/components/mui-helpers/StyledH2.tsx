import { Typography, type TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledH2 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '1.5rem', // text-2xl equivalent
  fontWeight: 700, // font-bold equivalent
  marginBottom: theme.spacing(3), // mb-6 equivalent
  color: '#1f2937', // text-gray-800 equivalent
}));

export { StyledH2 }; 
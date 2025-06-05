import { Box, Typography, Container, Paper, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(46, 125, 50, 0.1)',
  border: `1px solid ${theme.palette.primary.light}`,
  backdropFilter: 'blur(8px)',
  maxWidth: 600,
  textAlign: 'center',
}));

const WelcomeBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #C8E6C9 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

export function Welcome() {
  return (
    <WelcomeBox>
      <Container maxWidth="md">
        <Fade in={true} timeout={1000}>
          <StyledPaper elevation={0}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 2
              }}
            >
              Welcome to GROW
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                mb: 3,
                opacity: 0.8
              }}
            >
              Gartenplanung leicht gemacht
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                maxWidth: 480,
                mx: 'auto'
              }}
            >
              Planen Sie Ihren Garten mit modernster Technologie. 
              Zettelwirtschaft ade - Puzzlespaß bleibt.
            </Typography>
          </StyledPaper>
        </Fade>
      </Container>
    </WelcomeBox>
  );
}

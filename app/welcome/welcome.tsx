import { Box, Typography, Container, Paper, Fade, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router';

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
          <Box>
            <Paper className="welcome-paper" elevation={0}>
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
                  mx: 'auto',
                  mb: 4
                }}
              >
                Planen Sie Ihren Garten mit modernster Technologie. 
                Zettelwirtschaft ade - Puzzlespaß bleibt.
              </Typography>
            </Paper>
            
            <Box sx={{ textAlign: 'center', mt: 3, maxWidth: 600, mx: 'auto' }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/garden"
                  variant="welcome"
                  size="large"
                >
                  Lege deinen Garten an
                </Button>
                <Button
                  component={Link}
                  to="/plant-families"
                  variant="welcome"
                  size="large"
                >
                  Pflanzen verwalten
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </WelcomeBox>
  );
}

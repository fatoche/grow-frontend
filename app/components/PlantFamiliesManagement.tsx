import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';
import { usePlantFamilies } from '../api/plant-families';

export function PlantFamiliesManagement() {
  const { data: plantFamilies, isLoading, error } = usePlantFamilies();

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          Fehler beim Laden der Pflanzenfamilien: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Pflanzenfamilien verwalten
      </Typography>
      
      <Paper elevation={2} sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nährstoffbedarf</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fruchtfolgezeit (Jahre)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plantFamilies && plantFamilies.length > 0 ? (
                plantFamilies.map((family) => (
                  <TableRow key={family.id} hover>
                    <TableCell>{family.name}</TableCell>
                    <TableCell>{family.nutrition_requirements}</TableCell>
                    <TableCell>{family.rotation_time}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1" color="text.secondary">
                      Keine Pflanzenfamilien gefunden
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
} 
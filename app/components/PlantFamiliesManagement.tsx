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
  Alert,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPlantFamiliesQuery } from '../api/plant-families';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPlantFamily, deletePlantFamily, type PlantFamilyCreationRequest } from '../api/plant-families';
import { useState } from 'react';

export function PlantFamiliesManagement() {
  const [newFamily, setNewFamily] = useState<PlantFamilyCreationRequest>({
    name: '',
    nutrition_requirements: '',
    rotation_time: 1,
  });
  
  const queryClient = useQueryClient();
  const { data: plantFamilies, isLoading, error } = useQuery(getPlantFamiliesQuery);

  const createPlantFamilyMutation = useMutation({
    mutationFn: createPlantFamily,
    onSuccess: () => {
      queryClient.invalidateQueries(getPlantFamiliesQuery);
    },
  });

  const deletePlantFamilyMutation = useMutation({
    mutationFn: deletePlantFamily,
    onSuccess: () => {
      queryClient.invalidateQueries(getPlantFamiliesQuery);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPlantFamilyMutation.mutate(newFamily);
  };

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

      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="row" gap={2} alignItems="center">
        <TextField
          label="Name"
          value={newFamily.name}
          onChange={(e) => setNewFamily({ ...newFamily, name: e.target.value })}
          sx={{ width: 400 }}
          size="small"
        />
        <TextField
          label="Nährstoffbedarf"
          value={newFamily.nutrition_requirements}
          onChange={(e) => setNewFamily({ ...newFamily, nutrition_requirements: e.target.value })}
          size="small"
        />
        <TextField
          label="Fruchtfolgezeit (Jahre)"
          value={newFamily.rotation_time}
          onChange={(e) => setNewFamily({ ...newFamily, rotation_time: Number(e.target.value) })}
          type="number"
          error={newFamily.rotation_time <= 0}
          helperText={newFamily.rotation_time <= 0 ? "Fruchtfolgezeit muss größer als 0 sein" : ""}
          placeholder="Fruchtfolgezeit in Jahren eingeben"
          size="small"
          required
        />
        <Button type="submit" variant="contained" color="primary" size="small">
          Pflanzenfamilie hinzufügen
        </Button>
      </Box>
      
      <Paper elevation={2} sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nährstoffbedarf</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fruchtfolgezeit (Jahre)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plantFamilies && plantFamilies.length > 0 ? (
                plantFamilies.map((family) => (
                  <TableRow key={family.id} hover>
                    <TableCell>{family.name}</TableCell>
                    <TableCell>{family.nutrition_requirements}</TableCell>
                    <TableCell>{family.rotation_time}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => deletePlantFamilyMutation.mutate(family.id)} >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
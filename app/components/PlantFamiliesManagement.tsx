import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
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

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'nutrition_requirements', headerName: 'Nährstoffbedarf', width: 300 },
    { field: 'rotation_time', headerName: 'Fruchtfolgezeit (Jahre)', width: 200 },
    {
      field: 'actions',
      headerName: 'Aktionen',
      width: 100,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Löschen"
          onClick={() => deletePlantFamilyMutation.mutate(params.id as string)}
        />,
      ],
    },
  ];

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
        minHeight="calc(100vh - 64px)"
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
      
      <Paper elevation={2} sx={{ mt: 3, height: 600 }}>
        <DataGrid
          rows={plantFamilies || []}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          localeText={{
            noRowsLabel: 'Keine Pflanzenfamilien gefunden',
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </Paper>
    </Container>
  );
} 
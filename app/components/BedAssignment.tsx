import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getPlantFamiliesQuery } from '../api/plant-families';
import { getBeds } from '../api/beds';
import { PlantFamilyCard } from './PlantFamilyCard';
import { BedCard } from './BedCard';
import type { PlantFamily } from '../api/plant-families';
import type { Bed } from '../types/bed';

export function BedAssignment() {
  const [bedsWithFamilies, setBedsWithFamilies] = useState<Bed[]>([]);

  const { data: plantFamilies, isLoading: familiesLoading, error: familiesError } = useQuery(getPlantFamiliesQuery);
  const { data: beds, isLoading: bedsLoading, error: bedsError } = useQuery({
    queryKey: ['beds'],
    queryFn: getBeds,
  });

  // Initialize beds with families when beds data is loaded
  React.useEffect(() => {
    if (beds && bedsWithFamilies.length === 0) {
      setBedsWithFamilies(beds.map(bed => ({ ...bed, plant_families: [] })));
    }
  }, [beds, bedsWithFamilies.length]);

  const handleDragStart = (e: React.DragEvent, plantFamily: PlantFamily) => {
    e.dataTransfer.setData('application/json', JSON.stringify(plantFamily));
  };

  const handleDrop = (e: React.DragEvent, bedId: string) => {
    e.preventDefault();
    const plantFamilyData = e.dataTransfer.getData('application/json');
    if (plantFamilyData) {
      const plantFamily: PlantFamily = JSON.parse(plantFamilyData);
      setBedsWithFamilies(prev => 
        prev.map(bed => 
          bed.id === bedId 
            ? { ...bed, plant_families: [...bed.plant_families, plantFamily.id] }
            : bed
        )
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFamilyFromBed = (bedId: string, familyId: string) => {
    setBedsWithFamilies(prev => 
      prev.map(bed => 
        bed.id === bedId 
          ? { ...bed, plant_families: bed.plant_families.filter(f => f !== familyId) }
          : bed
      )
    );
  };

  if (familiesLoading || bedsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 64px)">
        <CircularProgress />
      </Box>
    );
  }

  if (familiesError || bedsError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Fehler beim Laden der Daten: {familiesError?.message || bedsError?.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Pflanzenfamilien den Beeten zuweisen
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left side - Plant Families */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: 'fit-content' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Pflanzenfamilien
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ziehen Sie Pflanzenfamilien auf die Beete rechts
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {plantFamilies?.map((family) => (
                <PlantFamilyCard
                  key={family.id}
                  plantFamilies={plantFamilies}
                  familyId={family.id}
                  onDragStart={(e) => handleDragStart(e, family)}
                  isDraggable={true}
                  showRotationTime={true}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right side - Beds */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Beete
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Hier können Sie Pflanzenfamilien ablegen
            </Typography>
            <Grid container spacing={2}>
              {bedsWithFamilies.map((bed) => (
                <Grid item xs={12} sm={6} md={4} key={bed.id}>
                  <BedCard
                    bed={bed}
                    plantFamilies={plantFamilies || []}
                    onDrop={(e) => handleDrop(e, bed.id)}
                    onDragOver={handleDragOver}
                    onRemoveFamily={removeFamilyFromBed}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 
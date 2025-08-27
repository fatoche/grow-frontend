import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
  const [draggedPlantFamily, setDraggedPlantFamily] = useState<PlantFamily | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    plantFamily: PlantFamily | null;
    targetBed: Bed | null;
    conflictingBeds: number[];
  }>({
    open: false,
    plantFamily: null,
    targetBed: null,
    conflictingBeds: [],
  });

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

  // Add global drag end handler
  React.useEffect(() => {
    const handleGlobalDragEnd = () => {
      setDraggedPlantFamily(null);
    };

    document.addEventListener('dragend', handleGlobalDragEnd);
    return () => {
      document.removeEventListener('dragend', handleGlobalDragEnd);
    };
  }, []);

  // Helper function to check if adding a plant family to a bed violates rotation constraints
  const checkRotationConstraints = (
    targetBedIndex: number,
    plantFamilyId: string,
    currentBeds: Bed[],
    allPlantFamilies: PlantFamily[]
  ): { isValid: boolean; conflictingBeds: number[] } => {
    const plantFamily = allPlantFamilies.find(pf => pf.id === plantFamilyId);
    if (!plantFamily) {
      return { isValid: false, conflictingBeds: [] };
    }

    const rotationTime = plantFamily.rotation_time;
    const totalBeds = currentBeds.length;
    const conflictingBeds: number[] = [];

    // Check all beds for conflicts with this plant family
    currentBeds.forEach(bed => {
      if (bed.plant_families.includes(plantFamilyId)) {
        // Calculate the distance between the target bed and this bed
        let distance = Math.abs(targetBedIndex - bed.index);
        
        // Handle wrapping around (beds are circular)
        distance = Math.min(distance, totalBeds - distance);
        
        // If distance is less than rotation time, it's a conflict
        if (distance < rotationTime) {
          conflictingBeds.push(bed.index);
        }
      }
    });

    return {
      isValid: conflictingBeds.length === 0,
      conflictingBeds
    };
  };

  const handleDragStart = (e: React.DragEvent, plantFamily: PlantFamily) => {
    e.dataTransfer.setData('application/json', JSON.stringify(plantFamily));
    setDraggedPlantFamily(plantFamily);
  };



  // Helper function to check if a plant family can be dropped on a specific bed
  const canDropOnBed = (bed: Bed, plantFamily: PlantFamily): boolean => {
    if (!plantFamilies) return false;
    
    // Check if already in this bed
    if (bed.plant_families.includes(plantFamily.id)) {
      return false;
    }
    
    // Check rotation constraints
    const constraintCheck = checkRotationConstraints(
      bed.index,
      plantFamily.id,
      bedsWithFamilies,
      plantFamilies
    );
    
    return constraintCheck.isValid;
  };

  const handleDrop = (e: React.DragEvent, bedId: string) => {
    e.preventDefault();
    const plantFamilyData = e.dataTransfer.getData('application/json');
    if (plantFamilyData) {
      const plantFamily: PlantFamily = JSON.parse(plantFamilyData);
      
      // Find the target bed
      const targetBed = bedsWithFamilies.find(bed => bed.id === bedId);
      if (!targetBed || !plantFamilies) return;

      // Check if plant family is already in this bed
      if (targetBed.plant_families.includes(plantFamily.id)) {
        return; // Already assigned to this bed
      }

      // Check rotation constraints
      const constraintCheck = checkRotationConstraints(
        targetBed.index,
        plantFamily.id,
        bedsWithFamilies,
        plantFamilies
      );

      if (!constraintCheck.isValid) {
        // Show confirmation dialog for constraint violation
        setConfirmationDialog({
          open: true,
          plantFamily,
          targetBed,
          conflictingBeds: constraintCheck.conflictingBeds,
        });
        return;
      }

      // If constraints are satisfied, add the plant family to the bed
      setBedsWithFamilies(prev => 
        prev.map(bed => {
          if (bed.id === bedId) {
            return { ...bed, plant_families: [...bed.plant_families, plantFamily.id] };
          }
          return bed;
        })
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

  const handleConfirmConstraintViolation = () => {
    if (confirmationDialog.plantFamily && confirmationDialog.targetBed) {
      // Add the plant family despite the constraint violation
      setBedsWithFamilies(prev => 
        prev.map(bed => {
          if (bed.id === confirmationDialog.targetBed!.id) {
            return { ...bed, plant_families: [...bed.plant_families, confirmationDialog.plantFamily!.id] };
          }
          return bed;
        })
      );
    }
    setConfirmationDialog({ open: false, plantFamily: null, targetBed: null, conflictingBeds: [] });
  };

  const handleCancelConstraintViolation = () => {
    setConfirmationDialog({ open: false, plantFamily: null, targetBed: null, conflictingBeds: [] });
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
                    canDrop={draggedPlantFamily ? canDropOnBed(bed, draggedPlantFamily) : true}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      
      {/* Confirmation Dialog for Constraint Violations */}
      <Dialog
        open={confirmationDialog.open}
        onClose={handleCancelConstraintViolation}
        aria-labelledby="constraint-violation-dialog-title"
      >
        <DialogTitle id="constraint-violation-dialog-title">
          Missachtung der Fruchtfolgezeit
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmationDialog.plantFamily?.name} kann nicht zu Beet {confirmationDialog.targetBed?.index} hinzugefügt werden, 
            da es einen Konflikt mit Beet(en): {confirmationDialog.conflictingBeds.join(', ')} gibt.
          </Typography>
          <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
            Möchten Sie die Pflanzenfamilie trotzdem hinzufügen?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConstraintViolation} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleConfirmConstraintViolation} color="error" variant="contained">
            Trotzdem hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 
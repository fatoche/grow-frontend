import React from 'react';
import { 
  Paper, 
  Box, 
  Typography,
  Grid,
} from '@mui/material';
import { PlantFamilyCard } from './PlantFamilyCard';
import type { Bed } from '../types/bed';
import type { PlantFamily } from '../api/plant-families';

interface BedCardProps {
  bed: Bed;
  plantFamilies: PlantFamily[];
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onRemoveFamily: (bedId: string, familyId: string) => void;
}

export function BedCard({ bed, plantFamilies, onDrop, onDragOver, onRemoveFamily }: BedCardProps) {
  const handleRemoveFamily = (familyId: string) => {
    onRemoveFamily(bed.id, familyId);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        minHeight: 200,
        backgroundColor: '#8D4004',
        color: 'white',
        border: '2px dashed transparent',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        position: 'relative',
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          Beet {bed.index}
        </Typography>
      </Box>

      {bed.plant_families.length > 0 ? (
        <Box>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
            Zugewiesene Pflanzenfamilien:
          </Typography>
          <Grid container spacing={1}>
            {bed.plant_families.map((familyId) => (
              <Grid item xs={6} key={familyId}>
                <PlantFamilyCard
                  plantFamilies={plantFamilies}
                  familyId={familyId}
                  isCompact={true}
                  onRemove={() => handleRemoveFamily(familyId)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 120,
            border: '2px dashed rgba(255, 255, 255, 0.3)',
            borderRadius: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center' }}>
            Pflanzenfamilien hier ablegen
          </Typography>
        </Box>
      )}
    </Paper>
  );
} 
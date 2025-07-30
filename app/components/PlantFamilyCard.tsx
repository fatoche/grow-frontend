import React from 'react';
import { 
  Paper, 
  Box, 
  Typography,
  Chip,
} from '@mui/material';
import type { PlantFamily } from '../api/plant-families';

interface PlantFamilyCardProps {
  family: PlantFamily;
  onDragStart?: (e: React.DragEvent) => void;
  isDraggable?: boolean;
  showRotationTime?: boolean;
  isCompact?: boolean;
  onRemove?: () => void;
}

const getNutritionColor = (nutritionRequirements: string): string => {
  const requirements = nutritionRequirements.toLowerCase();
  if (requirements.includes('stark') || requirements.includes('starkzehrer')) {
    return '#FF5722'; // Dark orange
  } else if (requirements.includes('mittel') || requirements.includes('mittelzehrer')) {
    return '#FF9800'; // Orange
  } else if (requirements.includes('schwach') || requirements.includes('schwachzehrer')) {
    return '#FFEB3B'; // Yellow
  }
  return '#9E9E9E'; // Default gray
};

export function PlantFamilyCard({ 
  family, 
  onDragStart, 
  isDraggable = false, 
  showRotationTime = false,
  isCompact = false,
  onRemove 
}: PlantFamilyCardProps) {
  const nutritionColor = getNutritionColor(family.nutrition_requirements);

  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(e);
    }
  };

  if (isCompact) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 1,
          backgroundColor: nutritionColor,
          color: 'white',
          cursor: isDraggable ? 'grab' : 'default',
          '&:active': {
            cursor: isDraggable ? 'grabbing' : 'default',
          },
          minHeight: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        draggable={isDraggable}
        onDragStart={handleDragStart}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 500,
            textAlign: 'center',
            fontSize: '0.75rem',
          }}
        >
          {family.name}
        </Typography>
        {onRemove && (
          <Box
            onClick={onRemove}
            sx={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 16,
              height: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.6rem',
              fontWeight: 'bold',
              color: '#666',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            ×
          </Box>
        )}
      </Paper>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        backgroundColor: nutritionColor,
        color: 'white',
        cursor: isDraggable ? 'grab' : 'default',
        '&:active': {
          cursor: isDraggable ? 'grabbing' : 'default',
        },
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: isDraggable ? 'translateY(-2px)' : 'none',
          boxShadow: isDraggable ? 4 : 2,
        },
      }}
      draggable={isDraggable}
      onDragStart={handleDragStart}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
            {family.name}
          </Typography>
          <Chip 
            label={family.nutrition_requirements} 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 500,
            }} 
          />
        </Box>
        {showRotationTime && (
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {family.rotation_time} Jahre
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
} 
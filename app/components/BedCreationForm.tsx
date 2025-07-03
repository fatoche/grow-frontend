import { TextField, Typography } from '@mui/material';
import { StyledDiv, StyledH2, StyledForm, StyledFormField, StyledButton } from './mui-helpers';

interface BedCreationFormProps {
  numberOfBeds: number;
  setNumberOfBeds: (value: number) => void;
  length: number;
  setLength: (value: number) => void;
  width: number;
  setWidth: (value: number) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function BedCreationForm({
  numberOfBeds,
  setNumberOfBeds,
  length,
  setLength,
  width,
  setWidth,
  onSubmit,
  isLoading = false,
}: BedCreationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (numberOfBeds <= 0 || length <= 0 || width <= 0) {
      return;
    }
    
    onSubmit();
  };

  return (
    <StyledDiv>
      <StyledH2 variant="h2">Beet-Erstellung</StyledH2>
      
      <StyledForm component="form" onSubmit={handleSubmit}>
        <StyledFormField>
          <Typography 
            component="label" 
            htmlFor="numberOfBeds" 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              color: 'text.secondary',
              mb: 1 
            }}
          >
            Anzahl Beete
          </Typography>
          <TextField
            type="number"
            id="numberOfBeds"
            value={numberOfBeds}
            onChange={(e) => setNumberOfBeds(Math.max(1, Number(e.target.value)))}
            inputProps={{ min: 1 }}
            placeholder="Anzahl der Beete eingeben"
            fullWidth
            size="small"
            required
            error={numberOfBeds <= 0}
            helperText={numberOfBeds <= 0 ? "Mindestens 1 Beet erforderlich" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'success.main',
                },
              },
            }}
          />
        </StyledFormField>

        <StyledFormField>
          <Typography 
            component="label" 
            htmlFor="length" 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              color: 'text.secondary',
              mb: 1 
            }}
          >
            Länge (cm)
          </Typography>
          <TextField
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
            inputProps={{ min: 1 }}
            placeholder="Länge in cm eingeben"
            fullWidth
            size="small"
            required
            error={length <= 0}
            helperText={length <= 0 ? "Länge muss größer als 0 sein" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'success.main',
                },
              },
            }}
          />
        </StyledFormField>

        <StyledFormField>
          <Typography 
            component="label" 
            htmlFor="width" 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              color: 'text.secondary',
              mb: 1 
            }}
          >
            Breite (cm)
          </Typography>
          <TextField
            type="number"
            id="width"
            value={width}
            onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
            inputProps={{ min: 1 }}
            placeholder="Breite in cm eingeben"
            fullWidth
            size="small"
            required
            error={width <= 0}
            helperText={width <= 0 ? "Breite muss größer als 0 sein" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'success.main',
                },
              },
            }}
          />
        </StyledFormField>

        <StyledButton
          type="submit"
          color="primary"
          fullWidth
          disabled={isLoading || numberOfBeds <= 0 || length <= 0 || width <= 0}
        >
          {isLoading ? 'Wird erstellt...' : 'Beete anlegen'}
        </StyledButton>
      </StyledForm>
    </StyledDiv>
  );
}
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, Snackbar, Typography } from '@mui/material';
import type { Route } from "./+types/garden-planning";
import { Garden } from "../components/Garden";
import { BedCreationForm } from "../components/BedCreationForm";
import { createBedsWithCleanup, getBeds } from "../api/beds";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GROW - Garden Planning" },
    { name: "description", content: "Plan your garden with GROW" },
  ];
}

export default function GardenPlanning() {
  const [numberOfBeds, setNumberOfBeds] = useState(1);
  const [length, setLength] = useState(200); // Default length in cm
  const [width, setWidth] = useState(120);   // Default width in cm
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: beds, isLoading: isLoadingBeds } = useQuery({
    queryKey: ['beds'],
    queryFn: getBeds,
  });

  useEffect(() => {
    if (beds && beds.length === 0) setShowForm(true);
  }, [beds]);

  const createBedsMutation = useMutation({
    mutationFn: createBedsWithCleanup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beds'] });
      setShowForm(false);
      setError(null);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
    },
  });

  const handleSubmit = () => {
    createBedsMutation.mutate({
      numberOfBeds,
      length,
      width,
    });
  };

  return (
    <>
      {isLoadingBeds ? (
        <Typography>Loading...</Typography>
      ) : showForm ? (
        <BedCreationForm
          numberOfBeds={numberOfBeds}
          setNumberOfBeds={setNumberOfBeds}
          length={length}
          setLength={setLength}
          width={width}
          setWidth={setWidth}
          onSubmit={handleSubmit}
          isLoading={createBedsMutation.isPending}
        />
      ) : (
        <Garden beds={beds || []} setShowForm={setShowForm} />
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
} 
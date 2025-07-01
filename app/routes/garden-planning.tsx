import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Snackbar } from '@mui/material';
import type { Route } from "./+types/garden-planning";
import { Garden } from "../components/Garden";
import { BedCreationForm } from "../components/BedCreationForm";
import { createBedsWithCleanup } from "../api/beds";
import type { Bed } from "../types/bed";

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
  const [beds, setBeds] = useState<Bed[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createBedsMutation = useMutation({
    mutationFn: createBedsWithCleanup,
    onSuccess: (data) => {
      setBeds(data.beds);
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

  const handleBackToForm = () => {
    setShowForm(true);
    setBeds([]);
  };

  return (
    <>
      {showForm ? (
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
        <Garden beds={beds} />
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
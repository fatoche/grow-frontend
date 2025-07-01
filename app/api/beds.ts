import type { BedCreationRequest, BedCreationResponse } from "../types/bed";

const API_BASE_URL = "http://localhost:8000"; // Adjust this to your backend URL

export const createBeds = async (
  request: BedCreationRequest
): Promise<BedCreationResponse> => {
  const response = await fetch(`${API_BASE_URL}/garden/beds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to create beds: ${response.statusText}`);
  }

  return response.json();
};

export const deleteAllBeds = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/garden/beds/all`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete all beds: ${response.statusText}`);
  }
};

export const createBedsWithCleanup = async (
  request: BedCreationRequest
): Promise<BedCreationResponse> => {
  const response = await fetch(`${API_BASE_URL}/garden/beds/with-cleanup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create beds with cleanup: ${response.statusText}`
    );
  }

  return response.json();
};

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

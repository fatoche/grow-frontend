import { useQuery } from "@tanstack/react-query";

export interface PlantFamily {
  id: string;
  name: string;
  nutrition_requirements: string;
  rotation_time: number;
}

export interface PlantFamilyCreationRequest {
  name: string;
  nutrition_requirements: string;
  rotation_time: number;
}

const API_BASE_URL = "http://localhost:8000";

export const usePlantFamilies = () => {
  return useQuery({
    queryKey: ["plant-families"],
    queryFn: async (): Promise<PlantFamily[]> => {
      const response = await fetch(`${API_BASE_URL}/plants/families`);
      if (!response.ok) {
        throw new Error("Failed to fetch plant families");
      }
      return response.json();
    },
  });
};

export const createPlantFamily = async (
  request: PlantFamilyCreationRequest
): Promise<PlantFamily> => {
  const response = await fetch(`${API_BASE_URL}/plants/families`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to create plant family: ${response.statusText}`);
  }

  return response.json();
};

import { useQuery } from "@tanstack/react-query";

export interface PlantFamily {
  id: string;
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

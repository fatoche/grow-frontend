import type { Route } from "./+types/plant-families";
import { PlantFamiliesManagement } from "../components/PlantFamiliesManagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GROW - Pflanzen verwalten" },
    { name: "description", content: "Pflanzen und Pflanzenfamilien verwalten" },
  ];
}

export default function PlantFamilies() {
  return <PlantFamiliesManagement />;
} 
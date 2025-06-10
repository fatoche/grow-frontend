import type { Route } from "./+types/garden-planning";
import { Garden } from "../components/Garden";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GROW - Garden Planning" },
    { name: "description", content: "Plan your garden with GROW" },
  ];
}

export default function GardenPlanning() {
  return (
    <Garden 
      numberOfBeds={6}
      bedLength={200}
      bedWidth={120}
    />
  );
} 
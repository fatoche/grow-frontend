import type { Route } from "./+types/beds";
import { Garden } from "../components/Garden";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GROW - Garden Beds" },
    { name: "description", content: "Plan your garden beds with GROW" },
  ];
}

export default function Beds() {
  return (
    <Garden 
      numberOfBeds={6}
      bedLength={200}
      bedWidth={120}
    />
  );
} 
import type { Route } from "./+types/bed-assignment";
import { BedAssignment } from "../components/BedAssignment";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GROW - Beete zuweisen" },
    { name: "description", content: "Pflanzenfamilien den Beeten zuweisen" },
  ];
}

export default function BedAssignmentPage() {
  return <BedAssignment />;
} 
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GROW - Gartenplanung" },
    { name: "description", content: "Gartenplanung mit GROW" },
  ];
}

export default function Home() {
  return <Welcome />;
}

import type { Route } from "./+types/home";
import { Intro } from "../component/intro";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio" },
    { name: "description", content: "Welcome to my Portfolio!" },
  ];
}

export default function Home() {
  return <Intro />;
}

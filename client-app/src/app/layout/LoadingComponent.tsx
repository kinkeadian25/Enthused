import React from "react";
import { PacmanLoader } from "react-spinners";

interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LoadingComponent({ inverted = true, content = "Loading..." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PacmanLoader size={25} color={inverted ? "indigo" : "black"} loading />
      <p className="text-sm text-indigo-500 mt-2">{content}</p>
    </div>
  );
}

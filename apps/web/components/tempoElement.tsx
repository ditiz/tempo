import React from "react";
import { Button } from "ui";
import { Tempo } from "../types";
import { formatTempo } from "../utils/transcode";

interface TempoElementProps {
  tempo: Tempo;
  setTempos: React.Dispatch<React.SetStateAction<Tempo[]>>;
}

const TempoElement: React.FC<TempoElementProps> = ({ tempo, setTempos }) => {
  const toggleTempo = () => {
    setTempos((tempos) => {
      const rest = tempos.filter((t) => t.value !== tempo.value);

      return [
        ...rest,
        {
          ...tempo,
          active: !tempo.active,
        },
      ];
    });
  };

  return (
    <Button variant={tempo.active ? "solid" : "outline"} onClick={toggleTempo}>
      {formatTempo(tempo.value)}%
    </Button>
  );
};

export default TempoElement;

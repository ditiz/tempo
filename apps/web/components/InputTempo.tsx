import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { formatTempo } from "../utils/transcode";

interface InputTempoProps {
  tempo: number;
  changeTempo: (tempo: number) => void;
}

const InputTempo: React.FC<InputTempoProps> = ({ tempo, changeTempo }) => {
  const handleChangeTempo = (valueAsString: string, valueAsNumber: number) => {
    changeTempo(valueAsNumber / 100);
  };

  const format = (val: number) => val + "%";

  return (
    <NumberInput
      value={formatTempo(tempo)}
      format={format}
      min={50}
      max={200}
      onChange={handleChangeTempo}
      width="28"
      pattern=".*$"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default InputTempo;

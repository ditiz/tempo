import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "ui";
import { Tempo } from "../types";
import InputTempo from "./InputTempo";
import SliderTempo from "./SliderTempo";

interface AddTempoProps {
  setTempos: React.Dispatch<React.SetStateAction<Tempo[]>>;
}

const AddTempo: React.FC<AddTempoProps> = ({ setTempos }) => {
  const [tempo, setTempo] = useState(0.75);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTempos((tempos) => {
      if (tempos.find((t) => tempo === t.value)) {
        return tempos;
      }
      return [...tempos, { value: tempo, active: true }];
    });
  };

  return (
    <Flex flexFlow="column" marginY="2">
      <form onSubmit={handleSubmit}>
        <Text>Select tempo</Text>
        <Flex gap="4">
          <SliderTempo tempo={tempo} changeTempo={setTempo} />
          <InputTempo tempo={tempo} changeTempo={setTempo} />
        </Flex>
        <Button bg="green.700" type="submit">
          Add Tempo
        </Button>
      </form>
    </Flex>
  );
};

export default AddTempo;

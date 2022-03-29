import TranscodeResultElement from "./TranscodeResultElement";
import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { Button, Panel } from "ui";
import { AudioElement } from "../types";
import { formatTempo } from "../utils/transcode";

interface TranscodeResultProps {
  audioElements: AudioElement[];
}

const TranscodeResult: React.FC<TranscodeResultProps> = ({ audioElements }) => {
  if (!audioElements.length) {
    return <></>;
  }

  return (
    <Panel gap="4">
      <Flex marginBottom="4">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          Results
        </Text>
      </Flex>

      {audioElements.map((audioElement) => (
        <TranscodeResultElement
          key={audioElement.name}
          audioElement={audioElement}
        />
      ))}
    </Panel>
  );
};

export default TranscodeResult;

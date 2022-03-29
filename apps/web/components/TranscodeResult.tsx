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
    <Panel>
      {audioElements.map((audioElement) => (
        <TranscodeResultElement audioElement={audioElement} />
      ))}
    </Panel>
  );
};

export default TranscodeResult;

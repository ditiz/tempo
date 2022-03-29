import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { Button } from "ui";
import { AudioElement } from "../types";
import { formatTempo } from "../utils/transcode";

interface TranscodeResultElementProps {
  audioElement: AudioElement;
}

const TranscodeResultElement: React.FC<TranscodeResultElementProps> = ({
  audioElement,
}) => {
  return (
    <Grid gap="2" marginY="4">
      <Text>
        {audioElement.name} - {formatTempo(audioElement.tempo)}%
      </Text>
      <Flex key={audioElement.name} gap="2">
        <audio src={audioElement.src} controls></audio>

        <Grid placeItems="center">
          <a href={audioElement.src} download={audioElement.name}>
            <Button>Download</Button>
          </a>
        </Grid>
      </Flex>
    </Grid>
  );
};

export default TranscodeResultElement;

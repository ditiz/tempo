import { Box, Flex, Grid, Progress, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button, Panel } from "ui";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { changeTempoTranscode, formatTempo } from "../utils/transcode";
import { AudioElement, InfosTranscoding } from "../types";
import TranscodeResult from "./TranscodeResult";
import InputTempo from "./InputTempo";
import SliderTempo from "./SliderTempo";
import FormFileSelection from "./formFileSelection";

/**
 * TODO: Add a button to stop transcoding
 */
const MainPanel: React.FC = () => {
  const [audioElements, setAudioElements] = useState<AudioElement[]>([]);

  return (
    <Grid placeItems="center" marginTop="12" gap="12">
      <Panel w="2xl">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          Select a file
        </Text>

        <FormFileSelection setAudioElements={setAudioElements} />
      </Panel>

      <TranscodeResult audioElements={audioElements} />
    </Grid>
  );
};

export default MainPanel;

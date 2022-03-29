import { Box, Flex, Grid, Progress, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button, Panel } from "ui";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { changeTempoTranscode, formatTempo } from "../utils/transcode";
import { AudioElement, InfosTranscoding } from "../types";
import TranscodeResult from "./TranscodeResult";
import InputTempo from "./InputTempo";
import SliderTempo from "./SliderTempo";

/**
 * TODO: Refactor again
 * TODO: Add a button to stop transoding
 */
const MainPanel: React.FC = () => {
  const [audioElements, setAudioElements] = useState<AudioElement[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [infos, setInfos] = useState<InfosTranscoding>({
    message: "Waiting for file",
    percent: 0,
  });
  const [tempo, setTempo] = useState(0.75);

  const ffmpeg = createFFmpeg();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("start");
    if (!file) {
      return;
    }
    setInfos({ message: "Processing...", percent: 0 });
    const transcodeRes = await changeTempoTranscode({
      ffmpeg,
      file,
      tempo,
      setInfos: setInfos,
    });

    setAudioElements((els) => [...els, transcodeRes]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    setFile(file);
  };

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

        <Flex flexFlow="column" marginY="2">
          <form onSubmit={handleSubmit}>
            <Box
              border="2px"
              borderRadius="md"
              borderColor="gray.600"
              marginY="2"
              padding="2"
            >
              <input onChange={handleChange} type="file" name="file" />
            </Box>

            <Flex flexFlow="column" marginY="2">
              <Text>Select tempo</Text>
              <Flex gap="4">
                <SliderTempo tempo={tempo} changeTempo={setTempo} />
                <InputTempo tempo={tempo} changeTempo={setTempo} />
              </Flex>
            </Flex>

            <Flex justifyContent="center">
              <Button type="submit">Start</Button>
            </Flex>
          </form>
        </Flex>

        <Flex flexFlow="column" marginY="2">
          <Text>{infos.message}</Text>
          <Progress value={infos.percent} />
        </Flex>
      </Panel>

      <TranscodeResult audioElements={audioElements} />
    </Grid>
  );
};

export default MainPanel;

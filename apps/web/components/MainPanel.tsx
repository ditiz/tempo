import { Box, Flex, Grid, Progress, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button, Panel } from "ui";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { changeTempoTranscode } from "../utils/transcode";
import { InfosTranscoding } from "../types";

interface AudioElement {
  src: string;
  name: string;
}

/**
 * TODO: Refactor
 * TODO: Add a button to stop transoding
 * TODO: Add progress bar
 * TODO: display warning for browser other than chrome
 */
const MainPanel: React.FC = () => {
  const [audioElement, setAudioElement] = useState<AudioElement[]>([]);
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
    const { outputFile, outputName } = await changeTempoTranscode({
      ffmpeg,
      file,
      tempo,
      setInfos: setInfos,
    });

    setAudioElement((els) => [...els, { src: outputFile, name: outputName }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    setFile(file);
  };

  return (
    <Grid placeItems="center" marginY="24">
      <Panel>
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
            <Flex justifyContent="center">
              <Button type="submit">Start</Button>
            </Flex>
          </form>
        </Flex>

        <Flex flexFlow="column" marginY="2">
          <Text>{infos.message}</Text>
          <Progress value={infos.percent} />
        </Flex>

        {audioElement.map((el) => (
          <Flex key={el.name} gap="2">
            <audio src={el.src} controls></audio>

            <Grid placeItems="center">
              <a href={el.src} download={el.name}>
                <Button>Download</Button>
              </a>
            </Grid>
          </Flex>
        ))}
      </Panel>
    </Grid>
  );
};

export default MainPanel;

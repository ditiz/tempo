import {
  Box,
  Flex,
  Grid,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
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

  const handleChangeSlider = (value: number) => {
    setTempo(value / 100);
  };

  const handleChangeTempo = (valueAsString: string, valueAsNumber: number) => {
    setTempo(valueAsNumber / 100);
  };

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

  const tempoPercent = Math.round(tempo * 100);
  const format = (val: number) => val + "%";

  return (
    <Grid placeItems="center" marginY="24">
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
                <Slider
                  aria-label="slider-ex-1"
                  value={tempoPercent}
                  onChange={handleChangeSlider}
                  min={50}
                  max={200}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>

                {/* TODO: use after to put % */}
                <NumberInput
                  value={tempoPercent}
                  min={50}
                  max={200}
                  onChange={handleChangeTempo}
                  width="28"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
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

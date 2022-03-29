import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Grid,
  Progress,
  Text,
} from "@chakra-ui/react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState } from "react";
import { Button } from "ui";
import { AlertStatus, AudioElement, InfosTranscoding } from "../types";
import { changeTempoTranscode } from "../utils/transcode";
import InputTempo from "./InputTempo";
import SliderTempo from "./SliderTempo";

interface FormFileSelectionProps {
  setAudioElements: React.Dispatch<React.SetStateAction<AudioElement[]>>;
}

const FormFileSelection: React.FC<FormFileSelectionProps> = ({
  setAudioElements,
}) => {
  const [tempo, setTempo] = useState(0.75);
  const [file, setFile] = useState<File | null>(null);
  const [infos, setInfos] = useState<InfosTranscoding>({
    message: { content: "Waiting for file", type: AlertStatus.info },
    percent: 0,
    isTranscoding: false,
  });

  const ffmpeg = createFFmpeg();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    setInfos({
      message: { content: "Processing...", type: AlertStatus.success },
      percent: 0,
      isTranscoding: true,
    });
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
          <Button
            isLoading={infos.isTranscoding}
            loadingText="Working"
            type="submit"
          >
            Start
          </Button>
        </Flex>
      </form>

      <Flex flexFlow="column" marginY="2">
        {!infos.isTranscoding ? (
          <Alert status={infos.message.type}>
            <AlertIcon />
            {infos.message.content}
          </Alert>
        ) : (
          <Flex flexFlow="column">
            {infos.message.content}
            <Progress value={infos.percent} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default FormFileSelection;

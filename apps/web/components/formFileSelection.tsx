import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Flex,
  Progress,
} from "@chakra-ui/react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState } from "react";
import { Button } from "ui";
import { AlertStatus, AudioElement, InfosTranscoding, Tempo } from "../types";
import { changeTempoTranscode } from "../utils/transcode";
import AddTempo from "./addTempo";
import TempoElement from "./tempoElement";

interface FormFileSelectionProps {
  setAudioElements: React.Dispatch<React.SetStateAction<AudioElement[]>>;
}

const defaultTempos = [
  { value: 0.7, active: true },
  { value: 0.76, active: true },
  { value: 0.82, active: true },
  { value: 0.88, active: true },
  { value: 0.94, active: true },
];

const FormFileSelection: React.FC<FormFileSelectionProps> = ({
  setAudioElements,
}) => {
  const [tempos, setTempos] = useState<Tempo[]>(defaultTempos);
  const [file, setFile] = useState<File | null>(null);
  const [infos, setInfos] = useState<InfosTranscoding>({
    message: { content: "Waiting for file", type: AlertStatus.info },
    percent: 0,
    isTranscoding: false,
  });

  const ffmpeg = createFFmpeg();

  const startTranscoding = async () => {
    if (!file) {
      setInfos({
        message: {
          content: "No file selected",
          type: AlertStatus.error,
        },
        percent: 0,
        isTranscoding: false,
      });
      return;
    }

    if (!tempos.length) {
      setInfos({
        message: {
          content: "Add a tempo",
          type: AlertStatus.error,
        },
        percent: 0,
        isTranscoding: false,
      });
      return;
    }

    setInfos({
      message: { content: "Processing...", type: AlertStatus.success },
      percent: 0,
      isTranscoding: true,
    });

    console.log(tempos);
    for (const tempo of tempos) {
      const transcodeRes = await changeTempoTranscode({
        ffmpeg,
        file,
        tempo: tempo.value,
        setInfos: setInfos,
      });

      setAudioElements((els) => [...els, transcodeRes]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    setFile(file);
  };

  const sortTempos = (a: Tempo, b: Tempo) => {
    return a.value - b.value;
  };

  return (
    <Flex flexFlow="column" marginY="2">
      <Box
        border="2px"
        borderRadius="md"
        borderColor="gray.600"
        marginY="2"
        padding="2"
      >
        <input onChange={handleChange} type="file" name="file" />
      </Box>

      <AddTempo setTempos={setTempos} />

      <Flex
        justifyContent="center"
        alignItems="center"
        flexFlow="column"
        gap="4"
      >
        <Flex gap="2" flexWrap="wrap">
          {tempos.sort(sortTempos).map((tempo, index) => (
            <TempoElement tempo={tempo} setTempos={setTempos} key={index} />
          ))}
        </Flex>

        <Button
          isLoading={infos.isTranscoding}
          loadingText="Working"
          onClick={startTranscoding}
        >
          Start Transcoding
        </Button>
      </Flex>

      <Divider marginY="4" />

      <Flex flexFlow="column">
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

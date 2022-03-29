import { fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { AlertStatus, AudioElement, InfosTranscoding } from "../types";

interface ChangeTempoTranscodeProps {
  ffmpeg: FFmpeg;
  file: File;
  tempo: number;
  setInfos: (values: InfosTranscoding) => void;
}

export async function changeTempoTranscode({
  ffmpeg,
  file,
  tempo,
  setInfos,
}: ChangeTempoTranscodeProps): Promise<AudioElement> {
  const { name } = file;

  const speed = tempo * 100 + "%";
  const outputName = name.replace(/\.[^/.]+$/, `_${speed}.mp3`);

  setInfos({
    message: { content: "Loading ffmpeg-core.js", type: AlertStatus.info },
    percent: 0,
    isTranscoding: true,
  });

  await ffmpeg.load();
  setInfos({
    message: { content: "Start transcoding", type: AlertStatus.info },
    percent: 0,
    isTranscoding: true,
  });

  ffmpeg.FS("writeFile", name, await fetchFile(file));

  ffmpeg.setProgress(({ ratio }) => {
    // Handle ratio > 1
    if (ratio > 1) {
      return;
    }

    setInfos({
      message: {
        content: `Transcoding speed ${Math.round(tempo * 100)}%...`,
        type: AlertStatus.info,
      },
      percent: ratio * 100,
      isTranscoding: true,
    });
  });

  await ffmpeg.run("-i", name, "-filter:a", `atempo=${tempo}`, outputName);

  setInfos({
    message: { content: "Complete transcoding", type: AlertStatus.success },
    percent: 100,
    isTranscoding: false,
  });

  const data = ffmpeg.FS("readFile", outputName);

  // Handle transcoding error
  if (data.buffer.byteLength === 0) {
    setInfos({
      message: { content: "Error transcoding", type: AlertStatus.error },
      percent: 0,
      isTranscoding: false,
    });
    return;
  }

  const outputFile = URL.createObjectURL(
    new Blob([data.buffer], { type: "audio/mpeg" })
  );

  return {
    name: outputName,
    src: outputFile,
    tempo,
  };
}

export const formatTempo = (tempo: number) => Math.round(tempo * 100);

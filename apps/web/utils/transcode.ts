import { fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { AudioElement, InfosTranscoding } from "../types";

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

  setInfos({ message: "Loading ffmpeg-core.js", percent: 0 });

  await ffmpeg.load();
  setInfos({ message: "Start transcoding", percent: 0 });

  ffmpeg.FS("writeFile", name, await fetchFile(file));

  ffmpeg.setProgress(({ ratio }) =>
    setInfos({
      message: `Transcoding speed ${Math.round(tempo * 100)}%...`,
      percent: ratio * 100,
    })
  );

  await ffmpeg.run("-i", name, "-filter:a", `atempo=${tempo}`, outputName);

  setInfos({ message: "Complete transcoding", percent: 100 });

  const data = ffmpeg.FS("readFile", outputName);

  // Handle transcoding error
  if (data.buffer.byteLength === 0) {
    setInfos({ message: "Error transcoding", percent: 0 });
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

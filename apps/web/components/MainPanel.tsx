import { Grid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Panel } from "ui";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

/**
 * TODO: Refactor
 * TODO: Add a button to download the file
 * TODO: Add a button to stop transoding
 * TODO: Add progress bar
 * TODO: display warning for browser other than chrome
 */
const MainPanel: React.FC = () => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("Waiting for file");

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    setMessage("Processing...");
    await doTranscode(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    setFile(file);
  };

  const doTranscode = async (file: File) => {
    const { name } = file;
    const outputName = name.replace(/\.[^/.]+$/, "_slow.mp3");

    setMessage("Loading ffmpeg-core.js");

    await ffmpeg.load();
    setMessage("Start transcoding");

    ffmpeg.FS("writeFile", name, await fetchFile(file));
    // await ffmpeg.run("-i", name, "-filter:a", '"atempo=0.5"', "test.mp3");
    await ffmpeg.run("-i", name, "-filter:a", "atempo=0.5", outputName);

    setMessage("Complete transcoding");

    const data = ffmpeg.FS("readFile", outputName);

    // Handle transcoding error
    if (data.buffer.byteLength === 0) {
      setMessage("Error transcoding");
      return;
    }

    setAudioSrc(
      URL.createObjectURL(new Blob([data.buffer], { type: "audio/mpeg" }))
    );
  };

  return (
    <Grid placeItems="center" marginY="24">
      <Panel>
        <Text>Select a file</Text>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="file" name="file" />
          <button type="submit">Start</button>
        </form>

        <Text>{message}</Text>

        <audio src={audioSrc} controls></audio>
      </Panel>
    </Grid>
  );
};

export default MainPanel;

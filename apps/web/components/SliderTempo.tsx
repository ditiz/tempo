import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";
import { formatTempo } from "../utils/transcode";

interface SliderTempoProps {
  tempo: number;
  changeTempo: (tempo: number) => void;
}

const SliderTempo: React.FC<SliderTempoProps> = ({ tempo, changeTempo }) => {
  const handleChangeSlider = (value: number) => {
    changeTempo(value / 100);
  };

  return (
    <Slider
      aria-label="slider-ex-1"
      value={formatTempo(tempo)}
      onChange={handleChangeSlider}
      min={50}
      max={200}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};
export default SliderTempo;

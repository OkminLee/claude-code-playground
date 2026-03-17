import React from "react";
import { Composition } from "remotion";
import { CholecystectomyGuide } from "./CholecystectomyGuide";
import { TOTAL_DURATION, FPS } from "./styles/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CholecystectomyGuide"
      component={CholecystectomyGuide}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

import React from "react";
import {
  Audio,
  staticFile,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { linearTiming } from "@remotion/transitions";
import { sceneDurations, TRANSITION_DURATION } from "./styles/theme";
import { IntroScene } from "./scenes/IntroScene";
import { PostSurgeryScene } from "./scenes/PostSurgeryScene";
import { DietManagementScene } from "./scenes/DietManagementScene";
import { NormalDietScene } from "./scenes/NormalDietScene";
import { TipsScene } from "./scenes/TipsScene";
import { OutroScene } from "./scenes/OutroScene";

const transitionTiming = linearTiming({ durationInFrames: TRANSITION_DURATION });

export const CholecystectomyGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgmVolume = interpolate(
    frame,
    [0, fps * 2, durationInFrames - fps * 2, durationInFrames],
    [0, 0.18, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      <Audio src={staticFile("bgm.mp3")} volume={bgmVolume} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={sceneDurations.intro}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence durationInFrames={sceneDurations.postSurgery}>
          <PostSurgeryScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence durationInFrames={sceneDurations.diet}>
          <DietManagementScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence durationInFrames={sceneDurations.normalDiet}>
          <NormalDietScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence durationInFrames={sceneDurations.tips}>
          <TipsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence durationInFrames={sceneDurations.outro}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { TOTAL_DURATION, FPS } from "./styles/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CholecystectomyGuide"
        component={MyComposition}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors, FONT_FAMILY } from "../styles/theme";
import { CheckMark } from "../components/icons/MedicalIcons";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const fadeOut = interpolate(frame, [fps * 3.5, fps * 4.5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity: fadeOut,
      }}
    >
      <div style={{ marginBottom: 30 }}>
        <CheckMark size={80} delay={5} />
      </div>

      <div
        style={{
          opacity: mainProgress,
          transform: `scale(${interpolate(mainProgress, [0, 1], [0.8, 1])})`,
          fontFamily: FONT_FAMILY,
          fontSize: 44,
          fontWeight: "700",
          color: colors.text,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: colors.accent }}>1~2개월</span>만 조심하면
        <br />
        정상 생활 가능
      </div>

      <div
        style={{
          marginTop: 30,
          opacity: interpolate(frame, [fps * 1.5, fps * 2.5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontFamily: FONT_FAMILY,
          fontSize: 22,
          color: colors.subText,
          textAlign: "center",
        }}
      >
        증상이 지속되면 병원에서 관리 가능합니다
      </div>
    </AbsoluteFill>
  );
};

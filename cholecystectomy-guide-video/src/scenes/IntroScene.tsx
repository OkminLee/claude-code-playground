import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { colors, FONT_FAMILY } from "../styles/theme";
import { BodySilhouette } from "../components/icons/BodySilhouette";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(frame, [fps * 1.5, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <BodySilhouette size={250} delay={10} />
      </div>

      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${titleY}px)`,
          fontFamily: FONT_FAMILY,
          fontSize: 64,
          fontWeight: "700",
          color: colors.text,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        담낭절제술 후
        <br />
        관리법
      </div>

      <div
        style={{
          opacity: subtitleOpacity,
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          color: colors.subText,
          marginTop: 20,
        }}
      >
        시간 순서로 알아보기
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: subtitleOpacity,
          fontFamily: FONT_FAMILY,
          fontSize: 20,
          color: colors.subText,
        }}
      >
        의학적 근거 기반
      </div>
    </AbsoluteFill>
  );
};

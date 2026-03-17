import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors, FONT_FAMILY } from "../styles/theme";
import { TimelineBar } from "../components/TimelineBar";
import { AnimatedText } from "../components/AnimatedText";
import { CheckMark } from "../components/icons/MedicalIcons";

export const NormalDietScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <TimelineBar currentPhase="normalDiet" enterDelay={0} />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <CheckMark size={120} delay={10} />
        </div>

        <AnimatedText
          text="대부분 정상 식사 가능"
          delay={20}
          fontSize={48}
          fontWeight="700"
        />

        <div style={{ marginTop: 24 }}>
          <AnimatedText
            text="평생 제한 식단 아님"
            delay={40}
            fontSize={38}
            fontWeight="700"
            color={colors.accent}
            highlight
            highlightColor={colors.accent}
          />
        </div>

        <div
          style={{
            marginTop: 40,
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: "20px 28px",
            opacity: interpolate(frame, [fps * 3, fps * 4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              color: colors.subText,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            본인에게 불편한 음식만
            <br />
            피하면 됩니다
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

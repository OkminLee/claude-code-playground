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
import { WarningIcon } from "../components/icons/WarningIcon";

const warningItems = [
  { text: "38도 이상 발열" },
  { text: "지속적 복통" },
  { text: "황달 (눈·피부)" },
  { text: "구토 지속" },
];

export const PostSurgeryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <TimelineBar currentPhase="postSurgery" enterDelay={0} />

      <div
        style={{
          position: "absolute",
          top: 220,
          left: 60,
          right: 60,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <AnimatedText
            text="1~2일 금식 + 항생제 치료"
            delay={15}
            fontSize={36}
            fontWeight="700"
          />
        </div>
        <div style={{ marginBottom: 30 }}>
          <AnimatedText
            text="복강경 → 1~2일 내 퇴원"
            delay={30}
            fontSize={32}
            color={colors.subText}
          />
        </div>
        <div style={{ marginBottom: 50 }}>
          <AnimatedText
            text="한 달간 복부 운동 자제"
            delay={45}
            fontSize={32}
            color={colors.subText}
          />
        </div>

        <div
          style={{
            backgroundColor: "#FFF5F5",
            borderRadius: 20,
            padding: 30,
            borderLeft: `5px solid ${colors.warning}`,
            opacity: interpolate(frame, [fps * 2, fps * 2.5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(
              frame,
              [fps * 2, fps * 2.5],
              [20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <WarningIcon size={32} delay={fps * 2.2} />
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: "700",
                color: colors.warning,
              }}
            >
              바로 병원 가야 하는 신호
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {warningItems.map((item, i) => {
              const itemDelay = fps * 2.5 + i * 8;
              const itemProgress = spring({
                frame: frame - itemDelay,
                fps,
                config: { damping: 200 },
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity: itemProgress,
                    transform: `translateX(${interpolate(
                      itemProgress,
                      [0, 1],
                      [20, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: colors.warning,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 26,
                      color: colors.text,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

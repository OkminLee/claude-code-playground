import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors, FONT_FAMILY, FPS } from "../styles/theme";
import { TimelineBar } from "../components/TimelineBar";
import { AnimatedText } from "../components/AnimatedText";
import { WarningIcon } from "../components/icons/WarningIcon";

const barData = [
  { label: "발생률", value: 0.35, displayText: "10~40%", color: colors.accent },
  { label: "자연 호전", value: 0.75, displayText: "75%", color: colors.medical },
];

export const TipsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <TimelineBar currentPhase="longTerm" enterDelay={0} />

      <div
        style={{
          position: "absolute",
          top: 210,
          left: 50,
          right: 50,
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <AnimatedText
            text="담낭절제술 후 증후군 (PCS)"
            delay={10}
            fontSize={32}
            fontWeight="700"
          />

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {barData.map((item, i) => {
              const barDelay = 25 + i * 20;
              const barWidth = spring({
                frame: frame - barDelay,
                fps,
                config: { damping: 200 },
              });

              return (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 22,
                      color: colors.subText,
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 36,
                        backgroundColor: "#F0EBE5",
                        borderRadius: 18,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${barWidth * item.value * 100}%`,
                          height: "100%",
                          backgroundColor: item.color,
                          borderRadius: 18,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 24,
                        fontWeight: "700",
                        color: item.color,
                        minWidth: 80,
                        opacity: barWidth,
                      }}
                    >
                      {item.displayText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 14,
              opacity: interpolate(frame, [fps * 2.5, fps * 3.2], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 22,
                color: colors.subText,
              }}
            >
              지속 시 병원에서 약물 관리 가능
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            opacity: interpolate(frame, [fps * 4, fps * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(
              frame,
              [fps * 4, fps * 5],
              [20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              fontWeight: "700",
              color: colors.text,
              marginBottom: 16,
            }}
          >
            장기적 체크사항
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  backgroundColor: colors.medical,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                +
              </div>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 24, color: colors.text }}>
                혈당 정기 체크
              </span>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: colors.subText }}>
                (당뇨 위험 +20%)
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <WarningIcon size={22} delay={fps * 5} color={colors.warning} />
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  color: colors.warning,
                  fontWeight: "700",
                }}
              >
                복통·황달 → 바로 내원
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

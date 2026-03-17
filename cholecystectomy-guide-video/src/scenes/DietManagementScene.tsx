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
import { ArrowFlow } from "../components/icons/MedicalIcons";
import {
  MeatIcon,
  FriedFoodIcon,
  VegetableIcon,
  SmallPlatesIcon,
  AlcoholIcon,
} from "../components/icons/FoodIcons";

const rules = [
  {
    icon: "meat",
    title: "기름진 음식 줄이기",
    sub: "삼겹살, 튀김, 버터 등",
    delay: FPS * 4,
  },
  {
    icon: "plates",
    title: "소량씩 자주 먹기",
    sub: "한 번에 많이 X",
    delay: FPS * 6.5,
  },
  {
    icon: "veg",
    title: "식이섬유 천천히 늘리기",
    sub: "묽은 변/설사 예방",
    delay: FPS * 9,
  },
];

export const DietManagementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <TimelineBar currentPhase="diet" enterDelay={0} />

      <div
        style={{
          position: "absolute",
          top: 200,
          left: 50,
          right: 50,
        }}
      >
        <div style={{ marginBottom: 25 }}>
          <AnimatedText
            text="식이 관리가 가장 중요"
            delay={10}
            fontSize={40}
            fontWeight="700"
            highlight
          />
        </div>

        <div
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 24,
            marginBottom: 30,
            opacity: interpolate(frame, [fps * 1, fps * 1.8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <ArrowFlow delay={fps * 1.2} width={400} size={55} />
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              color: colors.subText,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            담낭 없이 담즙이 직접 분비되어
            <br />
            <span style={{ color: colors.accent, fontWeight: "700" }}>
              한꺼번에 많은 지방 처리가 어려움
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rules.map((rule, i) => {
            const ruleProgress = spring({
              frame: frame - rule.delay,
              fps,
              config: { damping: 200 },
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  padding: "16px 20px",
                  opacity: ruleProgress,
                  transform: `translateX(${interpolate(
                    ruleProgress,
                    [0, 1],
                    [-40, 0]
                  )}px)`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ flexShrink: 0, width: 60, display: "flex", justifyContent: "center" }}>
                  {rule.icon === "meat" && (
                    <div style={{ display: "flex", gap: 4 }}>
                      <MeatIcon size={45} delay={rule.delay + 5} showX />
                      <FriedFoodIcon size={45} delay={rule.delay + 10} showX />
                    </div>
                  )}
                  {rule.icon === "plates" && (
                    <SmallPlatesIcon size={40} delay={rule.delay + 5} />
                  )}
                  {rule.icon === "veg" && (
                    <VegetableIcon size={45} delay={rule.delay + 5} />
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 28,
                      fontWeight: "700",
                      color: colors.text,
                    }}
                  >
                    {rule.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 20,
                      color: colors.subText,
                      marginTop: 4,
                    }}
                  >
                    {rule.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginTop: 24,
            opacity: interpolate(frame, [fps * 11, fps * 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <AlcoholIcon size={40} delay={fps * 11} showX />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              fontWeight: "700",
              color: colors.warning,
            }}
          >
            금주 권장
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

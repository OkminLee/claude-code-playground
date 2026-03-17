import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import {
  FONT_FAMILY,
  colors,
  timelinePhases,
  type TimelinePhase,
} from "../styles/theme";

type TimelineBarProps = {
  currentPhase: TimelinePhase;
  enterDelay?: number;
};

export const TimelineBar: React.FC<TimelineBarProps> = ({
  currentPhase,
  enterDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame: frame - enterDelay,
    fps,
    config: { damping: 200 },
  });

  const currentIndex = timelinePhases.findIndex((p) => p.id === currentPhase);
  const targetProgress = timelinePhases[currentIndex].position;

  const barProgress = interpolate(
    spring({
      frame: frame - enterDelay - 10,
      fps,
      config: { damping: 100 },
    }),
    [0, 1],
    [0, targetProgress]
  );

  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const translateY = interpolate(enterProgress, [0, 1], [-40, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 60,
        right: 60,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          height: 6,
          backgroundColor: colors.card,
          borderRadius: 3,
          position: "relative",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${barProgress * 100}%`,
            backgroundColor: colors.accent,
            borderRadius: 3,
            transition: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${barProgress * 100}%`,
            top: -7,
            width: 20,
            height: 20,
            backgroundColor: colors.accent,
            borderRadius: "50%",
            border: `3px solid ${colors.white}`,
            transform: "translateX(-50%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 16,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {timelinePhases.map((phase, i) => {
          const isActive = i <= currentIndex;
          return (
            <div
              key={phase.id}
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 22,
                fontWeight: isActive ? "700" : "400",
                color: isActive ? colors.accent : colors.subText,
                textAlign: "center",
                position: "absolute",
                left: `${phase.position * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {phase.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

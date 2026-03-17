import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FONT_FAMILY, colors } from "../styles/theme";

type AnimatedTextProps = {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: "400" | "700";
  color?: string;
  align?: "center" | "left" | "right";
  highlight?: boolean;
  highlightColor?: string;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  fontWeight = "400",
  color = colors.text,
  align = "center",
  highlight = false,
  highlightColor = colors.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [30, 0]);

  const highlightWidth = highlight
    ? spring({
        frame: frame - delay - 8,
        fps,
        config: { damping: 200 },
      })
    : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight,
        color,
        textAlign: align,
        position: "relative",
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: -4,
            right: -4,
            height: fontSize * 0.35,
            backgroundColor: highlightColor,
            opacity: 0.25,
            borderRadius: 4,
            transformOrigin: "left center",
            transform: `scaleX(${highlightWidth})`,
          }}
        />
      )}
      {text}
    </div>
  );
};

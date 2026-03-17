import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { colors } from "../../styles/theme";

type WarningIconProps = {
  size?: number;
  delay?: number;
  color?: string;
};

export const WarningIcon: React.FC<WarningIconProps> = ({
  size = 40,
  delay = 0,
  color = colors.warning,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  return (
    <div style={{ transform: `scale(${scale})`, display: "inline-flex" }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <path
          d="M20 4 L37 34 L3 34 Z"
          fill={color}
          stroke="none"
          strokeLinejoin="round"
        />
        <text
          x="20"
          y="29"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
        >
          !
        </text>
      </svg>
    </div>
  );
};

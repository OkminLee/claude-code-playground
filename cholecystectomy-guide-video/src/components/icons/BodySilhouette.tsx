import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { colors } from "../../styles/theme";

type BodySilhouetteProps = {
  size?: number;
  delay?: number;
};

export const BodySilhouette: React.FC<BodySilhouetteProps> = ({
  size = 300,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bodyScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const gallbladderScale = spring({
    frame: frame - delay - 15,
    fps,
    config: { damping: 12 },
  });

  return (
    <div style={{ transform: `scale(${bodyScale})`, display: "inline-flex" }}>
      <svg width={size} height={size * 1.2} viewBox="0 0 300 360">
        <circle cx="150" cy="50" r="35" fill="#E8DDD5" />
        <path
          d="M100 90 Q80 120 85 200 Q88 280 100 320 L200 320 Q212 280 215 200 Q220 120 200 90 Z"
          fill="#E8DDD5"
          opacity={0.8}
        />
        <path d="M85 110 Q50 140 45 200" stroke="#E8DDD5" strokeWidth="25" fill="none" strokeLinecap="round" />
        <path d="M215 110 Q250 140 255 200" stroke="#E8DDD5" strokeWidth="25" fill="none" strokeLinecap="round" />
        <g transform={`scale(${gallbladderScale})`} style={{ transformOrigin: "170px 170px" }}>
          <ellipse cx="160" cy="160" rx="40" ry="25" fill="#C07050" opacity={0.5} />
          <circle cx="175" cy="175" r="12" fill="none" stroke={colors.accent} strokeWidth="3" strokeDasharray="5 3" />
          <line x1="195" y1="178" x2="220" y2="185" stroke={colors.accent} strokeWidth="2" />
          <text x="225" y="190" fill={colors.accent} fontSize="16" fontWeight="bold">
            담낭
          </text>
        </g>
      </svg>
    </div>
  );
};

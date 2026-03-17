import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { colors } from "../../styles/theme";

type IconProps = {
  size?: number;
  delay?: number;
};

export const CheckMark: React.FC<IconProps> = ({ size = 80, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });

  return (
    <div style={{ transform: `scale(${scale})`, display: "inline-flex" }}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="38" fill={colors.medical} />
        <path
          d="M22 40 L34 52 L58 28"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const LiverIcon: React.FC<IconProps> = ({ size = 120, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{ transform: `scale(${scale})`, display: "inline-flex" }}>
      <svg width={size} height={size} viewBox="0 0 120 100">
        <ellipse cx="55" cy="45" rx="45" ry="35" fill="#C07050" opacity={0.9} />
        <ellipse cx="40" cy="50" rx="25" ry="20" fill="#B06040" opacity={0.7} />
        <path
          d="M55 75 L55 95"
          stroke={colors.medical}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx="70"
          cy="70"
          r="12"
          fill="none"
          stroke={colors.warning}
          strokeWidth="2.5"
          strokeDasharray="4 3"
        />
        <text x="70" y="75" textAnchor="middle" fill={colors.warning} fontSize="16" fontWeight="bold">
          X
        </text>
      </svg>
    </div>
  );
};

export const ThermometerIcon: React.FC<IconProps> = ({
  size = 36,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{ transform: `scale(${scale})`, display: "inline-flex" }}>
      <svg width={size} height={size} viewBox="0 0 36 36">
        <rect x="14" y="4" width="8" height="22" rx="4" fill={colors.warning} />
        <circle cx="18" cy="28" r="6" fill={colors.warning} />
        <rect x="16" y="10" width="4" height="14" fill="white" opacity={0.5} />
      </svg>
    </div>
  );
};

export const ArrowFlow: React.FC<IconProps & { width?: number }> = ({
  width = 300,
  size = 60,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{ opacity: progress }}>
      <svg width={width} height={size} viewBox={`0 0 ${width} ${size}`}>
        <rect x="10" y="10" width="70" height="40" rx="8" fill="#C07050" />
        <text x="45" y="36" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">간</text>

        <line x1="90" y1="30" x2="150" y2="30" stroke={colors.medical} strokeWidth="3" />
        <polygon points="148,22 162,30 148,38" fill={colors.medical} />

        <rect x="170" y="10" width="70" height="40" rx="8" fill={colors.medical} />
        <text x="205" y="36" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">담관</text>

        <line x1="250" y1="30" x2="310" y2="30" stroke={colors.medical} strokeWidth="3" />
        <polygon points="308,22 322,30 308,38" fill={colors.medical} />

        <rect x="330" y="10" width="70" height="40" rx="8" fill={colors.accent} />
        <text x="365" y="36" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">소장</text>
      </svg>
    </div>
  );
};

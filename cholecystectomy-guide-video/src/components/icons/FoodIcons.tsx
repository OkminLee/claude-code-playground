import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { colors } from "../../styles/theme";

type IconProps = {
  size?: number;
  delay?: number;
  showX?: boolean;
};

export const MeatIcon: React.FC<IconProps> = ({
  size = 50,
  delay = 0,
  showX = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{ transform: `scale(${scale})`, display: "inline-flex", position: "relative" }}>
      <svg width={size} height={size} viewBox="0 0 50 50">
        <rect x="8" y="10" width="34" height="8" rx="3" fill="#E8A0A0" />
        <rect x="8" y="16" width="34" height="4" rx="1" fill="#FFEEDD" />
        <rect x="8" y="20" width="34" height="8" rx="3" fill="#E8A0A0" />
        <rect x="8" y="26" width="34" height="4" rx="1" fill="#FFEEDD" />
        <rect x="8" y="30" width="34" height="8" rx="3" fill="#E8A0A0" />
      </svg>
      {showX && (
        <div
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: colors.warning,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          X
        </div>
      )}
    </div>
  );
};

export const FriedFoodIcon: React.FC<IconProps> = ({
  size = 50,
  delay = 0,
  showX = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{ transform: `scale(${scale})`, display: "inline-flex", position: "relative" }}>
      <svg width={size} height={size} viewBox="0 0 50 50">
        <ellipse cx="25" cy="30" rx="18" ry="12" fill="#E8C060" />
        <ellipse cx="25" cy="28" rx="14" ry="9" fill="#F0D080" />
        <path d="M18 22 Q20 14 25 16 Q30 14 32 22" fill="#E8C060" />
      </svg>
      {showX && (
        <div
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: colors.warning,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          X
        </div>
      )}
    </div>
  );
};

export const VegetableIcon: React.FC<IconProps> = ({
  size = 50,
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
      <svg width={size} height={size} viewBox="0 0 50 50">
        <ellipse cx="20" cy="25" rx="12" ry="18" fill={colors.medical} transform="rotate(-20 20 25)" />
        <ellipse cx="32" cy="25" rx="12" ry="18" fill="#5AAF9F" transform="rotate(20 32 25)" />
        <line x1="20" y1="12" x2="20" y2="38" stroke="#3D8B7D" strokeWidth="1.5" transform="rotate(-20 20 25)" />
        <line x1="32" y1="12" x2="32" y2="38" stroke="#4A9F8F" strokeWidth="1.5" transform="rotate(20 32 25)" />
      </svg>
    </div>
  );
};

export const SmallPlatesIcon: React.FC<IconProps> = ({
  size = 50,
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
      <svg width={size * 2} height={size} viewBox="0 0 100 50">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${15 + i * 30}, 15)`}>
            <ellipse cx="10" cy="15" rx="12" ry="5" fill="#E8E0D8" />
            <ellipse cx="10" cy="13" rx="10" ry="8" fill="#F5F0EB" />
            <circle cx="8" cy="11" r="2.5" fill={colors.accent} />
            <circle cx="13" cy="12" r="2" fill={colors.medical} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export const AlcoholIcon: React.FC<IconProps> = ({
  size = 50,
  delay = 0,
  showX = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{ transform: `scale(${scale})`, display: "inline-flex", position: "relative" }}>
      <svg width={size} height={size} viewBox="0 0 50 50">
        <path d="M18 8 L18 22 Q18 30 25 30 Q32 30 32 22 L32 8 Z" fill="#E8D0C0" stroke="#C0A090" strokeWidth="1.5" />
        <rect x="23" y="30" width="4" height="10" fill="#C0A090" />
        <rect x="17" y="40" width="16" height="3" rx="1.5" fill="#C0A090" />
        <path d="M20 18 L20 22 Q20 28 25 28 Q30 28 30 22 L30 18 Z" fill="#D4A0A0" opacity={0.6} />
      </svg>
      {showX && (
        <div
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: colors.warning,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          X
        </div>
      )}
    </div>
  );
};

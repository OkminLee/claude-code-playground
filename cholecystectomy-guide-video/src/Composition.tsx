import { AbsoluteFill } from "remotion";
import { colors, FONT_FAMILY } from "./styles/theme";

export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily: FONT_FAMILY,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: colors.text,
          fontSize: 60,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        담낭 절제술 후<br />
        관리 가이드
      </div>
    </AbsoluteFill>
  );
};

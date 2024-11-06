import { ViewProps } from "react-native";
import { MotiView } from "moti";

export default function Skeleton({
  className,
  style,
  children,
  ...rest
}: ViewProps) {
  return (
    <MotiView
      style={style}
      className={className}
      {...rest}
      from={{ backgroundColor: "#ddd" }}
      animate={{ backgroundColor: "#eee" }}
      transition={{
        duration: 1000,
        loop: true,
        repeatReverse: true,
      }}
    >
      {children}
    </MotiView>
  );
}

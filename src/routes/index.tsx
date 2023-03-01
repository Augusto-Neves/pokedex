import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./routes";

type Props = {
  onReady?: () => void;
};

export function Routes({ onReady }: Props) {
  return (
    <NavigationContainer onReady={onReady}>
      <AppRoutes />
    </NavigationContainer>
  );
}

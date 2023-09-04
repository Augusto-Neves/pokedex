import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './routes';
import { PokemonContextProvider } from '../context/PokemonContext';

type Props = {
  onReady?: () => void;
};

export function Routes({ onReady }: Props) {
  return (
    <PokemonContextProvider>
      <NavigationContainer onReady={onReady}>
        <AppRoutes />
      </NavigationContainer>
    </PokemonContextProvider>
  );
}

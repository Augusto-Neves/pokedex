import { PokemonProps } from "./pokemonProps";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Pokemon: PokemonProps;
      Comparator: undefined;
      Quiz: undefined;
      Favorites: undefined;      
    }
  }
}

import { Ability } from "./pokemonAbilityType";
import { StatInterface, PokemonTypes, Moves } from "./pokemonProps";

export interface ParamsProps {
  id: number;
  name: string;
  moves: Moves[];
  height: number;
  weight: number;
  baseExperience: number;
  abilities: Ability[];
  stats: StatInterface[];
  types: PokemonTypes[];
  sprite: string;
}

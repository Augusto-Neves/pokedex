import { BaseType } from "./baseType";
import { Abilities } from "./pokemonAbilityType";

export interface StatInterface {
  base_stat: number;
  effort: number;
  stat: BaseType;
}

export interface PokemonTypes {
  slot: number;
  type: BaseType;
}

export interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: Abilities[];
    baseExperience: number;
    stats: StatInterface[];
    types: PokemonTypes[];
    sprite: string;
  };
}

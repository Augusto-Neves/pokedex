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

export interface VersionGroupDetails {
  level_learned_at: number;
  move_learn_method: BaseType;
  version_group: BaseType;
}

export interface Moves {
  move: BaseType;
  version_group_details: VersionGroupDetails[];
}

export interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    moves: Moves[];
    height: number;
    weight: number;
    abilities: Abilities[];
    baseExperience: number;
    stats: StatInterface[];
    types: PokemonTypes[];
    sprite: string;
  };
}

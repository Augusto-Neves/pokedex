export interface AbilityProp {
  name: string;
  url: string;
}

export interface Ability {
  ability: AbilityProp;
  is_hidden: boolean;
  slot: number;
}

export interface Abilities {
  abilities: Ability[];
}

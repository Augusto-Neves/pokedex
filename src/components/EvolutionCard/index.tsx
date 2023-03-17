import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ParamsProps } from "../../@types/pokemonParamsProps";
import { addingPadToString } from "../../utils/addingPadToString";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { searchPokemon } from "../../service/axios";

// Pokemons Types Icons
import GrassIcon from "../../assets/typeIcons/grass.svg";
import FireIcon from "../../assets/typeIcons/fire.svg";
import WaterIcon from "../../assets/typeIcons/water.svg";
import BugIcon from "../../assets/typeIcons/bug.svg";
import NormalIcon from "../../assets/typeIcons/normal.svg";
import PoisonIcon from "../../assets/typeIcons/poison.svg";
import ElectricIcon from "../../assets/typeIcons/electric.svg";
import GroundIcon from "../../assets/typeIcons/ground.svg";
import RockIcon from "../../assets/typeIcons/rock.svg";
import PsychicIcon from "../../assets/typeIcons/psychic.svg";
import FightingIcon from "../../assets/typeIcons/fighting.svg";
import GhostIcon from "../../assets/typeIcons/ghost.svg";
import FlyingIcon from "../../assets/typeIcons/flying.svg";
import FairyIcon from "../../assets/typeIcons/fairy.svg";
import IceIcon from "../../assets/typeIcons/ice.svg";
import DragonIcon from "../../assets/typeIcons/dragon.svg";
import DarkIcon from "../../assets/typeIcons/dark.svg";
import SteelIcon from "../../assets/typeIcons/steel.svg";

interface EvolutionCardProps {
  species: {
    name: string;
    url: string;
  };
}

export function EvolutionCard(evolution: EvolutionCardProps) {
  const pokemonId = evolution.species.url.split("/")[6];
  const [pokemon, setPokemon] = useState<ParamsProps>();

  function returnPokemonTypeIcon(pokemonType: string) {
    const pokemonTypes = {
      grass: <GrassIcon height={15} width={15} />,
      fire: <FireIcon height={15} width={15} />,
      water: <WaterIcon height={15} width={15} />,
      bug: <BugIcon height={15} width={15} />,
      normal: <NormalIcon height={15} width={15} />,
      poison: <PoisonIcon height={15} width={15} />,
      electric: <ElectricIcon height={15} width={15} />,
      ground: <GroundIcon height={15} width={15} />,
      rock: <RockIcon height={15} width={15} />,
      psychic: <PsychicIcon height={15} width={15} />,
      fighting: <FightingIcon height={15} width={15} />,
      ghost: <GhostIcon height={15} width={15} />,
      flying: <FlyingIcon height={15} width={15} />,
      fairy: <FairyIcon height={15} width={15} />,
      ice: <IceIcon height={15} width={15} />,
      dragon: <DragonIcon height={15} width={15} />,
      dark: <DarkIcon height={15} width={15} />,
      steel: <SteelIcon height={15} width={15} />,
      default: "",
    };

    return (pokemonTypes as any)[pokemonType] || pokemonTypes.default;
  }

  useEffect(() => {
    (async () => {
      const pokemonResponse = await searchPokemon(pokemonId);
      const pokemonData = pokemonResponse as unknown as ParamsProps;

      setPokemon(pokemonData);
    })();
  }, []);

  return (
    <View
      key={evolution.species.name}
      className="flex-row items-center justify-between w-64 h-24 mb-20 gap-6 ml-0 mt-0 pb-4"
    >
      <View className="w-40 h-36 bg-gray-100 items-center justify-center rounded-2xl ">
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              evolution.species.url.split("/")[6]
            }.png`,
          }}
          className="h-20 w-20"
        />
      </View>

      <View className="items-start justify-between">
        <Text className="text-gray-400 font-normal text-base">
          #{addingPadToString(3, pokemonId)}
        </Text>
        <Text className="text-zinc-800 text-[22px] leading-7 mb-2">
          {capitalizeFirstLetter(evolution.species.name)}
        </Text>
        <View>
          {pokemon?.types.map((type) => (
            <View
              key={type.type.name}
              className="border border-gray-300 rounded-lg flex-row h-9 items-center justify-around w-min p-2 mb-2"
            >
              {returnPokemonTypeIcon(type.type.name)}
              <Text className="ml-2 text-zinc-800 font-medium text-sm text-center">{capitalizeFirstLetter(type.type.name)}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

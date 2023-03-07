import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { PokemonTypes, StatInterface } from "../@types/pokemonProps";
import { server } from "../service/axios";
import { Abilities } from "../@types/pokemonAbilityType";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

// Pokemons Types Icons
import GrassIcon from "../assets/typeIcons/grass.svg";
import FireIcon from "../assets/typeIcons/fire.svg";
import WaterIcon from "../assets/typeIcons/water.svg";
import BugIcon from "../assets/typeIcons/bug.svg";
import NormalIcon from "../assets/typeIcons/normal.svg";
import PoisonIcon from "../assets/typeIcons/poison.svg";
import ElectricIcon from "../assets/typeIcons/electric.svg";
import GroundIcon from "../assets/typeIcons/ground.svg";
import RockIcon from "../assets/typeIcons/rock.svg";
import PsychicIcon from "../assets/typeIcons/psychic.svg";
import FightingIcon from "../assets/typeIcons/fighting.svg";
import GhostIcon from "../assets/typeIcons/ghost.svg";
import FlyingIcon from "../assets/typeIcons/flying.svg";
import FairyIcon from "../assets/typeIcons/fairy.svg";
import IceIcon from "../assets/typeIcons/ice.svg";
import DragonIcon from "../assets/typeIcons/dragon.svg";
import DarkIcon from "../assets/typeIcons/dark.svg";
import SteelIcon from "../assets/typeIcons/steel.svg";

interface ParamsProps {
  id: number;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  abilities: Abilities[];
  stats: StatInterface[];
  types: PokemonTypes[];
  sprite: string;
}

export function PokemonAboutScreen() {
  const [pokemonDescription, setPokemonDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const pokemon = route.params as ParamsProps;
  const uniquePokemonAbilities = [...new Set(pokemon.abilities)];

  function returnPokemonTypeIcon(pokemonType: string) {
    const pokemonTypes = {
      grass: <GrassIcon height={30} width={30} />,
      fire: <FireIcon height={30} width={30} />,
      water: <WaterIcon height={30} width={30} />,
      bug: <BugIcon height={30} width={30} />,
      normal: <NormalIcon height={30} width={30} />,
      poison: <PoisonIcon height={30} width={30} />,
      electric: <ElectricIcon height={30} width={30} />,
      ground: <GroundIcon height={30} width={30} />,
      rock: <RockIcon height={30} width={30} />,
      psychic: <PsychicIcon height={30} width={30} />,
      fighting: <FightingIcon height={30} width={30} />,
      ghost: <GhostIcon height={30} width={30} />,
      flying: <FlyingIcon height={30} width={30} />,
      fairy: <FairyIcon height={30} width={30} />,
      ice: <IceIcon height={30} width={30} />,
      dragon: <DragonIcon height={30} width={30} />,
      dark: <DarkIcon height={30} width={30} />,
      steel: <SteelIcon height={30} width={30} />,
      default: "",
    };

    return (pokemonTypes as any)[pokemonType] || pokemonTypes.default;
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const getPokemonDescription = await server.get(
          `/pokemon-species/${pokemon.id}`
        );
        const description =
          getPokemonDescription.data?.flavor_text_entries?.filter(
            (p: any) => p.language.name === "en"
          );

        setPokemonDescription(description[0].flavor_text);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View className="pt-14">
        <ActivityIndicator size="large" color="#6b7280" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white items-center gap-5">
      <Text className=" text-base font-normal text-gray-600 mt-3  mb-6 p-6 leading-6 ">
        {pokemonDescription.replace(/[\n\f]/g, " ")}
      </Text>

      <View className="flex-row gap-6 items-center justify-center bg-gray-100 rounded-2xl w-80 h-28 p-6">
        <View className="flex-1 items-center justify-center">
          <Text className="text-zinc-800 text-base text-center tracking-[0.15px] font-medium">
            {(pokemon.weight / 10).toFixed(2).replace(".", ",")} kg
          </Text>
          <Text className="text-gray-400 text-xs font-normal leading-4 tracking-wider ">
            Weight
          </Text>
        </View>

        <View className=" bg-gray-200 h-[150%] w-[2px] items-center justify-center my-7 rounded-lg" />

        <View className="flex-1 items-center justify-center">
          <Text className="text-zinc-800 text-base text-center tracking-[0.15px] font-medium">
            {(pokemon.height * 0.1).toFixed(2).replace(".", ",")} m
          </Text>
          <Text className="text-gray-400 text-xs font-normal leading-4 tracking-wider mt-1">
            Height
          </Text>
        </View>
      </View>

      <View className="flex-row gap-6 items-center justify-center bg-gray-100 rounded-2xl w-80 h-28 p-6">
        <View className="flex-1 items-center justify-center">
          <View className="flex-row justify-center items-center gap-2">
            {pokemon.types.map((pokemonType) => (
              <View key={pokemonType.type.name}>
                {returnPokemonTypeIcon(pokemonType.type.name)}
              </View>
            ))}
          </View>

          <Text className="text-gray-400 text-xs font-normal leading-4 tracking-wider mt-1">
            Category
          </Text>
        </View>

        <View className=" bg-gray-200 h-[150%] w-[2px] items-center justify-center my-7 rounded-lg" />

        <View className="flex-1 items-center justify-center">
          {uniquePokemonAbilities.map((ability: any) => (
            <Text
              key={ability.ability.name}
              className="text-zinc-800 text-base text-center tracking-[0.15px] font-medium"
            >
              {capitalizeFirstLetter(ability.ability.name)}
            </Text>
          ))}
          <Text className="text-gray-400 text-xs font-normal leading-4 tracking-wider mt-1">
            Ability
          </Text>
        </View>
      </View>
    </View>
  );
}

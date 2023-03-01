import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import clsx from "clsx";

interface BaseType {
  name: string;
  url: string;
}

interface StatInterface {
  base_stat: number;
  effort: number;
  stat: BaseType;
}

interface PokemonTypes {
  slot: number;
  type: BaseType;
}

interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    baseExperience: number;
    stats: StatInterface[];
    types: PokemonTypes[];
    sprite: string;
  };
}

export function PokemonCard({ pokemon }: PokemonProps) {
  const pokemonName =
    pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1);
  const pokemonFirsType = pokemon.types[0].type.name;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx(
        "w-[170px] h-[100px] items-center justify-center rounded-lg space-x-2  mx-3 my-3",
        {
          "bg-[#38BF4B]": pokemonFirsType === "grass",
          "bg-[#FF9741]": pokemonFirsType === "fire",
          "bg-[#3692DC]": pokemonFirsType === "water",
          "bg-[#83C300]": pokemonFirsType === "bug",
          "bg-[#7e7777]": pokemonFirsType === "normal",
          "bg-[#a040a0]": pokemonFirsType === "poison",
          "bg-[#eddc24]": pokemonFirsType === "electric",
          "bg-[#484747]": pokemonFirsType === "ground",
          "bg-[#b6b6b6]": pokemonFirsType === "rock",
          "bg-[#ee99ac]": pokemonFirsType === "psychic",
          "bg-[#b09fa1]": pokemonFirsType === "fighting",
          "bg-[#6f698c]": pokemonFirsType === "ghost",
          "bg-[#f1f0f6]": pokemonFirsType === "flying",
          "bg-[#e2a9df]": pokemonFirsType === "fairy",
          "bg-[#0ed1f3]": pokemonFirsType === "ice",
          "bg-[#ee5439]": pokemonFirsType === "dragon",
          "bg-[#271111]": pokemonFirsType === "dark",
          "bg-[#596570]": pokemonFirsType === "steal",
        }
      )}
    >
      <View className="flex-row justify-between items-center mx-3 mt-3">
        <Text className="font-semibold text-white text-base flex-1">
          {pokemonName}
        </Text>
        <Text className="font-semibold text-white text-base">
          #{String(pokemon.id).padStart(3, "0")}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          {pokemon.types.map((pokemonType: any, index: number) => (
            <View key={index}>
              <Text className="text-white">
                {pokemonType.type.name.charAt(0).toUpperCase() +
                  pokemonType.type.name?.slice(1)}
              </Text>
            </View>
          ))}
        </View>
        <ImageBackground
          source={require("../../../assets/pokeball.png")}
          resizeMode="contain"
          className="items-center justify-center w-20 h-20"
        >
          <Image
            source={{
              uri: pokemon.sprite,
            }}
            className="h-14 w-14 mr-1"
          />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

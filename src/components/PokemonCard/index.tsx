import clsx from "clsx";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { addingPadToString } from "../../utils/addingPadToString";
import { ParamsProps } from "../../@types/pokemonParamsProps";

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

interface PokemonCardProps {
  pokemon: ParamsProps | any;
  onPress?: (pokemon: any) => void | (() => void);
}

export function PokemonCard(
  this: any,
  { pokemon, onPress, ...rest }: PokemonCardProps
) {
  const pokemonFirstType = pokemon?.types[0].type.name;

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

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      onPress={onPress?.bind(this, pokemon)}
      className={clsx(
        "w-[170px] h-[115px] items-center justify-center rounded-lg space-x-2  mx-3 my-3",
        {
          "bg-pokemon-type-grass": pokemonFirstType === "grass",
          "bg-pokemon-type-fire": pokemonFirstType === "fire",
          "bg-pokemon-type-water": pokemonFirstType === "water",
          "bg-pokemon-type-bug": pokemonFirstType === "bug",
          "bg-pokemon-type-normal": pokemonFirstType === "normal",
          "bg-pokemon-type-poison": pokemonFirstType === "poison",
          "bg-pokemon-type-electric": pokemonFirstType === "electric",
          "bg-pokemon-type-ground": pokemonFirstType === "ground",
          "bg-pokemon-type-rock": pokemonFirstType === "rock",
          "bg-pokemon-type-psychic": pokemonFirstType === "psychic",
          "bg-pokemon-type-fighting": pokemonFirstType === "fighting",
          "bg-pokemon-type-ghost": pokemonFirstType === "ghost",
          "bg-pokemon-type-flying": pokemonFirstType === "flying",
          "bg-pokemon-type-fairy": pokemonFirstType === "fairy",
          "bg-pokemon-type-ice": pokemonFirstType === "ice",
          "bg-pokemon-type-dragon": pokemonFirstType === "dragon",
          "bg-pokemon-type-dark": pokemonFirstType === "dark",
          "bg-pokemon-type-steel": pokemonFirstType === "steel",
        }
      )}
    >
      <View className="flex-row justify-between items-center mx-3 mt-3">
        <Text
          className="font-semibold text-white text-base flex-1"
          numberOfLines={1}
        >
          {capitalizeFirstLetter(pokemon?.name)}
        </Text>
        <Text className="font-semibold text-white text-base">
          #{addingPadToString(3, pokemon?.id)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between ">
        <View className="flex-1 gap-1">
          {pokemon?.types.map((pokemonType: any) => (
            <View
              key={pokemonType?.type.name}
              className="flex-row items-center justify-start  gap-2 bg-[#28314133] rounded-3xl"
            >
              <View className="flex-row items-center my-1">
                {returnPokemonTypeIcon(pokemonType?.type.name)}
                <Text className="text-white ml-1 text-center">
                  {capitalizeFirstLetter(pokemonType?.type.name)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <ImageBackground
          source={require("../../assets/pokeball.png")}
          resizeMode="contain"
          className="items-center justify-center w-20 h-20"
        >
          <Image
            source={{
              uri: pokemon?.sprite,
            }}
            className="h-14 w-14 mr-1"
          />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

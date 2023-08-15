// Pokemons Types Icons
import GrassIcon from '../assets/typeIcons/grass.svg';
import FireIcon from '../assets/typeIcons/fire.svg';
import WaterIcon from '../assets/typeIcons/water.svg';
import BugIcon from '../assets/typeIcons/bug.svg';
import NormalIcon from '../assets/typeIcons/normal.svg';
import PoisonIcon from '../assets/typeIcons/poison.svg';
import ElectricIcon from '../assets/typeIcons/electric.svg';
import GroundIcon from '../assets/typeIcons/ground.svg';
import RockIcon from '../assets/typeIcons/rock.svg';
import PsychicIcon from '../assets/typeIcons/psychic.svg';
import FightingIcon from '../assets/typeIcons/fighting.svg';
import GhostIcon from '../assets/typeIcons/ghost.svg';
import FlyingIcon from '../assets/typeIcons/flying.svg';
import FairyIcon from '../assets/typeIcons/fairy.svg';
import IceIcon from '../assets/typeIcons/ice.svg';
import DragonIcon from '../assets/typeIcons/dragon.svg';
import DarkIcon from '../assets/typeIcons/dark.svg';
import SteelIcon from '../assets/typeIcons/steel.svg';

export function returnPokemonTypeIcon(pokemonType: string) {
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
    default: '',
  };

  return (pokemonTypes as any)[pokemonType] || pokemonTypes.default;
}

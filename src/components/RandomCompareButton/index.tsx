import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ParamsProps } from "../../@types/pokemonParamsProps";
import { searchPokemon } from "../../service/axios";

//Images
import DiceSVG from "../../assets/dice.svg";

interface IRandomCompareButton {
  setFirstPokemon: React.Dispatch<React.SetStateAction<ParamsProps | null>>;
  setSecondPokemon: React.Dispatch<React.SetStateAction<ParamsProps | null>>;
}

export function RandomCompareButton({
  setFirstPokemon,
  setSecondPokemon,
}: IRandomCompareButton) {
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleRandomSetPokemons() {
    const minValue = 1;
    const maxValue = 1008;

    let firstRandomNumber = (
      Math.random() * (maxValue - minValue) +
      minValue
    ).toFixed();

    let secondRandomNumber = (
      Math.random() * (maxValue - minValue) +
      minValue
    ).toFixed();

    while (firstRandomNumber === secondRandomNumber) {
      firstRandomNumber = (
        Math.random() * (maxValue - minValue) +
        minValue
      ).toFixed();
    }

    setIsDisabled(true);

    const firstPromise = (await searchPokemon(firstRandomNumber)) as any;
    const secondPromise = (await searchPokemon(secondRandomNumber)) as any;

    Promise.all([firstPromise, secondPromise])
      .then(([firstPokemon, secondPokemon]) => {
        setFirstPokemon({
          ...firstPokemon,
          sprite: firstPokemon.sprites?.other["official-artwork"].front_default,
        });
        setSecondPokemon({
          ...secondPokemon,
          sprite:
            secondPokemon.sprites?.other["official-artwork"].front_default,
        });
        setIsDisabled(false);
      })
      .catch((error) => {
        setIsDisabled(false);
        console.log(error);
      });
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleRandomSetPokemons}
      className="-my-12 bg-gray-100 h-20 w-20 items-center justify-center rounded-full z-10"
      disabled={isDisabled}
    >
      <DiceSVG height={50} width={50} />
    </TouchableOpacity>
  );
}

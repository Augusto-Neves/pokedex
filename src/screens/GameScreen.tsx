import * as Animatable from "react-native-animatable";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { server } from "../service/axios";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { shuffleArray } from "../utils/shuffleArray";
import RedefineSVG from "../assets/redefine.svg";
import WinImageSVG from "../assets/winImage.svg";

interface IPokemon {
  name: string;
  sprite: string;
}

export function GameScreen() {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    (async () => {
      const minValue = 1;
      const maxValue = 1008;

      const randomPokemonId = (
        Math.random() * (maxValue - minValue) +
        minValue
      ).toFixed();

      setIsLoading(true);

      const pokemonResponse = await server.get(`pokemon/${randomPokemonId}`);
      const pokemonOptionsResponse = await server.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${randomPokemonId}`
      );

      Promise.all([pokemonResponse, pokemonOptionsResponse])
        .then(([pokemonResponse, pokemonOptionsResponse]) => {
          const { name, sprites } = pokemonResponse.data;
          setPokemon({
            name,
            sprite: sprites?.other["official-artwork"].front_default,
          });

          const { results } = pokemonOptionsResponse.data;
          const optionsName = results
            .map((result: any) => result.name)
            .slice(0, 2);
          const arrayToBeShuffled = new Set([...optionsName, name]);
          console.log(arrayToBeShuffled);

          const shuffledOptions = shuffleArray([...arrayToBeShuffled]);

          setOptions(shuffledOptions);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    })();
  }, [resetGame]);

  async function handleOptionPres(option: string) {
    setShowAnswer(true);
    setAnswerIsCorrect(option === pokemon?.name);
    setSelectedOption(option);
  }

  async function restartGame() {
    setResetGame(!resetGame);
    setShowAnswer(false);
    setAnswerIsCorrect(false);
    setPokemon(null);
  }

  return (
    <>
      <SafeAreaView>
        <View className="py-5 px-6">
          <Header title="Who's that Pokémon?" />
        </View>
      </SafeAreaView>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6b7280" className="flex-1" />
      ) : (
        <>
          {pokemon && (
            <Animatable.View
              className="flex-1 items-center justify-evenly mt-4"
              animation="fadeIn"
            >
              <View className="items-center justify-center">
                {!answerIsCorrect && showAnswer && (
                  <Text className="-mt-11 mb-5 text-lg font-medium text-zinc-800 z-10">
                    Try Again
                  </Text>
                )}
                {answerIsCorrect && (
                  <Text className="-mt-11 mb-5 text-lg font-medium text-zinc-800 z-10">
                    Correct Answer!
                  </Text>
                )}
                <Image
                  source={{ uri: pokemon.sprite }}
                  className="w-56 h-56 mb-9 z-10"
                  style={!showAnswer && { tintColor: "#000000" }}
                />
                {answerIsCorrect && (
                  <>
                    <Animatable.View
                      className="absolute -top-4"
                      animation="zoomIn"
                      duration={1500}
                    >
                      <WinImageSVG className="w-full h-full opacity-75" />
                    </Animatable.View>
                  </>
                )}
              </View>

              <View>
                {options.map((option) => (
                  <TouchableOpacity
                    onPress={() => handleOptionPres(option)}
                    key={option}
                    activeOpacity={0.5}
                    className={clsx(
                      "border border-gray-200 w-72 h-11 rounded-2xl py-3 mb-4 items-center",
                      {
                        "bg-pokemon-type-electric":
                          option === pokemon.name && showAnswer,
                        "border-zinc-800": selectedOption === option,
                      }
                    )}
                    disabled={showAnswer}
                  >
                    <Text className="text-center text-sm font-medium text-zinc-800">
                      {capitalizeFirstLetter(option)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {showAnswer && (
                <TouchableOpacity
                  onPress={restartGame}
                  className="flex-row gap-3 justify-between items-center"
                >
                  <RedefineSVG />
                  <Text>Again</Text>
                </TouchableOpacity>
              )}
            </Animatable.View>
          )}
        </>
      )}
    </>
  );
}

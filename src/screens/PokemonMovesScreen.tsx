import { useRoute } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { ParamsProps } from "../@types/pokemonParamsProps";
import { MoveRow } from "../components/MoveRow";

export function PokemonMovesScreen() {
  const route = useRoute();
  const pokemon = route.params as ParamsProps;
  const orderedMoves = [...pokemon.moves].sort((a, b) =>
    a.move.name.localeCompare(b.move.name)
  );

  return (
    <ScrollView className="px-10 flex-1" nestedScrollEnabled>
      <View className="pb-28">
        {orderedMoves.map((data) => (
          <MoveRow move={data.move.name} key={data.move.name} />
        ))}
      </View>
    </ScrollView>
  );
}

import { View, Text } from "react-native";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface MoveRowProps {
  move: string;
}

export function MoveRow({ move }: MoveRowProps) {
  return (
    <View
      key={move}
      className="border-b-[1px] border-gray-400 py-8 tracking-[0.5px]"
    >
      <Text className="text-zinc-800 font-normal text-base">
        {capitalizeFirstLetter(move)}
      </Text>
    </View>
  );
}

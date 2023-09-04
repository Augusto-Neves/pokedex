import { Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { FilterComponent } from '../FilterComponent';
import { IHandles } from 'react-native-modalize/lib/options';
import { usePokemon } from '../../hooks/usePokemons';

const data = [
  { label: 'A-Z', value: '1' },
  { label: 'Number', value: '2' },
];

interface IFilterModal {
  filterRef: React.RefObject<IHandles>;
}

export function FilterModal({ filterRef }: IFilterModal) {
  const { pokemonsGenerations, pokemonsTypes } = usePokemon();

  return (
    <Portal>
      <Modalize
        ref={filterRef}
        modalTopOffset={80}
        modalStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        FooterComponent={
          <TouchableOpacity className="items-center justify-center h-11 w-96 rounded-2xl bg-yellow-400 mb-16 py-3">
            <Text>Apply</Text>
          </TouchableOpacity>
        }
      >
        <Text className="text-2xl ml-6 mt-8 mb-8">Filters</Text>

        {/* Generations */}
        <FilterComponent items={pokemonsGenerations} title="Generations" />

        {/* Types */}
        <FilterComponent items={pokemonsTypes} title="Types" hasIcon />

        {/* Strong */}
        <FilterComponent items={pokemonsTypes} title="Strong" hasIcon />

        {/* Weakness */}
        <FilterComponent items={pokemonsTypes} title="Weakness" hasIcon />

        {/* Order */}
        <View className="mx-6 mb-6">
          <Text className="text-sm font-medium mb-4">Order</Text>
          <View className="border border-gray-200 rounded-2xl px-4 py-3">
            <Dropdown
              data={data}
              labelField="label"
              valueField="value"
              onChange={(item) => console.log(item.label)}
              containerStyle={{
                marginHorizontal: -16,
                borderTopWidth: 0,
                borderTopColor: 'none',
              }}
            />
          </View>
        </View>
      </Modalize>
    </Portal>
  );
}

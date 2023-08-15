import clsx from 'clsx';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { returnPokemonTypeIcon } from '../../utils/returnPokemonTypeIcon';

interface IFilterComponent {
  title: string;
  hasIcon?: boolean;
  items: any[];
}

export function FilterComponent({
  title,
  hasIcon = false,
  items,
}: IFilterComponent) {
  const [selectedItem, setSelectedItem] = useState('');

  function handleSelectedItem(item: any) {
    if (selectedItem === item) {
      setSelectedItem('');
    } else {
      setSelectedItem(item);
    }
  }

  return (
    <View className="mx-6 mb-6">
      <Text className="text-sm font-medium mb-4">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-3"
      >
        {items?.map((item) => {
          return (
            <TouchableOpacity
              className={clsx(
                'flex-row justify-center items-center p-2 rounded-lg border border-gray-200',
                {
                  'w-24': hasIcon,
                  'bg-gray-100': selectedItem === item,
                }
              )}
              onPress={() => handleSelectedItem(item)}
              key={item}
            >
              {hasIcon && returnPokemonTypeIcon(item.toLowerCase())}
              <Text className="text-sm font-medium ml-2">
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

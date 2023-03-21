import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SetValue<T> = (value: T | ((val: T) => T)) => void;
type UseAsyncStorage<T> = [T, SetValue<T>];

export function useAsyncStorage<T>(
  key: string,
  initialValue: T
): UseAsyncStorage<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      }
    };
    fetchData();
  }, [key]);

  const setValue: SetValue<T> = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}

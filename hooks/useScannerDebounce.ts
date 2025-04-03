// <your-project>/hooks/useScannerDebounce.ts
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useCallback, useRef } from "react";

export const useScannerDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const debounce = useCallback(
    // debounce function
    (
        func: (text: string) => void,
        delay: number // callback argument
      ) =>
      (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
          func(text);
        }, delay);
      },
    []
  );
  return {
    debounce,
  };
};

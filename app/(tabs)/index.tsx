import { useRef } from "react"; // import useRef from react
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useScannerDebounce } from "@/hooks/useScannerDebounce";

export default function HomeScreen() {
  const hiddenInputRef = useRef<TextInput>(null); // Reference to the hidden input

  const { debounce } = useScannerDebounce(); // Debounce hook init

  const onBlur = () => hiddenInputRef.current?.focus(); // Set input focussed function

  // feed the debounce function with callback and delay
  const onChange = debounce((text: string) => {
    // Handle the scanned barcode here
    console.log("text:", text);

    hiddenInputRef.current?.clear(); // Clear the input after processing for the next scan
  }, 300);

  return (
    <View style={styles.container}>
      <Text>Scanner page</Text>

      <TextInput
        ref={hiddenInputRef} // Set reference to the hidden input
        autoFocus // Automatically makes the TextInput focussed on mount
        showSoftInputOnFocus={false} // Hide the keyboard
        onChange={onChange} // Handle a scanned text
        onBlur={onBlur} // Keep the TextInput focussed
        style={styles.hiddenInput} // Apply styles to the TextInput
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  hiddenInput: {
    // Styles for the TextInput
    opacity: 0,
    visibility: "hidden",
  },
});

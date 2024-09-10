import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { Container } from "./styles";

interface AddButtonProps {
  onPress: () => void;
}

export function AddButton({ onPress }: AddButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <AntDesign name="plus" size={24} color="white" />
      </Container>
    </TouchableOpacity>
  );
}

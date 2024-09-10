import { TouchableOpacity } from "react-native";
import { AppText } from "../text";
import { ButtonWrapper } from "./styles";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export function AppButton({ text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonWrapper>
        <AppText color={"white"}>{text}</AppText>
      </ButtonWrapper>
    </TouchableOpacity>
  );
}

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { AppText } from "../text";
import { BackButton, Container } from "./styles";

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  align?: "center" | "left";
  onPressBackButton?: () => void;
}

export function AppHeader({
  title,
  showBackButton = false,
  align = "center",
  onPressBackButton,
}: AppHeaderProps) {
  const navigator = useNavigation();

  return (
    <Container align={align}>
      {showBackButton && (
        <BackButton onPress={onPressBackButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </BackButton>
      )}
      <AppText size="large" fontType="bold" color="white">
        {title}
      </AppText>
    </Container>
  );
}

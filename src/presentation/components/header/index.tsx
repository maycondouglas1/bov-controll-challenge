import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { AppText } from "../text";
import { BackButton, Container } from "./styles";

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  align?: "center" | "left";
}

export function AppHeader({
  title,
  showBackButton = false,
  align = "center",
}: AppHeaderProps) {
  const navigator = useNavigation();

  return (
    <Container align={align}>
      {showBackButton && (
        <BackButton onPress={() => navigator.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </BackButton>
      )}
      <AppText size="large" fontType="bold" color="white">
        {title}
      </AppText>
    </Container>
  );
}

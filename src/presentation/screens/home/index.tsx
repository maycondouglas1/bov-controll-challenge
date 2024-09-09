import { ContainerScreen } from "@/presentation/components/container-screen";
import { AppHeader } from "@/presentation/components/header";
import { Text } from "react-native";

export default function Home() {
  return (
    <ContainerScreen>
      <AppHeader title="Checklists" />
      <Text>Home</Text>
    </ContainerScreen>
  );
}

import { Platform } from "react-native";
import { Container, ContainerForm } from "./styles";

interface ContainerScreenProps {
  hasForm?: boolean;
  children: React.ReactNode;
}

export function ContainerScreen({ children, hasForm }: ContainerScreenProps) {
  if (hasForm) {
    return (
      <ContainerForm
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        {children}
      </ContainerForm>
    );
  }

  return <Container>{children}</Container>;
}

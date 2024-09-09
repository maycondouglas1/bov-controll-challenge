import React from "react";
import { AppText } from "../text";
import { Container, Content, Gif } from "./styles";

export function Loading() {
  return (
    <Container>
      <Content>
        <Gif source={require("@/presentation/assets/gifs/loading.gif")} />
        <AppText>Aguarde...</AppText>
      </Content>
    </Container>
  );
}

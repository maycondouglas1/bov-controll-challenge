import { Checklist } from "@/domain/entities/checklist.entity";
import { generateDateString } from "@/utils/generate-date-string";
import React from "react";
import { AppText } from "../text";
import { Container } from "./styles";

interface ChecklistItemProps {
  item: Checklist;
}

const renderItemInfo = (title: string, content: string) => (
  <>
    <AppText size="medium" fontType="bold" color="primary">
      {title}:
    </AppText>
    <AppText size="medium" fontType="regular" color="black">
      {content}
    </AppText>
  </>
);

export function ChecklistItem({ item }: ChecklistItemProps) {
  return (
    <Container>
      {renderItemInfo("Fazenda", item.from.name)}
      {renderItemInfo("Fazendeiro", item.farmer.name)}
      {renderItemInfo("Cidade", item.farmer.city)}
      {renderItemInfo("Data de criação", generateDateString(item.created_at))}
    </Container>
  );
}

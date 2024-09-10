import { Checklist } from "@/domain/entities/checklist.entity";
import { RootStackParamList } from "@/presentation/navigation/main-navigation";
import { generateDateString } from "@/utils/generate-date-string";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AppText } from "../text";
import { ButtonsWrapper, Container } from "./styles";

interface ChecklistItemProps {
  item: Checklist;
  onDelete: () => void;
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

export function ChecklistItem({ item, onDelete }: ChecklistItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigateToChecklistDetails = () => {
    navigation.navigate("ChecklistDetails", { checklistId: item._id });
  };

  return (
    <Container>
      {renderItemInfo("Fazenda", item.from.name)}
      {renderItemInfo("Fazendeiro", item.farmer.name)}
      {renderItemInfo("Cidade", item.farmer.city)}
      {renderItemInfo("Data de criação", generateDateString(item.created_at))}

      <ButtonsWrapper>
        <TouchableOpacity onPress={handleNavigateToChecklistDetails}>
          <AppText size="medium" fontType="bold" color="primary">
            Ver detalhes
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <AppText size="medium" fontType="bold" color="red">
            Deletar
          </AppText>
        </TouchableOpacity>
      </ButtonsWrapper>
    </Container>
  );
}

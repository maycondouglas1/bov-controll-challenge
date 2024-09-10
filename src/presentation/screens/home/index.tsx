import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { useChecklists } from "@/infra/hooks/use-checklists";
import { useDeleteChecklist } from "@/infra/hooks/use-delete-checklist";
import { AddButton } from "@/presentation/components/add-button";
import { ChecklistItem } from "@/presentation/components/checklist-item";
import { ContainerScreen } from "@/presentation/components/container-screen";
import { AppHeader } from "@/presentation/components/header";
import { Loading } from "@/presentation/components/loading";
import { AppText } from "@/presentation/components/text";
import { ChecklistContext } from "@/presentation/context/checklist-context";
import { NavigationProp } from "@/presentation/navigation/main-navigation";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { AddButtonWrapper, ErrorWrapper, Separator } from "./styles";

export default function Home({ httpClient }: { httpClient: HttpClient }) {
  const {
    data: checklists,
    isLoading,
    error,
    refetch,
  } = useChecklists(httpClient);
  const { mutate: deleteChecklist } = useDeleteChecklist(httpClient);
  const { isConnected } = useNetInfo();
  const { syncChecklists } = useContext(ChecklistContext);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const toast = useToast();
  const navigation = useNavigation<NavigationProp>();

  const handleDeleteChecklist = (checklistId: string) => {
    Alert.alert(
      "Deletar checklist",
      "Tem certeza que deseja deletar este checklist?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            setLoadingDelete(true);
            deleteChecklist(checklistId, {
              onSuccess: () => {
                setLoadingDelete(false);
                toast.show("Checklist deletado com sucesso", {
                  type: "success",
                  placement: "top",
                  duration: 2000,
                  animationType: "zoom-in",
                });
                refetch();
              },

              onError: () => {
                setLoadingDelete(false);
                toast.show("Erro ao deletar checklist", {
                  type: "error",
                  placement: "top",
                  duration: 2000,
                  animationType: "zoom-in",
                });
              },
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderChecklistItem = ({ item }: { item: Checklist }) => (
    <ChecklistItem
      item={item}
      onDelete={() => handleDeleteChecklist(item._id)}
    />
  );

  const renderListEmpty = () => {
    return <AppText size="small">Nenhum checklist encontrado</AppText>;
  };

  const renderList = () => {
    if (isLoading || loadingDelete) {
      return <Loading />;
    }

    if (error) {
      return (
        <ErrorWrapper>
          <AppText size="small">Erro ao carregar os checklists</AppText>;
        </ErrorWrapper>
      );
    }

    return (
      <FlatList
        data={checklists}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={renderChecklistItem}
        keyExtractor={(item: Checklist) => item._id.toString()}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        ListEmptyComponent={renderListEmpty}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const handleAddChecklist = () => {
    navigation.navigate("CreateChecklist");
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, [navigation]);

  useEffect(() => {
    if (isConnected) {
      syncChecklists();
    }
  }, [isConnected]);

  return (
    <ContainerScreen>
      <AppHeader title="Checklists" align="center" />
      {renderList()}
      <AddButtonWrapper>
        <AddButton onPress={handleAddChecklist} />
      </AddButtonWrapper>
    </ContainerScreen>
  );
}

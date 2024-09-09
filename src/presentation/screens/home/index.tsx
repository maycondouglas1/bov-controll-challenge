import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { useChecklists } from "@/infra/hooks/use-checklists";
import { ChecklistItem } from "@/presentation/components/checklist-item";
import { ContainerScreen } from "@/presentation/components/container-screen";
import { AppHeader } from "@/presentation/components/header";
import { Loading } from "@/presentation/components/loading";
import { AppText } from "@/presentation/components/text";
import { DataList, Separator } from "./styles";

export default function Home({ httpClient }: { httpClient: HttpClient }) {
  const { data: checklists, isLoading, error } = useChecklists(httpClient);

  const renderChecklistItem = ({ item }: { item: Checklist }) => (
    <ChecklistItem item={item} />
  );

  const renderListEmpty = () => {
    return <AppText size="small">Nenhum checklist encontrado</AppText>;
  };

  const renderList = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <AppText size="small">Erro ao carregar os checklists</AppText>;
    }

    return (
      <DataList
        data={checklists}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={renderChecklistItem}
        keyExtractor={(item: Checklist) => item._id.toString()}
        scrollEventThrottle={16}
        ListEmptyComponent={renderListEmpty}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <ContainerScreen>
      <AppHeader title="Checklists" align="center" />
      {renderList()}
    </ContainerScreen>
  );
}

import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { useChecklistDetails } from "@/infra/hooks/use-checklist-details";
import { useUpdateChecklist } from "@/infra/hooks/use-update-checklist";
import { AppButton } from "@/presentation/components/button";
import { ContainerScreen } from "@/presentation/components/container-screen";
import { AppDropdown } from "@/presentation/components/dropdown";
import { AppHeader } from "@/presentation/components/header";
import { AppInput } from "@/presentation/components/input";
import { Loading } from "@/presentation/components/loading";
import { RootStackParamList } from "@/presentation/navigation/main-navigation";
import { checklistSchema } from "@/validation/checklist-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { FormWrapper } from "./styles";

interface ChecklistDetailsProps {
  httpClient: HttpClient;
}

export function ChecklistDetails({ httpClient }: ChecklistDetailsProps) {
  const {
    params: { checklistId },
  } = useRoute<RouteProp<RootStackParamList, "ChecklistDetails">>();
  const navigator = useNavigation();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: checklist, isLoading } = useChecklistDetails(
    httpClient,
    checklistId
  );
  const { mutate: updateChecklist } = useUpdateChecklist(httpClient);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(checklistSchema),
    defaultValues: checklist || {},
  });

  const handleGoBack = () => {
    navigator.goBack();
  };

  const onSubmit = (formData: Checklist) => {
    setIsUpdating(true);

    const updatedData = {
      ...formData,
      updated_at: new Date().toISOString(),
      amount_of_milk_produced: Number(formData.amount_of_milk_produced),
      number_of_cows_head: Number(formData.number_of_cows_head),
      _id: checklistId.toString(),
      location: {
        latitude: checklist?.location?.latitude || 0,
        longitude: checklist?.location?.longitude || 0,
      },
    };

    updateChecklist(
      { data: updatedData },
      {
        onSuccess: () => {
          setIsUpdating(false);
          toast.show("Checklist atualizado com sucesso");
          handleGoBack();
        },
        onError: (error) => {
          setIsUpdating(false);
          toast.show("Erro ao atualizar checklist");
        },
      }
    );
  };

  useEffect(() => {
    if (checklist) {
      reset(checklist);
    }
  }, [checklist, reset]);

  if (isLoading || !checklist || isUpdating) {
    return <Loading />;
  }

  return (
    <ContainerScreen>
      <AppHeader
        title="Detalhes do Checklist"
        align="left"
        showBackButton
        onPressBackButton={handleGoBack}
      />
      <ScrollView>
        <FormWrapper>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <AppDropdown
                label="Tipo"
                options={["BPA", "Antibiótico", "BPF"]}
                onSelect={onChange}
                defaultValue={value}
              />
            )}
          />
          <Controller
            control={control}
            name="amount_of_milk_produced"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Quantidade de leite produzido"
                value={value?.toString()}
                onChangeText={onChange}
                error={errors.amount_of_milk_produced?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="farmer.name"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Fazendeiro"
                value={value}
                onChangeText={onChange}
                error={errors.farmer?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="farmer.city"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Cidade do fazendeiro"
                value={value}
                onChangeText={onChange}
                error={errors.farmer?.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="from.name"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Local de origem"
                value={value}
                onChangeText={onChange}
                error={errors.from?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="to.name"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Local de destino"
                value={value}
                onChangeText={onChange}
                error={errors.to?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="number_of_cows_head"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Quantidade de cabeças"
                value={value?.toString()}
                onChangeText={onChange}
                error={errors.number_of_cows_head?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="had_supervision"
            render={({ field: { onChange, value } }) => (
              <AppDropdown
                label="Supervisão"
                options={["Sim", "Não"]}
                onSelect={(selectedValue) => onChange(selectedValue === "Sim")}
                defaultValue={value ? "Sim" : "Não"}
              />
            )}
          />

          <AppButton text="Salvar" onPress={handleSubmit(onSubmit)} />
        </FormWrapper>
      </ScrollView>
    </ContainerScreen>
  );
}

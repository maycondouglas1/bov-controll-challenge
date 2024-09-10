import { HttpClient } from "@/data/protocols/http-client";
import { useCreateChecklist } from "@/infra/hooks/use-create-checklist";
import { AppButton } from "@/presentation/components/button";
import { ContainerScreen } from "@/presentation/components/container-screen";
import { AppDropdown } from "@/presentation/components/dropdown";
import { AppHeader } from "@/presentation/components/header";
import { AppInput } from "@/presentation/components/input";
import { Loading } from "@/presentation/components/loading";
import { checklistSchema } from "@/validation/checklist-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { z } from "zod";
import { FormWrapper } from "./styles";

interface CreateChecklistProps {
  httpClient: HttpClient;
}

type ChecklistFormValues = z.infer<typeof checklistSchema>;

export function CreateChecklist({ httpClient }: CreateChecklistProps) {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useCreateChecklist(httpClient);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      type: "",
      amount_of_milk_produced: "",
      farmer: { name: "", city: "" },
      from: { name: "" },
      to: { name: "" },
      number_of_cows_head: "",
      had_supervision: false,
    },
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onSubmit = (formData: ChecklistFormValues) => {
    setIsLoading(true);

    mutate(
      [
        {
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          amount_of_milk_produced: Number(formData.amount_of_milk_produced),
          number_of_cows_head: Number(formData.number_of_cows_head),
        },
      ],
      {
        onSuccess: () => {
          setIsLoading(false);
          toast.show("Checklist cadastrado com sucesso", {
            type: "success",
            placement: "top",
            duration: 2000,
            animationType: "zoom-in",
          });
          handleGoBack();
        },
        onError: (error) => {
          setIsLoading(false);
          toast.show("Erro ao cadastrar checklist", {
            type: "error",
            placement: "top",
            duration: 2000,
            animationType: "zoom-in",
          });
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContainerScreen>
      <AppHeader
        title="Cadastrar Checklist"
        showBackButton
        align="left"
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
              />
            )}
          />
          <Controller
            control={control}
            name="amount_of_milk_produced"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Quantidade de leite produzido"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                error={errors.amount_of_milk_produced?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="farmer.name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Nome da fazenda"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.farmer?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="farmer.city"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Cidade da fazenda"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.farmer?.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="from.name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Nome do fazendeiro"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.from?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="to.name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Nome do supervisor"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.to?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="number_of_cows_head"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Quantidade de cabeças de gado"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.number_of_cows_head?.message}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="had_supervision"
            render={({ field: { onChange, value } }) => (
              <AppDropdown
                label="Teve supervisão?"
                options={["Sim", "Não"]}
                onSelect={(selectedValue) => onChange(selectedValue === "Sim")}
              />
            )}
          />

          <AppButton text="Cadastrar" onPress={handleSubmit(onSubmit)} />
        </FormWrapper>
      </ScrollView>
    </ContainerScreen>
  );
}

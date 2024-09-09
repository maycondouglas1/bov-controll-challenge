import { schemas } from "@/infra/db/schemas";
import { MainNavigation } from "@/presentation/navigation/main-navigation";
import { DefaultThemeProvider } from "@/presentation/providers/default-theme.provider";
import { QueryClientProvider } from "@/presentation/providers/query-client.provider";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { RealmProvider } from "@realm/react";

export function Main() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RealmProvider schema={schemas}>
      <DefaultThemeProvider>
        <QueryClientProvider>
          <MainNavigation />
        </QueryClientProvider>
      </DefaultThemeProvider>
    </RealmProvider>
  );
}

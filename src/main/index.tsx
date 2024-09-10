import { schemas } from "@/infra/db/schemas";
import { MainNavigation } from "@/presentation/navigation/main-navigation";
import { ChecklistProvider } from "@/presentation/providers/checklist-provider";
import { DefaultThemeProvider } from "@/presentation/providers/default-theme.provider";
import { QueryClientProvider } from "@/presentation/providers/query-client.provider";
import { defaultTheme } from "@/presentation/theme";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { RealmProvider } from "@realm/react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";

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
          <ChecklistProvider>
            <ToastProvider>
              <SafeAreaProvider>
                <SafeAreaView
                  style={{
                    flex: 1,
                    backgroundColor: defaultTheme.colors.primary,
                  }}
                >
                  <StatusBar
                    style="dark"
                    backgroundColor={defaultTheme.colors.primary}
                  />
                  <MainNavigation />
                </SafeAreaView>
              </SafeAreaProvider>
            </ToastProvider>
          </ChecklistProvider>
        </QueryClientProvider>
      </DefaultThemeProvider>
    </RealmProvider>
  );
}

import { ChecklistDetailsFactory } from "@/main/factories/screens/checklist-details";
import { CreateChecklistFactory } from "@/main/factories/screens/create-checklist";
import { HomeFactory } from "@/main/factories/screens/home";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  ChecklistDetails: { checklistId: string };
  CreateChecklist: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeFactory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChecklistDetails"
          component={ChecklistDetailsFactory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateChecklist"
          component={CreateChecklistFactory}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

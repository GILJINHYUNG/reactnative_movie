import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { YELLOW_COLOR } from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => {
	return (
		<TouchableOpacity onPress={() => navigate("Two")}>
			<Text>Go to Two</Text>
		</TouchableOpacity>
	);
};

const ScreenTwo = ({ navigation: { navigate } }) => {
	return (
		<TouchableOpacity onPress={() => navigate("Three")}>
			<Text>Go to Three</Text>
		</TouchableOpacity>
	);
};

const ScreenThree = ({ navigation: { navigate } }) => {
	return (
		<TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
			<Text>Go to Search</Text>
		</TouchableOpacity>
	);
};

const NativeStack = createNativeStackNavigator();

const Stack = () => (
	<NativeStack.Navigator
		screenOptions={{
			animation: "flip",
			headerBackTitleVisible: false,
			headerTintColor: YELLOW_COLOR,
		}}
	>
		<NativeStack.Screen
			options={{ title: "1" }}
			name="One"
			component={ScreenOne}
		/>
		<NativeStack.Screen name="Two" component={ScreenTwo} />
		<NativeStack.Screen
			name="Three"
			component={ScreenThree}
			options={{ presentation: "modal" }}
		/>
	</NativeStack.Navigator>
);

export default Stack;

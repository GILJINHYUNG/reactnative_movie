import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Tabs = () => {
	const isDark = useColorScheme() === "dark";
	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: isDark ? BLACK_COLOR : "white",
			}}
			screenOptions={{
				tabBarStyle: {
					backgroundColor: isDark ? BLACK_COLOR : "white",
					borderTopColor: isDark ? DARK_GREY : LIGHT_GREY,
				},
				tabBarActiveTintColor: isDark ? YELLOW_COLOR : YELLOW_COLOR,
				tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
				headerStyle: {
					backgroundColor: isDark ? BLACK_COLOR : "white",
				},
				headerTitleStyle: {
					color: isDark ? "white" : BLACK_COLOR,
				},
				tabBarLabelStyle: {
					marginTop: -5,
					fontSize: 10,
					fontWeight: "600",
				},
			}}
		>
			<Tab.Screen
				name="Movies"
				component={Movies}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name={"film-outline"} color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="TV"
				component={TV}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="tv-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name={"search-outline"} color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
export default Tabs;

import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./my-style";

export default function App() {
	const isDark = useColorScheme() === "dark";
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<NavigationContainer>
				<Root />
			</NavigationContainer>
		</ThemeProvider>
	);
}

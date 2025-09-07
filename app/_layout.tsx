import { Stack } from "expo-router";

export default function App() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: 'Home', headerTitle: 'Home' }} />
			<Stack.Screen name="bookdetails/[_id]" options={{ title: 'Book Details', headerTitle: 'Book Details' }} />
		</Stack>
	)
}
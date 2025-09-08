import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { BookDetails } from "../../components/BookDetails";

export default function BookDetailScreen() {
    const { _id } = useLocalSearchParams<{ _id: string }>();
    return (
        <View>
            <BookDetails _id={_id} />
        </View>
    );
}

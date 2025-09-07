import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { useState } from "react";

interface BookListItemProps {
	title: string;
	author: string;
	coverImage: string;
	averageRating: number;
}

export const BookListItem: React.FC<BookListItemProps> = ({
	coverImage,
	title,
	author,
	averageRating,
}: BookListItemProps) => {
	const [loadingImage, setLoadingImage] = useState(false)
	return (
		<View style={styles.bookCardContainer}>
			{loadingImage && <ActivityIndicator size="large" />}
			<Image source={coverImage ? { uri: coverImage } : require('../assets/icon.png')} style={{ width: 80, height: 80 }} height={80} width={80} resizeMode="cover" onLoadStart={() => { setLoadingImage(true) }} onLoadEnd={() => { setLoadingImage(false) }} />
			<View style={styles.textContainer}>
				<Text>{title}</Text>
				<Text>{author}</Text>
				<Text>{averageRating}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bookCardContainer: {
		flexDirection: 'row',
		gap: 15,
		paddingLeft: 10,
		paddingRight: 10
	},
	textContainer: {
		flexDirection: 'column',
		marginBottom: 20,
	}
})
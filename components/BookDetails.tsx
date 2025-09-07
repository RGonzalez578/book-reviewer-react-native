import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import type { Book } from "../types/book";
import { URL } from "../constants";

interface BookDetailsProps {
	_id: string;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ _id }) => {
	const [book, setBook] = useState<Book>({} as Book)

	useEffect(() => {
		async function fetchBookById() {
			try {
				console.log(`${URL}api/books/${_id}`)
				const response = await fetch(`${URL}api/books/${_id}`)
				const data = await response.json()
				setBook(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchBookById()
	}, [])

	return (
		<View>
			<Text>{book?.coverImage}</Text>
			<Text>{book?.title}</Text>
			<Text>{book?.author}</Text>
			<Text>{book?.isbn}</Text>
			<Text>{book?.averageRating}</Text>
		</View>
	)
}
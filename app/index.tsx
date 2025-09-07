import { StatusBar } from "expo-status-bar";
import { URL } from "../constants"
import { StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from "react";
import type { Book } from "../types/book";
import { BookListItem } from "../components/BookListItem";
import { useRouter } from "expo-router";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter()

  const loadBooks = async () => {
    if (!hasMore || loading) return
    setLoading(true);
    try {
      const response = await fetch(`${URL}api/books?page=${page}&limit=10`);
      const data = await response.json();
      setBooks(prevData => [...prevData, ...data]);
      setLoading(false);
      setPage((prevPage: number) => prevPage + 1);

      if (data.length === 0) setHasMore(false);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>Books Catalog</Text>
      <StatusBar style="auto" />
      <FlatList style={styles.bookList}
        data={books}
        renderItem={
          ({ item: book, index }) => {

            return (
              <TouchableOpacity onPress={() => {
                router.navigate({
                  pathname: 'bookdetails/[_id]',
                  params: { _id: book._id }
                })
              }}>
                <BookListItem key={index} author={book.author} title={book.title} coverImage={book.coverImage} averageRating={book.averageRating} />
              </TouchableOpacity>
            )
          }
        }
        keyExtractor={
          (item, index) => `${item._id}-${index}`
        }
        onEndReachedThreshold={0.5}
        onEndReached={loadBooks}
        ListFooterComponent={
          () => {
            if (loading) return <ActivityIndicator size="large" color="#0000ff" />
          }
        } />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    gap: 20
  },
  bookList: {
    width: '100%'
  }
});

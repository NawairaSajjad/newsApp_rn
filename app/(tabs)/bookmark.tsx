
import React from 'react';
import { FlatList, Text, View, Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';


export default function BookmarkScreen() {
  const { bookmarks } = useBookmarks();

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 20, marginLeft: 50 }}>
        Bookmarked News
      </Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.articleContainer}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.source}>{item.source.name}</Text>
              <Text style={styles.date}>{new Date(item.publishedAt).toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ color: 'white', textAlign: 'center' }}>No bookmarks yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  source: {
    fontStyle: 'italic',
    color: 'gray',
  },
  date: {
    color: '#555',
    fontSize: 12,
  },
});




import { useBookmarks } from '../context/BookmarkContext'; 
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

interface Source {
  id: string | null;
  name: string;
}

interface Article {
  source: Source;
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

const url = 'https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=ac34d2edf17f4dc2b202d4b0dfb29aad';

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();
  const { addBookmark } = useBookmarks();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const json = await result.json();
        setArticles(json.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  const handleBookmark = (article: Article) => {
    addBookmark(article);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Article>) => (
    <TouchableOpacity
    onPress={() => router.push({ pathname: '/article/[url]', params: { url: item.url } })}

      style={styles.articleContainer}
    >
      {item.urlToImage ? (
        <Image
          source={{ uri: item.urlToImage.startsWith('http') ? item.urlToImage : 'https:' + item.urlToImage }}
          style={styles.image}
        />
      ) : null}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.source}>{item.source.name}</Text>
        <Text style={styles.date}>{new Date(item.publishedAt).toLocaleString()}</Text>

        <TouchableOpacity onPress={() => handleBookmark(item)} style={styles.bookmarkButton}>
          <Text style={{ color: 'gold' }}>★ Bookmark</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
       <Text style ={ {fontWeight: 'bold',fontSize: 20,color:'white',marginBottom:5, marginLeft:50}}>Previous Updates</Text>
      <Text style ={ {fontSize: 17,color:'white',marginBottom:15, marginLeft:50}}>Catch up on stories you may have missed!!</Text>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ color: 'white' }}>Loading news...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bookmarkButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 12,
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

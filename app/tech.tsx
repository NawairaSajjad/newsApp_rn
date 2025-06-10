import React, { useEffect, useState } from 'react';
import { FlatList, Image, Linking, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const url = 'https://newsapi.org/v2/everything?q=technology&apiKey=ac34d2edf17f4dc2b202d4b0dfb29aad';

export default function TabTwoScreen() {
  const [articles, setArticles] = useState<Article[]>([]);

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

  const renderItem = ({ item }: ListRenderItemInfo<Article>) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.articleContainer}>
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
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Text style ={ {fontWeight: 'bold',fontSize: 20,color:'white',marginBottom:5, marginLeft:50}}>See what's happening in tech world</Text>
      <Text style ={ {fontSize: 17,color:'white',marginBottom:15, marginLeft:50}}>Catch up on stories you may have missed!!</Text>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={<Text style = {{color:'white'}}>Loading news...</Text>}
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


import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/news-logo.png')} style={styles.logo} />
      
      <Text style={styles.title}>About NewsXpress</Text>

      <Text style={styles.text}>
        NewsBenzinga is your go-to app for staying informed with the latest news from around the world. We provide timely, accurate, and engaging news articles across various categories like politics, technology, health, entertainment, and more.
      </Text>

      <Text style={styles.subTitle}>Features:</Text>
      <Text style={styles.text}>• Real-time news updates</Text>
      <Text style={styles.text}>• Customizable categories</Text>
      <Text style={styles.text}>• Bookmark articles to read later</Text>
      <Text style={styles.text}>• Clean and user-friendly interface</Text>

      <Text style={styles.subTitle}>Version:</Text>
      <Text style={styles.text}>1.0.0</Text>

      <Text style={styles.subTitle}>Developed By:</Text>
      <Text style={styles.text}>Nawaira Sajjad / Hafsa Izhar / Amna Jawed</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
});

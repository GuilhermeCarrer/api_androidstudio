import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
 
export default function DetailsScreen({ route }) {
  
  const { movie } = route.params;
 
  return (
<ScrollView style={styles.container}>
<Card style={styles.card}>
<Card.Cover source={{ uri: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400" }} />
<Card.Content style={styles.content}>
<Title style={styles.title}>{movie.Title}</Title>
<Paragraph>Ano de Lançamento: {movie.Year}</Paragraph>
<Paragraph>Tipo: {movie.Type.toUpperCase()}</Paragraph>
<Paragraph>ID (IMDB): {movie.imdbID}</Paragraph>
</Card.Content>
</Card>
</ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  content: {
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
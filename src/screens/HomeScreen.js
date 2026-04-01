import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { ActivityIndicator, Card, Text, Button, useTheme } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); 

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.omdbapi.com/?s=spider%20man&apikey=1cd66749');
      const data = await response.json();
      
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Ops! Erro ao carregar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Buscando heróis...</Text>
      </View>
    );
  }

  const renderMovieCard = ({ item }) => {
    const posterUrl = item.Poster !== "N/A" 
      ? item.Poster 
      : "https://via.placeholder.com/300x400?text=Sem+Foto";

    return (
      <Card style={styles.card} mode="contained">
        <Card.Cover source={{ uri: posterUrl }} style={styles.poster} />
        <Card.Title 
          title={item.Title} 
          subtitle={`Lançado em ${item.Year}`}
          titleStyle={styles.cardTitle}
        />
        <Card.Actions>
          <Button 
            mode="contained-tonal"
            onPress={() => navigation.navigate('Details', { movie: item })}
          >
            Ver detalhes
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={renderMovieCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden', 
  },
  poster: {
    height: 200,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
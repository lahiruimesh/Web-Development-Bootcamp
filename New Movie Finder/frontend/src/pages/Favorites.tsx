import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MediaPlayer from '../components/MediaPlayer';

interface FavoriteItem {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'music';
  posterPath: string;
  description: string;
  streamUrl?: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<FavoriteItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        // Map the data to ensure all required fields are present
        const mappedData = data.map((item: any) => ({
          id: item.externalId || item.id, // Use externalId if available, fallback to id
          title: item.title,
          type: item.type,
          posterPath: item.posterPath,
          description: item.description,
          streamUrl: item.streamUrl
        }));
        setFavorites(mappedData);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        setError('Failed to load favorites. Please try again.');
      }
    };

    fetchFavorites();
  }, []);

  const handlePlay = async (item: FavoriteItem) => {
    try {
      // Get the stream URL if not already present
      if (!item.streamUrl) {
        const response = await fetch(`http://localhost:5000/api/${item.type}/stream/${item.id}`);
        if (!response.ok) {
          throw new Error('Failed to get stream URL');
        }
        const data = await response.json();
        if (!data.streamUrl) {
          throw new Error('No stream URL available');
        }
        // Create a new object with the stream URL to avoid mutating the original item
        setSelectedMedia({
          ...item,
          streamUrl: data.streamUrl
        });
      } else {
        setSelectedMedia(item);
      }
    } catch (error) {
      console.error('Play error:', error);
      setError('Failed to start playback. Please try again.');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Favorites
        </Typography>
        <Grid container spacing={3}>
          {favorites.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.posterPath}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Type: {item.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2,
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Button
                    startIcon={<PlayArrowIcon />}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handlePlay(item)}
                  >
                    {item.type === 'music' ? 'Listen' : 'Watch'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {selectedMedia && (
        <MediaPlayer
          open={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          mediaType={selectedMedia.type}
          mediaId={selectedMedia.id}
          title={selectedMedia.title}
          streamUrl={selectedMedia.streamUrl || ''}
        />
      )}
    </Container>
  );
};

export default Favorites; 
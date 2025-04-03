import React, { useState } from 'react';
import {
  Container,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MediaPlayer from '../components/MediaPlayer';

type MediaType = 'movie' | 'tv' | 'music';

interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'music';
  posterPath: string;
  description: string;
  streamUrl?: string;
}

const Search = () => {
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<SearchResult | null>(null);

  const handleMediaTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMediaType: MediaType,
  ) => {
    if (newMediaType !== null) {
      setMediaType(newMediaType);
      setResults([]);
      setSearchQuery('');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/${mediaType}/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      setError('Failed to perform search. Please try again.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFavorite = async (item: SearchResult) => {
    try {
      if (favorites.includes(item.id)) {
        // Remove from favorites
        const response = await fetch(`http://localhost:5000/api/favorites/${item.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setFavorites(favorites.filter(id => id !== item.id));
        }
      } else {
        // Add to favorites
        const response = await fetch(`http://localhost:5000/api/${mediaType}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
        if (response.ok) {
          setFavorites([...favorites, item.id]);
        }
      }
    } catch (error) {
      setError('Failed to update favorites');
      console.error('Favorites error:', error);
    }
  };

  const handlePlay = async (item: SearchResult) => {
    try {
      // If we already have a stream URL, use it directly
      if (item.streamUrl) {
        setSelectedMedia(item);
        return;
      }

      // Otherwise, fetch the stream URL
      const response = await fetch(`http://localhost:5000/api/${item.type}/stream/${item.id}`);
      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'PREVIEW_NOT_AVAILABLE') {
          setError('Sorry, no preview is available for this track on Spotify');
        } else {
          throw new Error(data.message || 'Failed to get stream URL');
        }
        return;
      }

      if (!data.streamUrl) {
        setError('Sorry, no preview is available for this track on Spotify');
        return;
      }

      setSelectedMedia({
        ...item,
        streamUrl: data.streamUrl
      });
    } catch (error) {
      console.error('Play error:', error);
      setError(error instanceof Error ? error.message : 'Failed to start playback');
    } finally {
      // Auto-hide error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Search {mediaType === 'tv' ? 'TV Series' : mediaType === 'music' ? 'Music' : 'Movies'}
        </Typography>

        <ToggleButtonGroup
          value={mediaType}
          exclusive
          onChange={handleMediaTypeChange}
          aria-label="media type"
          sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}
        >
          <ToggleButton value="movie" aria-label="movie">
            <MovieIcon sx={{ mr: 1 }} /> Movies
          </ToggleButton>
          <ToggleButton value="tv" aria-label="tv">
            <TvIcon sx={{ mr: 1 }} /> TV Series
          </ToggleButton>
          <ToggleButton value="music" aria-label="music">
            <MusicNoteIcon sx={{ mr: 1 }} /> Music
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Search for ${mediaType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
            sx={{ minWidth: '120px' }}
          >
            Search
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && results.length === 0 && searchQuery && (
          <Typography variant="body1" color="text.secondary" align="center">
            No results found. Try a different search term.
          </Typography>
        )}

        <Grid container spacing={3}>
          {results.map((item) => (
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
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={item.streamUrl === null ? null : <PlayArrowIcon />}
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handlePlay(item)}
                      disabled={item.streamUrl === null}
                    >
                      {item.streamUrl === null ? 'No Preview' : (item.type === 'music' ? 'Listen' : 'Watch')}
                    </Button>
                    <IconButton
                      onClick={() => toggleFavorite(item)}
                      color={favorites.includes(item.id) ? 'secondary' : 'default'}
                    >
                      {favorites.includes(item.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Box>
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

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="info" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Search; 
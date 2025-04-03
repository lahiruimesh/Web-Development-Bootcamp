import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Slider,
  Button,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Close,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material';

interface MediaPlayerProps {
  open: boolean;
  onClose: () => void;
  mediaType: 'music' | 'movie' | 'tv';
  mediaId: string;
  title: string;
  streamUrl: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  open,
  onClose,
  mediaType,
  mediaId,
  title,
  streamUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const isMusic = mediaType === 'music';

  useEffect(() => {
    if (open && streamUrl && mediaRef.current) {
      try {
        mediaRef.current.src = streamUrl;
        mediaRef.current.load();
        const playPromise = mediaRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error('Playback error:', error);
              setError('Failed to play media. Please try again.');
            });
        }
      } catch (error) {
        console.error('Media error:', error);
        setError('Failed to play media. Please try again.');
      }
    }
    return () => {
      if (mediaRef.current) {
        mediaRef.current.pause();
        mediaRef.current.src = '';
      }
    };
  }, [open, streamUrl]);

  const handlePlayPause = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play().catch(error => {
          console.error('Play error:', error);
          setError('Failed to play media. Please try again.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setVolume(value);
    if (mediaRef.current) {
      mediaRef.current.volume = value;
    }
  };

  const handleMuteToggle = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {title}
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', position: 'relative' }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          {!streamUrl && (
            <Typography color="error" sx={{ mb: 2 }}>
              No playback URL available for this media.
            </Typography>
          )}
          
          {isMusic ? (
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onError={(e) => {
                console.error('Audio error:', e);
                setError('Failed to play audio. Please try again.');
              }}
              style={{ width: '100%' }}
              controls
            />
          ) : (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onError={(e) => {
                console.error('Video error:', e);
                setError('Failed to play video. Please try again.');
              }}
              style={{ width: '100%' }}
              controls
            />
          )}

          {streamUrl && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <IconButton onClick={handlePlayPause}>
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <Typography sx={{ mx: 1 }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
                <IconButton onClick={handleMuteToggle}>
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
                <Slider
                  sx={{ mx: 2, width: 100 }}
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.1}
                  aria-label="Volume"
                />
              </Box>
              <Slider
                value={currentTime}
                min={0}
                max={duration}
                onChange={(_, value) => {
                  if (mediaRef.current) {
                    mediaRef.current.currentTime = value as number;
                  }
                }}
                aria-label="Progress"
              />
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPlayer; 
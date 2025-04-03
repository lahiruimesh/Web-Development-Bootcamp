import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

interface Download {
  downloadId: string;
  status: 'queued' | 'downloading' | 'completed' | 'error';
  progress: number;
  title: string;
  mediaType: string;
  startTime: string;
  completedAt?: string;
  downloadPath?: string;
  fileName?: string;
}

interface DownloadManagerProps {
  open: boolean;
  onClose: () => void;
}

const DownloadManager: React.FC<DownloadManagerProps> = ({ open, onClose }) => {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchDownloads();
      const interval = setInterval(fetchDownloads, 1000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const fetchDownloads = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/downloads/queue');
      const data = await response.json();
      setDownloads(data);
    } catch (error) {
      console.error('Failed to fetch downloads:', error);
    }
  };

  const cancelDownload = async (downloadId: string) => {
    try {
      await fetch(`http://localhost:5000/api/downloads/${downloadId}`, {
        method: 'DELETE',
      });
      fetchDownloads();
    } catch (error) {
      console.error('Failed to cancel download:', error);
    }
  };

  const getDownloadLink = (download: Download) => {
    if (download.status === 'completed' && download.fileName) {
      return `http://localhost:5000/api/downloads/${download.downloadId}/file`;
    }
    return null;
  };

  const handleDownload = async (downloadId: string) => {
    try {
      setError(null);
      const download = downloads.find(d => d.downloadId === downloadId);
      if (!download) {
        throw new Error('Download not found');
      }

      // Create loading indicator
      const loadingText = document.createElement('div');
      loadingText.style.position = 'fixed';
      loadingText.style.top = '50%';
      loadingText.style.left = '50%';
      loadingText.style.transform = 'translate(-50%, -50%)';
      loadingText.style.padding = '20px';
      loadingText.style.background = 'rgba(0,0,0,0.8)';
      loadingText.style.color = 'white';
      loadingText.style.borderRadius = '5px';
      loadingText.textContent = 'Preparing download...';
      document.body.appendChild(loadingText);

      const response = await fetch(`http://localhost:5000/api/downloads/${downloadId}/file`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Download failed');
      }
      
      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = download.fileName || 'download';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      document.body.removeChild(loadingText);
    } catch (error) {
      console.error('Failed to download file:', error);
      setError(error instanceof Error ? error.message : 'Failed to download file');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Downloads
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Box sx={{ mb: 2 }}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}
        <List>
          {downloads.length === 0 ? (
            <Typography variant="body2" color="textSecondary" align="center">
              No active downloads
            </Typography>
          ) : (
            downloads.map((download) => (
              <ListItem
                key={download.downloadId}
                secondaryAction={
                  download.status !== 'completed' ? (
                    <IconButton
                      edge="end"
                      onClick={() => cancelDownload(download.downloadId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <Button
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(download.downloadId)}
                      disabled={download.status !== 'completed'}
                    >
                      Download
                    </Button>
                  )
                }
              >
                <ListItemText
                  primary={download.title}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {download.mediaType.toUpperCase()} • {download.status}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={download.progress}
                        sx={{ mt: 1 }}
                      />
                      <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                        {download.progress}%
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadManager; 
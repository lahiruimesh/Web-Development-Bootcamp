import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import JSZip from 'jszip';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ maxHeight: '60vh', overflow: 'auto' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PreviewCode = styled('pre')`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

function App() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedFiles, setConvertedFiles] = useState<{ [key: string]: string } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
      setError(null);
      setConvertedFiles(null);
    }
  };

  const handleConvert = async () => {
    if (!files || files.length === 0) {
      setError('Please select files to convert');
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    setConverting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const processedComponents = Object.fromEntries(
          Object.entries(response.data.components).map(([filename, content]) => [
            filename,
            typeof content === 'string' ? content : JSON.stringify(content)
          ])
        );
        setConvertedFiles(processedComponents);
      } else {
        setError('Conversion failed: ' + (response.data.error || 'Unknown error'));
      }
    } catch (err: any) {
      console.error('Conversion error:', err);
      if (err.response) {
        setError(`Error during conversion: ${err.response.data.error || err.message}`);
      } else if (err.request) {
        setError('No response from server. Please check if the server is running.');
      } else {
        setError(`Error during conversion: ${err.message}`);
      }
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFiles) return;

    try {
      const zip = new JSZip();

      Object.entries(convertedFiles).forEach(([filename, content]) => {
        const fileContent = typeof content === 'string' ? content : JSON.stringify(content);
        zip.file(filename, fileContent);
      });

      zip.generateAsync({ type: 'blob' })
        .then((content: Blob) => {
          const url = window.URL.createObjectURL(content);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'react-components.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error creating zip file:', error);
          setError('Error creating download file. Please try again.');
        });
    } catch (error) {
      console.error('Error in download handler:', error);
      setError('Error preparing download. Please try again.');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      // You could add a toast notification here
      console.log('Code copied to clipboard');
    });
  };

  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jsx':
      case 'tsx':
        return 'jsx';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      default:
        return 'javascript';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          HTML to React Converter
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Upload your HTML, CSS, and JavaScript files to convert them into React components.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, my: 3 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Files
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".html,.css,.js"
              />
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleConvert}
              disabled={!files || converting}
            >
              {converting ? <CircularProgress size={24} /> : 'Convert to React'}
            </Button>

            {convertedFiles && (
              <>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<PreviewIcon />}
                  onClick={() => setPreviewOpen(true)}
                >
                  Preview Code
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </>
            )}
          </Box>

          {files && (
            <Typography variant="body2" color="text.secondary">
              Selected files: {Array.from(files).map(f => f.name).join(', ')}
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Paper>

        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              maxHeight: '90vh',
            },
          }}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              Preview Converted Code
              <IconButton onClick={() => setPreviewOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {convertedFiles && (
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs
                    value={selectedTab}
                    onChange={(_, newValue) => setSelectedTab(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {Object.keys(convertedFiles).map((filename, index) => (
                      <Tab key={filename} label={filename} id={`tab-${index}`} />
                    ))}
                  </Tabs>
                </Box>
                {Object.entries(convertedFiles).map(([filename, content], index) => (
                  <TabPanel key={filename} value={selectedTab} index={index}>
                    <Box display="flex" justifyContent="flex-end" mb={1}>
                      <Button
                        startIcon={<ContentCopyIcon />}
                        onClick={() => handleCopyCode(content)}
                        size="small"
                      >
                        Copy Code
                      </Button>
                    </Box>
                    <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                      <SyntaxHighlighter
                        language={getLanguage(filename)}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: '4px',
                          fontSize: '14px',
                        }}
                      >
                        {content}
                      </SyntaxHighlighter>
                    </Box>
                  </TabPanel>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewOpen(false)}>Close</Button>
            <Button onClick={handleDownload} variant="contained" color="primary">
              Download All
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default App;

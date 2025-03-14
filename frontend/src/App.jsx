import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, IconButton, AppBar, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

// Keep these imports as they'll be used for the enhanced code block highlighting
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const API_URL = 'http://localhost:5000';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const eventSourceRef = useRef(null);
  
  // Clean up any open EventSource connections when component unmounts
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Close any existing EventSource connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    const isFollowUp = conversations.length > 0;
    const userMessage = { role: 'user', content: prompt };
    
    // Add user message to the conversation
    setConversations(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    setPrompt('');
    
    try {
      // Add an empty model message that will be updated as tokens arrive
      setConversations(prev => [...prev, { role: 'model', content: '' }]);
      
      // Create a new EventSource connection for streaming
      const eventSource = new EventSource(
        `${API_URL}/generate?prompt=${encodeURIComponent(prompt)}&is_followup=${isFollowUp}`
      );
      eventSourceRef.current = eventSource;
      
      // The full message we're building up - stored outside React state to avoid race conditions
      let fullModelResponse = '';
      
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.token) {
            // Update our local copy of the full response
            fullModelResponse += data.token;
            
            // Update the conversation state with the full response so far
            setConversations(prev => {
              const updated = [...prev];
              if (updated.length > 0) {
                const lastMessage = updated[updated.length - 1];
                if (lastMessage.role === 'model') {
                  // Replace the entire content with our full response
                  lastMessage.content = fullModelResponse;
                }
              }
              return updated;
            });
          }
          
          if (data.done) {
            eventSource.close();
            eventSourceRef.current = null;
            setIsLoading(false);
          }
          
          if (data.error) {
            console.error('Error from server:', data.error);
            eventSource.close();
            eventSourceRef.current = null;
            setIsLoading(false);
            
            // Update with error message
            setConversations(prev => {
              const updated = [...prev];
              if (updated.length > 0) {
                const lastMessage = updated[updated.length - 1];
                if (lastMessage.role === 'model' && !lastMessage.content) {
                  lastMessage.content = 'Sorry, there was an error processing your request. Please try again.';
                }
              }
              return updated;
            });
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
      
      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
        eventSourceRef.current = null;
        setIsLoading(false);
        
        // Add error message if needed
        setConversations(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            const lastMessage = updated[updated.length - 1];
            if (lastMessage.role === 'model' && !lastMessage.content) {
              lastMessage.content = 'Sorry, there was an error processing your request. Please try again.';
            }
          }
          return updated;
        });
      };
    } catch (error) {
      console.error('Error setting up streaming:', error);
      setIsLoading(false);
      
      // Add error message to conversations
      setConversations(prev => {
        const updated = [...prev];
        if (updated.length > 0) {
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.content = 'Sorry, there was an error processing your request. Please try again.';
          }
        }
        return updated;
      });
    }
  };
  
  const clearConversation = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setConversations([]);
    setIsLoading(false);
  };
  
  // Function to process text and highlight code blocks
  const renderModelResponse = (content) => {
    // Check if the content contains code blocks (```...```)
    const hasCodeBlock = content.includes('```');
    
    // If no code blocks were found, return the content as markdown
    if (!hasCodeBlock) {
      return (
        <ReactMarkdown
          components={{
            p: (props) => <Typography {...props} sx={{ mb: 2 }} />,
            h1: (props) => <Typography variant="h4" {...props} sx={{ mt: 3, mb: 2 }} />,
            h2: (props) => <Typography variant="h5" {...props} sx={{ mt: 2, mb: 1.5 }} />,
            h3: (props) => <Typography variant="h6" {...props} sx={{ mt: 2, mb: 1 }} />,
            ul: (props) => <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />,
            ol: (props) => <Box component="ol" sx={{ pl: 4, mb: 2 }} {...props} />,
            li: (props) => <Box component="li" sx={{ mb: 0.5 }} {...props} />,
            code: (props) => (
              <Box 
                component="code" 
                sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.1)', 
                  px: 0.8, 
                  py: 0.3, 
                  borderRadius: 1,
                  fontFamily: 'monospace'
                }}
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      );
    }
    
    // Process the content to identify sections
    const sections = [];
    let currentText = '';
    let inCodeBlock = false;
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.trim() === '```' && !inCodeBlock) {
        // Start of a code block
        if (currentText) {
          sections.push({ type: 'text', content: currentText });
          currentText = '';
        }
        inCodeBlock = true;
        // Don't add the opening backticks to the content
      } else if (line.trim() === '```' && inCodeBlock) {
        // End of a code block
        sections.push({ type: 'code', content: currentText });
        currentText = '';
        inCodeBlock = false;
        // Don't add the closing backticks to the content
      } else {
        // Add the line to the current text
        currentText += line + '\n';
      }
    }
    
    // Add any remaining text
    if (currentText) {
      sections.push({ 
        type: inCodeBlock ? 'code' : 'text', 
        content: currentText 
      });
    }
    
    // Render the sections
    return (
      <Box>
        {sections.map((section, index) => (
          section.type === 'text' ? (
            <ReactMarkdown
              key={index}
              components={{
                p: (props) => <Typography {...props} sx={{ mb: 2 }} />,
                h1: (props) => <Typography variant="h4" {...props} sx={{ mt: 3, mb: 2 }} />,
                h2: (props) => <Typography variant="h5" {...props} sx={{ mt: 2, mb: 1.5 }} />,
                h3: (props) => <Typography variant="h6" {...props} sx={{ mt: 2, mb: 1 }} />,
                ul: (props) => <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />,
                ol: (props) => <Box component="ol" sx={{ pl: 4, mb: 2 }} {...props} />,
                li: (props) => <Box component="li" sx={{ mb: 0.5 }} {...props} />,
                code: (props) => (
                  <Box 
                    component="code" 
                    sx={{ 
                      bgcolor: 'rgba(0, 0, 0, 0.1)', 
                      px: 0.8, 
                      py: 0.3, 
                      borderRadius: 1,
                      fontFamily: 'monospace'
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {section.content}
            </ReactMarkdown>
          ) : (
            <Box 
              key={index} 
              sx={{ 
                position: 'relative',
                my: 2
              }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  bgcolor: 'rgba(18, 18, 18, 0.8)', // Darker background for code blocks
                  p: 2.5, 
                  borderRadius: 2,
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                  },
                  '&:hover .copy-button': {
                    opacity: 1,
                  }
                }}
              >
                <IconButton 
                  size="small" 
                  className="copy-button"
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10,
                    color: '#B0B0C0',
                    bgcolor: 'rgba(108, 99, 255, 0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(108, 99, 255, 0.3)',
                      transform: 'scale(1.05)',
                    },
                    width: 32,
                    height: 32,
                    fontSize: '0.9rem',
                    opacity: 0,
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(108, 99, 255, 0.2)'
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(section.content);
                    // Optional: Add a visual feedback when copied
                    const button = document.activeElement;
                    if (button) {
                      button.innerHTML = '✓';
                      setTimeout(() => {
                        button.innerHTML = '📋';
                      }, 1000);
                    }
                  }}
                >
                  📋
                </IconButton>
                <Typography 
                  component="pre" 
                  sx={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.875rem',
                    m: 0,
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    color: '#e6e6e6'
                  }}
                >
                  {section.content}
                </Typography>
              </Paper>
            </Box>
          )
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', background: 'linear-gradient(45deg, #6C63FF 30%, #FF6584 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PEO.AI
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ opacity: 0.8 }}>
            Prompt Engineering Optimizer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            flexGrow: 1, 
            mb: 2, 
            p: 3, 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
              margin: '4px 0',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              transition: 'all 0.2s ease-in-out',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            },
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100vh - 240px)',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(108, 99, 255, 0.03) 0%, transparent 60%)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {conversations.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              padding: 4
            }}>
              <Box 
                sx={{ 
                  mb: 3, 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #6C63FF 30%, #FF6584 90%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(108, 99, 255, 0.3)',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      boxShadow: '0 8px 20px rgba(108, 99, 255, 0.3)'
                    },
                    '50%': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 24px rgba(108, 99, 255, 0.4)'
                    },
                    '100%': {
                      transform: 'scale(1)',
                      boxShadow: '0 8px 20px rgba(108, 99, 255, 0.3)'
                    },
                  }
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>P</Typography>
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Welcome to PEO.AI
              </Typography>
              <Typography variant="body1" align="center" sx={{ maxWidth: '500px', mb: 3, lineHeight: 1.6 }}>
                Enter your prompt below to get started with prompt engineering optimization. Our AI will help you craft better prompts for more effective results.
              </Typography>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'rgba(108, 99, 255, 0.05)', 
                border: '1px dashed rgba(108, 99, 255, 0.3)',
                maxWidth: '500px'
              }}>
                <Typography variant="body2" align="center" sx={{ fontStyle: 'italic' }}>
                  Tip: Be specific about your goals and provide context for better prompt optimization.
                </Typography>
              </Box>
            </Box>
          ) : (
            conversations.map((msg, index) => (
              <Box 
                key={index} 
                sx={{
                  mb: 3,
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  animation: 'fadeIn 0.3s ease-out',
                  '@keyframes fadeIn': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(10px)'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    },
                  }
                }}
              >
                <Paper 
                  elevation={msg.role === 'user' ? 2 : 1} 
                  sx={{
                    p: 2.5,
                    bgcolor: msg.role === 'user' ? 'primary.dark' : 'background.paper',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: msg.role === 'user' 
                      ? '0 4px 15px rgba(108, 99, 255, 0.2)' 
                      : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    '&::after': msg.role === 'user' ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      right: '-8px',
                      width: '20px',
                      height: '20px',
                      background: 'linear-gradient(45deg, #4B44CC 30%, #6C63FF 90%)',
                      borderRadius: '50%',
                      zIndex: -1,
                      opacity: 0.7
                    } : {}
                  }}
                >
                  {msg.role === 'user' ? (
                    <Typography sx={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {msg.content}
                    </Typography>
                  ) : (
                    renderModelResponse(msg.content)
                  )}
                </Paper>
              </Box>
            ))
          )}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3, flexDirection: 'column' }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 1,
                '& > div': {
                  width: '12px',
                  height: '12px',
                  margin: '0 4px',
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  '@keyframes bounce': {
                    '0%, 80%, 100%': {
                      transform: 'scale(0)',
                      opacity: 0.3
                    },
                    '40%': {
                      transform: 'scale(1)',
                      opacity: 1
                    }
                  }
                },
                '& > div:nth-of-type(1)': {
                  animationDelay: '-0.32s'
                },
                '& > div:nth-of-type(2)': {
                  animationDelay: '-0.16s'
                }
              }}>
                <div></div>
                <div></div>
                <div></div>
              </Box>
              <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Generating response...</Typography>
            </Box>
          )}
        </Paper>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={conversations.length > 0 ? "Enter your follow-up prompt here..." : "Enter your prompt here..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            multiline
            maxRows={4}
            sx={{ 
              mr: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&.Mui-focused': {
                  boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.2)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(108, 99, 255, 0.5)',
                },
              }
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isLoading || !prompt.trim()}
            endIcon={<SendIcon />}
            sx={{
              minWidth: '100px',
              height: '48px',
              borderRadius: '24px',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(108, 99, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(108, 99, 255, 0.3)',
              }
            }}
          >
            Send
          </Button>
          {conversations.length > 0 && (
            <IconButton 
              color="error" 
              onClick={clearConversation} 
              sx={{ 
                ml: 1,
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 82, 82, 0.1)',
                  transform: 'rotate(10deg)'
                }
              }}
              disabled={isLoading}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Container>
      
      <Box component="footer" sx={{ 
            py: 3, 
            textAlign: 'center', 
            bgcolor: 'background.default', // Changed from 'background.paper' to 'background.default'
            borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
            mt: 2 
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8, fontWeight: 500 }}>
              PEO.AI - Prompt Engineering Optimizer © {new Date().getFullYear()}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, opacity: 0.6 }}>
              Optimize your prompts for better AI interactions
            </Typography>
          </Box>
    </Box>
  );
};

export default App;
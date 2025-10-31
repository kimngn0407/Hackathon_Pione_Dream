/**
 * Chatbot Embed Component
 * Embeds the AI Chatbot into the application
 */

import React, { useState } from 'react';
import { Box, IconButton, Paper, Fade } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { API_ENDPOINTS } from '../config/api.config';

const ChatbotEmbed = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <IconButton
        onClick={toggleChatbot}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          backgroundColor: '#4CAF50',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          '&:hover': {
            backgroundColor: '#45a049',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
          zIndex: 9999,
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {/* Chatbot Window */}
      <Fade in={isOpen}>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: { xs: '90vw', sm: 400, md: 450 },
            height: { xs: '70vh', sm: 600 },
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            borderRadius: 2,
            overflow: 'hidden',
            zIndex: 9998,
            display: isOpen ? 'block' : 'none',
          }}
        >
          <Box sx={{ height: '100%', width: '100%' }}>
            <iframe
              src={API_ENDPOINTS.DIRECT.CHATBOT}
              title="Smart Farm Chatbot"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="microphone"
            />
          </Box>
        </Paper>
      </Fade>
    </>
  );
};

export default ChatbotEmbed;


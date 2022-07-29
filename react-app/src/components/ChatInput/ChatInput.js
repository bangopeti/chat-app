import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Grid, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';

const ChatInput = ({ socket }) => {
  const [message, setMessage] = useState({ user: '', text: '' });

  const sendMessage = () => {
    if (message.text) {
      socket.emit('send_message', message);
      console.log(message);
      setMessage({ ...message, text: '' });
    }
  };

  return (
    <Box mt={3}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              id='standard-basic'
              label='Username'
              variant='outlined'
              value={message.user}
              onChange={(e) => setMessage({ ...message, user: e.target.value })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <TextField
              id='standard-basic'
              label='Message'
              variant='outlined'
              value={message.text}
              onChange={(e) => setMessage({ ...message, text: e.target.value })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label='send' color='primary' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatInput;

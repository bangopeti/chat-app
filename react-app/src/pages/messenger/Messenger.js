import {
  Box,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Messenger = ({ socket }) => {
  const [message, setMessage] = useState({ user: '', text: '' });
  const [messageReceived, setMessageReceived] = useState([]);
  // const [user, setUser] = useState({});
  const username = useParams().username;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived((prevValue) => [...prevValue, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?username=${username}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [username]);

  const sendMessage = () => {
    if (message.text) {
      socket.emit('send_message', message);
      console.log(message);
      setMessage({ ...message, text: '' });
    }
  };

  return (
    <Box mt={3}>
      <List>
        {messageReceived.map((messageElement) => (
          <ListItem>
            <ListItemIcon>
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
            </ListItemIcon>
            <ListItemText primary={messageElement}></ListItemText>
          </ListItem>
        ))}
      </List>

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

export default Messenger;

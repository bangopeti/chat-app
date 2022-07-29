import { List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const Chatbox = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState([]);
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived((prevValue) => [...prevValue, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <List>
      {messageReceived.map((messageElement) => (
        <ListItem>
          <ListItemText primary={messageElement}></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default Chatbox;

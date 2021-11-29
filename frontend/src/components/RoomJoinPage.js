import React, { useState } from 'react';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const RoomJoinPage = (props) => {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  const codeChangeHandler = (event) => {
    setRoomCode(event.target.value);
  };
  const roomButtonClick = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: roomCode,
      }),
    };

    fetch('/api/join-room', requestOptions)
      .then((response) => {
        if (response.ok) {
          props.history.push(`/room/${roomCode}`);
        } else {
          setError('Room Not Found.');
          setRoomCode('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={error}
          label="CODE"
          placeholder="Enter A Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={codeChangeHandler}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          style={{ 'margin-right': '1rem' }}
          onClick={roomButtonClick}
          style={{ fontSize: '1.3rem' }}
        >
          Enter Room
        </Button>
        <Button
          variant="contained"
          color="secondary"
          to="/"
          component={Link}
          style={{ fontSize: '1.3rem' }}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;

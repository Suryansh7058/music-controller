import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

const Room = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [isHost, setIsHost] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});
  const roomCode = props.match.params.roomCode;

  useEffect(() => {
    (() => {
      fetch('/api/get-room' + '?code=' + roomCode)
        .then((response) => {
          if (!response.ok) {
            props.leaveRoomCallBack();
            props.history.push('/');
            return;
          }
          return response.json();
        })
        .then((data) => {
          setVotesToSkip(data.vote_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);

          if (isHost) {
            authenticateSpotify();
            setTimeout(() => {
              getCurrentSong();
            }, 500);
          }
        });
    })();
    return () => {};
  }, []);
  useEffect(() => {
    const interval = setInterval(getCurrentSong, 800);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const leaveClickHandler = async () => {
    setSpotifyAuthenticated(false);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    await fetch('/api/leave-room', requestOptions);
    props.leaveRoomCallBack();
    props.history.push('/');
  };

  let settings = (
    <Grid item xs={12}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setShowSettings(true)}
        style={{ fontSize: '1.2rem' }}
      >
        Settings
      </Button>
    </Grid>
  );
  if (showSettings) {
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallBack={() => {
              setShowSettings(false);
            }}
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h4"
          style={{
            color: 'black',
            textShadow: '0.175rem 0.125rem 0 #fff',
            fontWeight: '700',
            marginBlock: '1.2rem',
            textTransform: 'capitalize',
          }}
        >
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} aling="center">
        <MusicPlayer {...song} isHost={isHost} />
      </Grid>
      {isHost && settings}
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="contained"
          onClick={leaveClickHandler}
          style={{ fontSize: '1.2rem' }}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;

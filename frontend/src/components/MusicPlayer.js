import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import styled from 'styled-components';

const CardBlur = styled(Card)`
  background: rgba(255, 255, 255, 0.35);
  padding: 2rem 0;
  width: 100%;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const pauseSong = () => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('/spotify/pause', requestOptions);
};

const playSong = () => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('/spotify/play', requestOptions);
};

const skipSong = () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('/spotify/skip', requestOptions);
};

const previousSong = () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('/spotify/previous', requestOptions);
};

const MusicPlayer = (props) => {
  const songProgress = (props.time / props.duration) * 100;

  return (
    <CardBlur>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img
            src={props.image_url}
            style={{ width: '20rem', aspectRatio: '1/1' }}
          />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography
            component="h3"
            variant="h3"
            style={{
              color: 'black',
              textShadow: '0.175rem 0.125rem 0 #fff',
              fontWeight: '700',
              marginBlock: '1.2rem',
              textTransform: 'capitalize',
            }}
          >
            {props.title}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h4"
            style={{
              color: '#3f3f3f',
              textShadow: '0.125rem 0.125rem  #fff',
              marginBlock: '1.2rem',
            }}
          >
            {props.artist}
          </Typography>
          <Center>
            {props.isHost && (
              <IconButton onClick={previousSong}>
                <SkipPreviousIcon style={{ fontSize: '200%', fill: 'black' }} />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                props.is_playing ? pauseSong() : playSong();
              }}
            >
              {props.is_playing ? (
                <PauseIcon style={{ fontSize: '200%', fill: 'black' }} />
              ) : (
                <PlayArrowIcon style={{ fontSize: '200%', fill: 'black' }} />
              )}
            </IconButton>
            <IconButton onClick={skipSong}>
              <SkipNextIcon style={{ fontSize: '200%', fill: 'black' }} />{' '}
              {props.votes}/{props.votes_required}
            </IconButton>
          </Center>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </CardBlur>
  );
};

export default MusicPlayer;

import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const CreateRoomPage = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(
    props.votesToSkip ? props.votesToSkip : 2
  );

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [guestCanPause, setGuestCanPause] = useState(
    props.update ? props.guestCanPause : true
  );

  const voteChangeHandler = (event) => {
    setVotesToSkip(event.target.value);
  };

  const guestCanPauseChangeHandler = (event) => {
    setGuestCanPause(event.target.value === 'true' ? true : false);
  };

  const backClickHandler = () => {
    if (props.update === true) {
      setGuestCanPause(props.guestCanPause);
      setVotesToSkip(props.votesToSkip);
      props.updateCallBack();
      return;
    }

    props.history.push('/');
  };

  const updateRoomHandler = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vote_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode,
      }),
    };

    fetch('/api/update-room', requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg('Room Updated Successfully!!!');
      } else {
        setErrorMsg('ERROR!! Updating Room Failed...');
      }
    });
  };

  const createRoomHandler = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vote_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch('/api/create-room', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.history.push('/room/' + data.code);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg.length > 0 || successMsg.length > 0}>
          {successMsg.length > 0 ? (
            <Alert
              severity="success"
              onClose={() => {
                setSuccessMsg('');
                props.updateCallBack();
              }}
              style={{
                fontSize: '2rem',
                maxWidth: '30rem',
                marginBottom: '2rem',
                background: 'rgba(0,128,0,0.2)',
              }}
            >
              {successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMsg('');
              }}
            >
              {errorMsg}
            </Alert>
          )}
        </Collapse>
        <Typography component="h2" variant="h2">
          {props.update ? 'Update Room' : 'Create A Room'}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText style={{ fontSize: '1rem' }}>
            <div align="center">Guest Control of PlayBack State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={guestCanPauseChangeHandler}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={votesToSkip}
            onChange={voteChangeHandler}
            inputProps={{
              min: 1,
              style: { textAlign: 'center', fontSize: '1.2rem' },
            }}
          />
          <FormHelperText style={{ fontSize: '1rem' }}>
            <div align="center">Votes Required to Skip the Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (props.update) {
              updateRoomHandler();
            } else {
              createRoomHandler();
            }
          }}
          style={{ 'margin-right': '1rem', fontSize: '1.2rem' }}
        >
          {props.update ? 'Update Room' : 'Create A Room'}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={backClickHandler}
          style={{ fontSize: '1.2rem' }}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;

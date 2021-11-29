import React, { useEffect, useState } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import { Button, Grid, Typography, ButtonGroup } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Room from './Room';
import HomeContent from './HomeContent';

const Homepage = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch('/api/user-in-room')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRoomCode(data.code);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return roomCode!==null ? (
              <Redirect to={`/room/${roomCode}`} />
            ) : (
              <HomeContent />
            );
          }}
        ></Route>
        <Route path="/join" component={RoomJoinPage} />
        <Route path="/create" component={CreateRoomPage} />
        <Route
          exact
          path="/room/:roomCode"
          render={(props) => {
            return <Room {...props} leaveRoomCallBack={clearRoomCode} />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default Homepage;

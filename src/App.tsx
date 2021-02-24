import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";

import Home from "./components/home/Home";
import ImageSlider from "./components/image-slider/ImageSlider";
import Modal from "./components/modal/Modal";
import SideBar from "./components/sidebar/SideBar";
import Chat from "./components/chat/Chat";
import Painter from "./components/painter/Painter";
import TimingGame from "./components/timing-game/TimingGame";
import NotFound from "./pages/404/NotFound";

const Container = styled.div`
  width: 100vw;
`;
const Header = styled.header``;
const Title = styled.h1`
  margin-bottom: 0.4rem;
`;
const LinkBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

function App() {
  return (
    <Container>
      <Header>
        <Title>Tonyw React SendBox</Title>

        <LinkBox>
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/image-slider">
            ImageSlider
          </Link>
          <Link className="link" to="/modal">
            Modal
          </Link>
          <Link className="link" to="/side-bar">
            SideBar
          </Link>
          <Link className="link" to="/chat">
            Chat
          </Link>
          <Link className="link" to="/painter">
            Painter
          </Link>
          <Link className="link" to="/timing-game">
            TimingGame
          </Link>
        </LinkBox>
      </Header>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/image-slider" component={ImageSlider} />
        <Route path="/modal" component={Modal} />
        <Route path="/side-bar" component={SideBar} />
        <Route path="/chat" component={Chat} />
        <Route path="/painter" component={Painter} />
        <Route path="/timing-game" component={TimingGame} />

        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;

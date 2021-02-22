import React from "react";
import "./App.css";

import Home from "./components/home/Home";
import ImageSlider from "./components/image-slider/ImageSlider";
import Modal from "./components/modal/Modal";
import SideBar from "./components/sidebar/SideBar";
import Chat from "./components/chat/Chat";
import Painter from "./components/painter/Painter";
import TimingGame from "./components/timing-game/TimingGame";
import NotFound from "./pages/404/NotFound";

import { Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-title">
        <h1>Tonyw React Components</h1>
      </div>
      <div className="App-nav">
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
      </div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/image-slider" component={ImageSlider} exact />
        <Route path="/modal" component={Modal} exact />
        <Route path="/side-bar" component={SideBar} exact />
        <Route path="/chat" component={Chat} exact />
        <Route path="/painter" component={Painter} exact />
        <Route path="/timing-game" component={TimingGame} exact />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

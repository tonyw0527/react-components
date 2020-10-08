import React from 'react';
import './App.css';

import Home from './components/home/Home';
import ImageSlider from './components/image-slider/ImageSlider';
import Modal from './components/modal/Modal';
import SideBar from './components/sidebar/SideBar';
import ErrorPage from './components/error-page/ErrorPage';

import { Route, Link, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/image-slider">ImageSlider</Link>
                <Link className="link" to="/modal">Modal</Link>
                <Link className="link" to="/side-bar">SideBar</Link>
            </div>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/image-slider" component={ImageSlider} exact />
                <Route path="/modal" component={Modal} exact />
                <Route path="/side-bar" component={SideBar} exact />
                <Route component={ErrorPage} />
            </Switch>
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import ImageSlider from './components/image-slider/ImageSlider';
import Modal from './components/modal/Modal';
import SideBar from './components/sidebar/SideBar';

function App() {
  return (
    <div className="App">
      <ImageSlider />
      <hr />
      <Modal />
      <hr />
      <SideBar />
    </div>
  );
}

export default App;

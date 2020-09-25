import React from 'react';
import './App.css';
import ImageSlider from './components/image-slider/ImageSlider';
import Modal from './components/modal/Modal';

function App() {
  return (
    <div className="App">
      <ImageSlider />
      <hr />
      <Modal />
    </div>
  );
}

export default App;

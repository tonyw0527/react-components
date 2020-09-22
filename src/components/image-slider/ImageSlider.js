import React, { useState, useRef } from 'react';
import './ImageSlider.css'

import docker_img from '../../assets/images/Image-slider-ex/docker.png';
import instargram_img from '../../assets/images/Image-slider-ex/instargram.jpg';
import kakao_img from '../../assets/images/Image-slider-ex/kakao.png';
import twitter_img from '../../assets/images/Image-slider-ex/twitter.png';
import view_img from '../../assets/images/Image-slider-ex/view.png';


const ImageSlider = () => {
    const img_width = 300;
    const img_height = 300;
    const images = [docker_img, instargram_img, kakao_img, twitter_img, view_img];

    
    const imageContainerRef = useRef(null);

    const [ImgIndex, setImgIndex] = useState(0);

    return (
            <div className="wrapper">
                <div className="imageContainer" ref={imageContainerRef}>
                    {
                        images.map((image, index) => {
                            return (<div key={index} style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                width: `${img_width + 'px'}`,
                                height: `${img_height + 'px'}`
                            }}></div>);
                        })
                    }
                </div>
                <button className="left" onClick={() => {
                    if (ImgIndex === 0) {
                        const pos_x = (-img_width * (images.length-1)) +'px';
                        console.log(pos_x);
                        imageContainerRef.current.style.transform = `translateX(${pos_x})`
                        setImgIndex(images.length-1);
                        return;
                    }
                    const pos_x = (img_width * (-ImgIndex + 1)) + 'px';
                    imageContainerRef.current.style.transform = `translateX(${pos_x})`
                    setImgIndex(ImgIndex - 1);
                }} >&lt;</button>
                <button className="right" onClick={() => {
                    if (ImgIndex === (images.length - 1)) {
                        const pos_x = 0 + 'px';
                        imageContainerRef.current.style.transform = `translateX(${pos_x})`
                        setImgIndex(0);
                        return;
                    }
                    const pos_x = (-img_width * (ImgIndex + 1)) + 'px';
                    imageContainerRef.current.style.transform = `translateX(${pos_x})`
                    setImgIndex(ImgIndex + 1);
                }}>&gt;</button>
                <div className="radioButton">
                    {
                        images.map((item, index) => {
                            const checked = ImgIndex === index ? true : false;
                            return (
                                <input type="radio" checked={checked} key={index} readOnly />
                            );
                        })
                    }
                </div>
            </div>
            
        
    );
};

export default ImageSlider;
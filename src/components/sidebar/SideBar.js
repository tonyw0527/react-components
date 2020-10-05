import React, { useState, useRef} from 'react';
import './SideBar.css';

const SideBar = () => {

    const sideBarRef = useRef(null);

    const [Flag, setFlag] = useState(false);

    return (
        <>
            <button type="button" onClick={(e) => {
                if(Flag === false) {
                    sideBarRef.current.style.transform = "translateX(0)";
                    setFlag(true);
                } else {
                    sideBarRef.current.style.transform = "translateX(-202px)";
                    setFlag(false);
                }
                
            }}>CATEGORY</button>

            <div className="sidebar-box" ref={sideBarRef}>
                <div>Category</div>
                <li>World</li>
                <li>National</li>
                <li>Economics</li>
                <li>Politics</li>
                <li>Society</li>
                <li>Sports</li>
                <li>Nature</li>
            </div>
        </>
        
    );
}

export default SideBar;
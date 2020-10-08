import React from 'react';
import './Chat.css';

const Chat = () => {

    return (
        <div className="chat-box">
            <div className="chat-title">
                <span>My chat</span>
            </div>
            <div className="chat-lists">
                <li>Hello</li>
                <li>안녕</li>
            </div>
            <div className="chat-form-box">
                <form>
                    <input type="text" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
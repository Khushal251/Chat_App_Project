import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import './Chat.css';
import {user} from "../Join/Join"
import sendLogo from '../../images/send.png';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from "../../images/closeIcon.png"

const ENDPOINT = 'http://localhost:4500';

let socket;

const Chat = () => {
    const [id, setId] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            console.log("Connected");
            setId(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        socket.on('userJoined', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        socket.on('leave', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        socket.on('sendMessage', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = '';
    };

    return (
        <div className='chatPage'>
            <div className='chatContainer'>
            <div className='header'>
                    <h2>Demo Chat</h2>
                    <a href='/'>
                        <img src={closeIcon} alt='Close' className='closeIcon'/>
                    </a>
                </div>

                <ScrollToBottom className='chatBox'>
                    {messages.map((item, i) => (
                        <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />
                    ))}
                </ScrollToBottom>

                <div className='inputBox'>
                    <input onKeyPress={(event)=>event.key==='Enter'? send():null} type='text' id='chatInput' />
                    <button onClick={send} className='sendBtn'>
                        <img src={sendLogo} alt='Send' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

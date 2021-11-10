import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../api';
import { users } from '../api';
import '../assets/chat.css'

export default function Chat({match}) {
    const [username, setUsername] = useState('')
    const [data, setdata] = useState([])
    const [message, setmessage] = useState('')
    const [seconds, setSeconds] = useState(0)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setUsername(match.params.username);
    }, [match.params.username])
    
    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        axios.get(API)
            .then(res => setdata(res.data.messages))
    },[seconds]);

    useEffect(() => {
        const container = document.getElementById('messageContainer');
        container.scrollTop = container.scrollHeight
    }, [data.length])

    const handleSend = (e) => {
        e.preventDefault()
        if(message !== ''){
            setloading(true)
            axios.post(API,{username,message:message.trim()})
                .then(res => {
                    setloading(false)
                    if(res.status !== 200){
                        alert('server not responding')
                    }
                })
        }
        setmessage('')
    }

    const home = () => {
        axios.post(users,{username,method:'offline'})
        localStorage.removeItem('chat-username');
    }

    return (
        <div className="chatContainer">
            <button className="home"><Link to='/' onClick={home}>Home</Link></button>
            <div className="messageContainer" id='messageContainer'>
            {
                data.map((item) => {
                    return (
                    <div className='messages' key={item.id}>
                        <div className={`message ${(username === item.username)?"from":"to"}`}>
                            <div className="header">
                                <p className="username">{(username === item.username)?"You":item.username}</p>
                                <p className="time">
                                    {item.time}
                                </p>
                            </div>
                            <div className="content">
                                <p>{item.message}</p>
                            </div>
                        </div>
                    </div>
                    );
                    
                })
            }
            </div>
            <div className="send">
                <form>
                    <input type="text" value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Type a message..." />
                    <button type="submit" onClick={handleSend} disabled={loading ? true : false}>{loading?"sending":"send"}</button>
                </form>
            </div>
        </div>
    )
}

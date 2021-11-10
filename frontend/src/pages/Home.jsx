import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { users } from '../api';
import '../assets/home.css';
import {AiFillGithub} from 'react-icons/ai'

export default function Home() {
    const history = useHistory()
    const [username, setusername] = useState('');
    const [Users, setUsers] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setusername(localStorage.getItem('chat-username'));
        if(localStorage.getItem('chat-username') !== null){
            history.push(`/${localStorage.getItem('chat-username')}/chat`)
        }
    }, [])
    
    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 4000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        axios.get(users).then(res => setUsers(res.data.all_users))
    },[seconds]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(username === null || username.trim() === '' ){
            return;
        }

        if(Users.includes(username)){
            alert('name already exists!!! , please change your name');
            return;
        }

        if(username !== ''){
            axios.post(users,{username,method:'online'})
            history.push(`/${username}/chat`)
            localStorage.setItem('chat-username',username)
        }
        else{
            alert('please enter valid username')
        }
    }

    return (
        <>
        <div className="main">
            <section>
                <h2>Welcome {username} ,</h2>
                <form className="chat-form" >
                    <input type="text" name="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Username" required/>
                    <button onClick={handleSubmit}>Chat</button>
                </form>
            </section>
        </div>
        <div className="fields">
            <div className="field">
                No.of Users : {Users.length}
            </div>
            <a href="https://www.github.com/saisumanthkumar" target="_blank">
                <div className="field">
                    Follow me on Github {' '} <span><AiFillGithub /></span>
                </div>
            </a>
        </div>
        
        <div className="footer">
            Made with ❤️ & DJANGO 😉
        </div>
        </>
    )
}

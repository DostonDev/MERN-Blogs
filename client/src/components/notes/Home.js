import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) =>{
        const res = await axios.get('api/blogs', {
            headers:{Authorization: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await axios.delete(`api/blogs/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <div className="note-wrapper">
            {
                notes.map(blog =>(
                    <div className="card" key={blog._id}>
                        <h4 title={blog.title}>{blog.title}</h4>
                        <div className="text-wrapper">
                            <p>{blog.content}</p>
                        </div>
                        <p className="date">{format(blog.date)}</p>
                        <div className="card-footer">
                            {blog.name}
                            <Link to={`edit/${blog._id}`} >Edit</Link>
                        </div>
                        <button className="close" 
                        onClick={() => deleteNote(blog._id)} >X</button>
                    </div>
                ))
            }
            
        </div>
    )
}

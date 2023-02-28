import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router'
import Header from '../../Components/header/Header'
import Post from '../../Components/posts/Posts'
import Sidebar from '../../Components/sidebar/Sidebar'
import './home.css'

export default function Home() {
  const [posts, setPosts] = React.useState([])
  const {search} = useLocation()

  console.log(search);

  React.useEffect(()=>{
    axios.get('/post'+search)
    .then((res)=>{
      // console.log(res);
      setPosts(res.data)
    })
  },[search])

  // console.log(posts);

  return (
    <>
        <Header />
        <div className="home">
          <Post posts={posts} />
          <Sidebar />
        </div>
    </>
  )
}

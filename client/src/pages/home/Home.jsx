import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import Header from '../../Components/header/Header'
import Post from '../../Components/posts/Posts'
import './home.css'

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [searchVal, setSearchVal] = useState('');
  const { search } = useLocation();

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_API + '/post' + search)
      .then((res) => {
        setPosts(res.data)
      })
  }, [search])

  return (
    <>
      <Header />
      <input type="search" name="search" id="search" onChange={e => setSearchVal(e.target.value)} />
      <div className="home">
        <Post posts={posts} search={searchVal} />
      </div>
    </>
  )
}

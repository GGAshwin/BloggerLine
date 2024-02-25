import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts, search, category }) {
  const postArr = posts
    .filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    })
    .filter((post)=>{
      return category === ''? true : post.categories.includes(category)
    })
    .map((p) => <Post post={p} key={p._id + Math.random()} />);

  return <div className="posts">{postArr}</div>;
}

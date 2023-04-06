import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  const postArr = posts.map((p) => (
    <Post post={p} key={p._id} />
  ))
  // let postArr=[]
  // for (let index = 0; index < posts.length; index++) {
  //   postArr.push(<Post post={posts[index]} key={posts[index]._id} />)
  // }
  // console.log(posts);

  return (
    <div className="posts">
      {postArr}
    </div>
  );
}
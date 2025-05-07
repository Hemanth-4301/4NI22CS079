import { useEffect, useState } from "react";
import {
  fetchUsers,
  fetchPostsByUser,
  fetchCommentsByPost,
} from "../services/api";

export default function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const usersRes = await fetchUsers();
      const users = usersRes.data.users;
      const allPosts = [];

      for (const userId of Object.keys(users)) {
        const postsRes = await fetchPostsByUser(userId);
        allPosts.push(...(postsRes.data.posts || []));
      }

      let maxComments = 0;
      const postsWithComments = [];

      for (const post of allPosts) {
        const commentsRes = await fetchCommentsByPost(post.id);
        const commentCount = (commentsRes.data.comments || []).length;

        if (commentCount > maxComments) {
          maxComments = commentCount;
          postsWithComments.length = 0;
          postsWithComments.push({ ...post, commentCount });
        } else if (commentCount === maxComments) {
          postsWithComments.push({ ...post, commentCount });
        }
      }

      setTrendingPosts(postsWithComments);
    };

    load();
  }, []);

  return (
    <div>
      <h2>Trending Posts</h2>
      {trendingPosts.map((post, i) => (
        <div
          key={i}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>{post.content}</p>
          <p>
            <strong>Comments:</strong> {post.commentCount}
          </p>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../services/api";

export default function Feed() {
  const [feed, setFeed] = useState([]);

  const loadFeed = async () => {
    const usersRes = await fetchUsers();
    const users = usersRes.data.users;
    const allPosts = [];

    for (const userId of Object.keys(users)) {
      const postsRes = await fetchPostsByUser(userId);
      for (const post of postsRes.data.posts || []) {
        allPosts.push({
          ...post,
          userName: users[userId],
          timeStamp: Date.now() + Math.random(), // simulate post time
        });
      }
    }

    allPosts.sort((a, b) => b.timeStamp - a.timeStamp);
    setFeed(allPosts);
  };

  useEffect(() => {
    loadFeed();
    const interval = setInterval(loadFeed, 10000); // refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Feed</h2>
      {feed.map((post, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <h4>{post.userName}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

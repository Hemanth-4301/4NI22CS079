import { useEffect, useState } from "react";
import {
  fetchUsers,
  fetchPostsByUser,
  fetchCommentsByPost,
} from "../services/api";

export default function TopUsers() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const usersRes = await fetchUsers();
      const users = usersRes.data.users;

      const userComments = [];

      for (const [userId, userName] of Object.entries(users)) {
        const postsRes = await fetchPostsByUser(userId);
        let totalComments = 0;

        for (const post of postsRes.data.posts || []) {
          const commentsRes = await fetchCommentsByPost(post.id);
          totalComments += (commentsRes.data.comments || []).length;
        }

        userComments.push({ userId, userName, totalComments });
      }

      userComments.sort((a, b) => b.totalComments - a.totalComments);
      setTopUsers(userComments.slice(0, 5));
    };

    load();
  }, []);

  return (
    <div>
      <h2>Top 5 Users</h2>
      <ul>
        {topUsers.map((user, idx) => (
          <li key={idx}>
            {user.userName} - {user.totalComments} comments
          </li>
        ))}
      </ul>
    </div>
  );
}

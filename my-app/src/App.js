import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopUsers from "./components/TopUsers";
import TrendingPosts from "./components/TrendingPosts";
import Feed from "./components/Feed";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/">Feed</Link> | <Link to="/top-users">Top Users</Link> |{" "}
        <Link to="/trending">Trending</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending" element={<TrendingPosts />} />
      </Routes>
    </Router>
  );
}

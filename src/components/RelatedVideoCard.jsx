import { Link } from "react-router-dom";
export default function RelatedVideoCard({ video }) {
  const { snippet } = video;
  const thumnail = snippet?.thumbnails?.medium?.url;
  return (
    <Link to={`/watch?v=${video?.id?.videoId}`}>
      <img src={thumnail} alt={snippet?.title} />
      <p>{snippet?.title}</p>
      <p>{snippet?.channelTitle}</p>
    </Link>
  );
}

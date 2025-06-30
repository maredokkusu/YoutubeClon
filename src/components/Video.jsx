
export default function Video({ videoId }) {
  
  return (
    <>
    <iframe className="w-220 h-110 rounded-4xl"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    </>
  );
}

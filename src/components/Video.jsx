
export default function Video({ videoId }) {
  
  return (
    <div className="aspect-video w-full sm:sticky sm:top-0 z-10">
    <iframe className="w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    </div>
  );
}

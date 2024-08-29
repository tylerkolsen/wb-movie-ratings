import { useLoaderData } from "react-router-dom";

export default function MovieDetailPage() {
  const { movie } = useLoaderData()
  return (
    <>
      <h1>{movie.title}</h1>
      <img src={movie.posterPath} style={{width: '200px'}}/>
      <p>{movie.overview}</p>
    </>
  );
}

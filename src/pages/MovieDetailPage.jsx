import { useLoaderData, useNavigate } from "react-router-dom";
import CreateRatingForm from "../components/CreateRatingForm";
import axios from "axios";

export default function MovieDetailPage() {
  const { movie } = useLoaderData()
  const navigate = useNavigate()

  const handleCreateRating = async (e, { score }) => {
    e.preventDefault()
    await axios.post('/api/ratings', { score, movieId: movie.movieId })
      .then((res) => {
        if (res.data) {
          navigate('/me')
        }
      })
  }

  return (
    <>
      <h1>{movie.title}</h1>
      <img src={movie.posterPath} style={{width: '200px'}}/>
      <p>{movie.overview}</p>
      <h2>Rate this movie</h2>
      <CreateRatingForm onCreateRating={handleCreateRating} />
    </>
  );
}

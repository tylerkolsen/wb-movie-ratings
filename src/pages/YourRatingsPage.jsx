import { NavLink, useLoaderData } from "react-router-dom";

export default function YourRatingsPage() {
  const { ratings } = useLoaderData()

  const userRatings = ratings.map(({ ratingId, score, movie, movieId}) => {
    return (
        <li key={ratingId}>
          <NavLink to={`/movies/${movieId}`}>{movie.title}</NavLink>: {score}
        </li>
    )
  })

  return (
    <>
      <h1>Your Ratings</h1>
      <ul>
        {userRatings}
      </ul>
    </>
  );
}

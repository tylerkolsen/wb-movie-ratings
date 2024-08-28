import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import httpie from 'httpie';
import { Movie, Rating, User } from './src/model.js';

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

const loginRequired = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}


// route to get all movies
app.get('/api/movies', async (req, res) => {
    const movies = await Movie.findAll()
    res.json(movies)    
})

// route to get one movie
app.get('/api/movies/:movieId', async (req, res) => {
    const { movieId } = req.params
    const singleMovie = await Movie.findByPk(movieId)
    res.json(singleMovie)
})

// route for authentication
app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body
    const userCheck = await User.findOne({
        where: { email: email }
    })
    if (userCheck && userCheck.password === password) {
        req.session.userId = userCheck.userId
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})

// route for logging out. Requires being logged in
app.post('/api/logout', loginRequired, async (req, res) => {
    req.session.destroy()
    res.json({ success: true })
    }
)

// pulls all of the ratings assigned to a user
app.get('/api/ratings', loginRequired, async (req, res) => {
    const user = await User.findByPk(req.session.userId)
    const ratings = await user.getRatings({
        include: {
            model: Movie,
            attributes: ['title'],
        }
    })
    res.json(ratings)
    }
)

// Create a rating for the current user
app.post('/api/ratings', loginRequired, async (req, res) => {
    const { userId } = req.session
    const { movieId, score } = req.body

    const user = await User.findByPk(userId)
    const rating = await user.createRating({
        movieId,
        score
    })
    // This is what I first came up with. It works fine; just want to list both methods for learning
    // const newRating = await Rating.create({
    //     userId,
    //     movieId,
    //     score,
    // })
    res.json(rating)
    }
)

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));

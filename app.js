const express = require('express');
const dataStore = require('./dataStore');
const morgan = require('morgan')
const app = express();
app.use(morgan('dev'));


app.get('/apps', (req, res) => {
  const sortables = ['Rating', 'App']
  const genres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
  let serverData = dataStore
  if('genre' in req.query) {
    let genre = req.query.genre
    if(genres.includes(genre)){
      serverData = serverData.filter(obj => obj['Genres'] === genre)
    } else {
      res.status(404).send('Invalid genre')
      return
    }
  }
  if('sort' in req.query) {
    let sort = req.query.sort
    if(sortables.includes(sort)){
      serverData = serverData.sort((a,b) => {
        return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0
        if(sort === 'Rating') {
          severData = serverData.reverse()
        } else {
          res.status(404).send("error")
          return
        }
      })
    }
  }
  res.status(200).json(serverData)
})

module.exports = app

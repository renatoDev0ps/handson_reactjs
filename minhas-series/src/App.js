import React from 'react'
import Header from './Header'
import NewGenres from './NewGenres'
import UpdateGenres from './UpdateGenres'
import Genres from './genres'
import Home from './Home'
import Series from './Series'
import NewSeries from './NewSeries'
import UpdateSeries from './UpdateSeries'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/genres' exact component={Genres} />
          <Route path='/genres/new' exact component={NewGenres} />
          <Route path='/genres/:id' exact component={UpdateGenres} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/new' exact component={NewSeries} />
          <Route path='/series/:id' exact component={UpdateSeries} />          
        </Switch>
      </div>
    </Router>
  )
}

export default App

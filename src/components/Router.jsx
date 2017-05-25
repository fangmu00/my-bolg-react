import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Router } from 'react-router-dom'

import View from './View';
import ArticleList from './Article/ArticleList'

export default React.createClass({
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={View}>
            <Route path="/ArticleList" component={ArticleList} />
          </Route>
        </BrowserRouter>
      </div>
    )
  }
})


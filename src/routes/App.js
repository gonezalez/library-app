import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import ListBooks from '../pages/ListBooks'
import NewBook from '../pages/NewBook'
import Menu from '../component/Menu'

const App = () => (
    <BrowserRouter>
        <Menu />
        <Switch>
            <Route exact path="/" component={ListBooks} />
            <Route exact path="/book/:id" component={NewBook} />
            <Route exact path="/book/new" component={NewBook} />
        </Switch>
    </BrowserRouter>
)

export default App

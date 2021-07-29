import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import ListPage from 'pages/ListPage'
import DetailPage from 'pages/DetailPage'
import NewPage from 'pages/NewPage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} children={<ListPage />} />
        <Route exact path={'/list'} children={<ListPage />} />
        <Route exact path={'/post/:id'} children={<DetailPage />} />
        <Route exact path={'/post'} children={<NewPage />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

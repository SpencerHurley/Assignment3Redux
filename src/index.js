import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

const ListEditor = ({items}) => (
  <div>
    <h1>List Editor ({items.length})</h1>
    <ul>
      {items.map(item => (
        <li>{item.text}</li>
      ))}
    </ul>
  </div>
)

let initialState = {
  items: [{text: 'Item 1'}, {text: 'Item 2'}]
}
const reducer = (state = initialState) => {
  return state
}
const App = connect(state => ({items: state.items}))(ListEditor)
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
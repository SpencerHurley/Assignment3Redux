import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

const ListEditor = ({items, dispatch}) => (
  <div>
    <h1>List Editor ({items.length})</h1>
    <button onClick={e =>
      (dispatch({type: 'ADD_ITEM'}))
    }>Add Item</button>
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
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {items:
        [
          ...state.items,
          {text: 'New Item'}
        ]
      }
    default:
      return state
  }
}
const stateToPropsMapper = (state) => (
  {items: state.items}
)
const App = connect(stateToPropsMapper)(ListEditor)
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
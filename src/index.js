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
        <li key={item.id}>{item.text} {item.id}
          <button onClick={e => (
            dispatch({type: 'DELETE_ITEM', id: item.id})
          )}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
)

let id = 2
let initialState = {
  items: [{text: 'Item 1', id: 0}, {text: 'Item 2', id: 1}]
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {items:
        [
          ...state.items,
          {text: 'New Item', id: id++}
        ]
      }
    case 'DELETE_ITEM':
      // alert(action.id)
      return {
        items: state.items.filter(item => (item.id != action.id))
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
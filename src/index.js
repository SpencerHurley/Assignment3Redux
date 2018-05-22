import React from 'react'
import ReactDOM from 'react-dom'

const ListEditor = ({items}) => (
  <h1>List Editor ({items.length})</h1>
)

ReactDOM.render(
  <ListEditor items={
    [{text: 'Item 1'}, {text: 'Item 2'}]}/>,
  document.getElementById('root')
)
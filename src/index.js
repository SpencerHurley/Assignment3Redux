import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Heading = ({item}) => {
        if (item.size == "1") {
            return (
                <h1>{item.text}</h1>
            )
        }
        if (item.size == "2") {
            return (
                <h2>{item.text}</h2>
            )
        }
        if (item.size == "3") {
            return (
                <h3>{item.text}</h3>
            )
        }
        if (item.size == "4") {
            return (
                <h4>{item.text}</h4>
            )
        }
        if (item.size == "5") {
            return (
                <h5>{item.text}</h5>
            )
        }
        if (item.size == "6") {
            return (
                <h6>{item.text}</h6>
            )
        }
}

const Paragraph = ({item}) => (
    <p>{item.text}</p>
)
const List = ({item}) => {
    let listitems = item.text.split('|');
    return (
        <ul className="list-group">
            {listitems.map(e => (<li>e</li>))}
    </ul>
    )
}

const Link = ({item}) => (
    <a href={item.href}>{item.text}</a>
)

const Item = ({item, preview, dispatch}) => {
    console.log(item);
    if (preview) {
        if (item.widgetType == "HeadingWidget") {
            return (
                <li className="list-group-item" key={item.id}>
                    <Heading item={item}/>
                </li>
            )
        } else if (item.widgetType == "ParagraphWidget") {
            return (
                <li className="list-group-item" key={item.id}>
                    <Paragraph item={item}/>
                </li>
            )
        } else if (item.widgetType == "LinkWidget") {
            return (
                <li className="list-group-item" key={item.id}>
                    <Link item={item}/>
                </li>
            )
        } else if (item.widgetType == "ListWidget") {
            return (
                <li className="list-group-item" key={item.id}>
                    <List item={item}/>
                </li>
            )
        } else {
            return <li className="list-group-item"> </li>
        }
    } else {
        if (item.widgetType == "HeadingWidget") {
            return (
                <div className="list-group-item">
                    <h1>Heading widget</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Widget Name"/>
                    </div>
                    <h3>Preview:</h3>
                    <li className="list-group-item" key={item.id}>
                        <Heading item={item}/>
                    </li>
                </div>
            )
        } else if (item.widgetType == "ParagraphWidget") {
            return (
                <li className="list-group-item" key={item.id}>
                    <h1>Paragraph widget</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Widget Name"/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Paragraph content"/>
                    </div>
                    <h3>Preview:</h3>
                    <li className="list-group-item">
                        <Paragraph item={item}/>
                    </li>
                </li>
            )
        } else if (item.widgetType == "LinkWidget") {
            return (
                <li className="list-group-item" key={item.id}>
                    <h1>Link Widget</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Widget Name"/>
                    </div>
                    <li className="list-group-item">
                        <Link item={item}/>
                    </li>
                </li>
            )
        } else if (item.widgetType == "ListWidget") {
            return (
                <li className="list-group-item" key={item.id}>
                    <h1>List Widget</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Widget Name"/>
                    </div>
                    <h3>Preview</h3>
                    <li className="list-group-item">
                        <List item={item}/>
                    </li>
                </li>
            )
        } else {
            return <li className="list-group-item"> </li>
        }
    }
}
const ListItem = connect()(Item)

const findAllItems = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(items => dispatch({type: 'FIND_ALL_ITEMS', items: items}))
}
const addItem = dispatch => {
    dispatch({type: 'ADD_ITEM', title: 'New Item', itemType: 'Paragraph'})
}
const save = dispatch => {
    dispatch({type: 'SAVE_ITEMS'})
}

const switchPreview = dispatch => {
    dispatch({type: 'SAVE_PREVIEW'})
}

class ListEditor extends React.Component {
    constructor(props) {
        super(props)
        this.props.findAllItems()
    }
    render() {
        return (
            <div className="container align-content-right">
                <h1>List Editor ({this.props.items.length})</h1>
                <button className="btn btn-success" onClick={this.props.save}>Save</button>
                <label>
                    Preview:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.props.preview}
                        onChange={this.props.switchPreview} />
                </label>
                <ul className="list-group">
                    {this.props.items.map(item => (
                        <ListItem key={item.id} item={item} preview={this.props.preview}/>
                    ))}
                </ul>
                <button onClick={this.props.addItem}>Add Item
                </button>
            </div>
        )
    }
}

let id = 2;
let initialState = {
    items: [],
    preview: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FIND_ALL_ITEMS':
            return {
                items: action.items
            }
        case 'SAVE_ITEMS':
            fetch('http://localhost:8080/api/widget/save', {
                method: 'post',
                body: JSON.stringify(state.items),
                headers: {
                    'content-type': 'application/json'
                }
            })
        case 'SELECT_ITEM_TYPE':
            console.log(action.itemType);
            state.items = state.items.map(item => (
                item.id === action.id ? {
                    id: item.id,
                    itemType: action.itemType,
                    title: item.title
                }: item
            ))
            return JSON.parse(JSON.stringify(state))
        case 'SET_TITLE':
            console.log(action.title);
            return {
                items: state.items,
                title: action.title
            }
        case 'ADD_ITEM':
            return {items:
                    [
                        ...state.items,
                        { title: action.title,
                            id: id++,
                            itemType: action.itemType
                        }
                    ]
            }
        case 'DELETE_ITEM':
            return {
                items: state.items.filter(item => (item.id != action.id))
            }
        case 'SWITCH_PREVIEW':
            return {
                preview: !state.preview
            }
        default:
            return state
    }
}
const stateToPropsMapper = (state) => (
    {items: state.items, title: state.title , preview: state.preview}
)
const dispatcherToPropsMapper = dispatch => ({
    save: () => save(dispatch),
    findAllItems: () => findAllItems(dispatch),
    addItem: () => addItem(dispatch),
    switchPreview: () => switchPreview(dispatch)
})
const App = connect(stateToPropsMapper, dispatcherToPropsMapper)(ListEditor)
const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
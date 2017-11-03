// from https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer
})

export default rootReducer

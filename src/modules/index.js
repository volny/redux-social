// from https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import users from 'modules/users'
import modal from 'modules/modal'

const rootReducer = combineReducers({
  routing,
  users,
  modal,
})

export default rootReducer

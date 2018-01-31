import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const updateUserAction = user => ({type: UPDATE_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method, socketId) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, socketId })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      })
      .catch(error =>
        dispatch(getUser({error})))
 
export function updateUser (newUserObj, userId){
  return function thunk (dispatch) {
    return axios.put('/api/users', {newUserObj, userId})
      .then(updatedUser => {
        dispatch(updateUserAction(updatedUser.data))
      })
      .catch(err => console.log(err))
  }
}   

export const logout = (userId) =>
  dispatch =>
    axios.post('/auth/logout', {userId})
      .then(res => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case UPDATE_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

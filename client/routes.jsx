import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, NewStory, AddFriend} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData(this)
  }

  render () {
    const {isLoggedIn} = this.props
    return (
      <Router history={history}>
        <Main>
          { 
            //We set the state after loading the user (line 64)
            !this.state ? 
              <h1>LOADING...</h1> :
              <Switch>
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                {
                  isLoggedIn &&
                    <Switch>
                      <Route path='/home' component={UserHome} />
                      <Route path='/beginTheStory' component={NewStory} />
                      <Route path='/friends' component={AddFriend} />
                      <Redirect to='/home' />
                    </Switch>
                }
                {
                  isLoggedIn ? <Redirect to='/home' /> : <Redirect to='/login' />
                }
              </Switch>
          }
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isDoneLoading: false
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData (component) {
      dispatch(me())
      .then(res => {
        //This is where we say we are done loading by setting the setting the state.
        component.setState({isDoneLoading: true})
      })
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isDoneLoading: PropTypes.bool.isRequired,
}

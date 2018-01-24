import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, NewStory} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData(this)
    console.log(this.props.loadingUser, 'Loading?')
    console.log(this.props.isLoggedIn, 'Logged In?')
  }

  render () {
    const {isLoggedIn, loadingUser} = this.props

    return (
      <Router history={history}>
        <Main>
          {
            loadingUser ? 
              <h1>LOADING...</h1> :
              <Switch>
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                {
                  isLoggedIn &&
                    <Switch>
                      <Route path='/home' component={UserHome} />
                      <Route path='/beginTheStory' component={NewStory} />
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
    loadingUser: true
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData (component) {
      dispatch(me())
      .then(res => {
        component.setState({loadingUser:false})
        console.log('hi', component.props)
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
  isLoggedIn: PropTypes.bool.isRequired
}

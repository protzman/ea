import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import Amplify from 'aws-amplify'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route, withRouter } from 'react-router-dom'
import { spring, AnimatedSwitch } from 'react-router-transition'

import '../App.css'
import { theme } from '../mui_theme'
import NavigationBar from '../components/NavigationBar'
import ActionsDrawer from '../components/ActionsDrawer'
import Reports from '../components/Reports'

import Admin from '../components/Admin'
import Shop from '../components/Shop'
import Map from '../components/Map'
import Metrics from '../components/Metrics'
import LoginPage from '../components/LoginPage'
import SignupPage from '../components/SignupPage'
import ManageCapabilities from '../components/ManageCapabilities'

import Store from '../views/Store'
import Servers from '../views/Servers'
import EventView from '../views/EventView'

import { fetchUserRequest } from '../actions'
import awsexports from '../aws-exports'

Amplify.configure(awsexports)

const styles = ({
  // theme already delcared in upper scope so just use styles
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
    zIndex: 1300
  },
  snackbarDrawerClosed: {
    marginBottom: '-4px',
    marginLeft: '67px',
    position: 'absolute',
    zIndex: 1300
  },
  snackbarDrawerOpen: {
    marginBottom: '-4px',
    marginLeft: '235px',
    position: 'absolute',
    zIndex: 1300
  },
  snackbarContent: {
    width: 700,
    background: theme.palette.text.primary,
    color: theme.palette.background.paper,
    opacity: 0.5
  },
})

function mapStyles(stylez) {
  return {
    opacity: stylez.opacity,
    transform: `translateX(${stylez.offset}%)`,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginTop: '84px',
    position: 'absolute'
  }
}
function glide(val) {
  return spring(val, {
    stiffness: 174,
    damping: 24,
  })
}

const pageTransitions = {
  atEnter: {
    offset: 100,
    opacity: 0,
  },
  atLeave: {
    offset: glide(-100),
    opacity: glide(0),
  },
  atActive: {
    offset: glide(0),
    opacity: glide(1),
  },
}
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      snack: false,
      loggedin: false
    }
  }

  handleClick = () => {
    console.log('snack time!')
    this.setState({ snack: true })
  }

  handleClose = () => {
    this.setState({ snack: false })
  }

  toggleDrawer() {
    console.log('called')
    this.setState({ open: !this.state.open })
  }

  loginRequest(e) {
    this.setState({ loggedin: true })
    console.log('making user request')
    this.props.fetchUserRequest(e)
    this.props.history.push('/store')
  }


  render() {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>

        <div className="App">

          <NavigationBar
            title="Self Service Continuous Monitoring"
            loggedin={this.state.loggedin}
            route={this.props.history.location.pathname}
            open={this.state.open}
            toggleDrawer={() => this.toggleDrawer()}
          />

          {this.state.loggedin ? <ActionsDrawer
            open={this.state.open}
            onRequestClose={boolean => this.setState({ open: boolean })}
          /> : ''}

          <Snackbar
            open={this.state.snack}
            autoHideDuration={6000}
            onClose={this.handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            SnackbarContentProps={{
              'aria-describedby': 'snackbar-fab-message-id',
              className: classes.snackbarContent,
            }}
            message={
              <span><b>ALERT : </b>firewall breach at 213.433.23.54</span>
            }
            action={
              <Button color="inherit" size="small" onClick={this.handleClose}>
                Dismiss
              </Button>
            }
            className={this.state.open ? classes.snackbarDrawerOpen : classes.snackbarDrawerClosed}
          />
          <AnimatedSwitch
            atEnter={pageTransitions.atEnter}
            atLeave={pageTransitions.atLeave}
            atActive={pageTransitions.atActive}
            mapStyles={mapStyles}
          >
            <Route exact path="/" render={() => <LoginPage login={e => this.loginRequest(e)} />} />
            <Route exact path="/Store" component={Store} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/metrics" component={Metrics} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/reports" component={Reports} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/capabilities" component={ManageCapabilities} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/servers" component={Servers} />
            <Route exact path="/servers/event" component={EventView} />
          </AnimatedSwitch>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchUserRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { login } = true
  // just bullshit
  return { login }
}

const mapDispatchToProps = dispatch => ({
  fetchUserRequest(login) {
    // dispatch the action FETCH_USER_REQUEST
    dispatch(fetchUserRequest(login))
  }
})


const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(App)

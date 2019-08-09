import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import PersonIcon from '@material-ui/icons/Accessibility'
import LockIcon from '@material-ui/icons/Close'


const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  }
})

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: ''
    }
  }

  handleUseridChange(e) {
    console.log('userchange')
    this.setState({ userid: e.target.value })
  }

  handleCreateAccount() {
    console.log('creating account')
    this.props.history.push('/threats')
  }

  handleForgotPassword() {
    console.log('forgot password')
  }

  render() {
    const { classes } = this.props
    return (
      <div className="logincontainer absolute top right left bottom" >
        <div className="logincontent">
          <div>
            <Typography variant="display1" classes={{ root: classes.root }} >
            Self Service Continuous Monitoring
            </Typography>
          </div>
          <div className="loginitem">
            <Button
              fullWidth
              variant="flat"
              color="primary"
              className={classes.button}
              onClick={() => this.props.login(this.state.userid)}
            >
                authenticate with geoaxis
            </Button>
          </div>
          <div className="loginitem">
            <Input
              fullWidth
              placeholder="user id"
              value={this.state.userid}
              onChange={e => this.handleUseridChange(e)}
              inputProps={{ 'aria-label': 'Description' }}
              classes={{ root: classes.root }}
            />
          </div>
          <div className="loginitem">
            <Input
              fullWidth
              placeholder="password"
              type="password"
              inputProps={{ 'aria-label': 'Description' }}
              classes={{ root: classes.root }}
            />
          </div>
          <div style={{ marginTop: '1.5em' }}>
            <Button
              fullWidth
              variant="flat"
              color="primary"
              className={classes.button}
              onClick={() => this.props.login(this.state.userid)}
            >
                login
            </Button>
          </div>
          <div className="loginitem" style={{ position: 'inline' }}>
            <Typography variant="caption" classes={{ root: classes.root }}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={this.handleForgotPassword}
                role="button"
                aria-hidden
              >Forgot Password?
              </span>
              <span style={{ margin: '0 1em' }}>|</span>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => this.props.history.push('/signup')}
                role="button"
                aria-hidden
              >Create Account
              </span>
            </Typography>

          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const enhance = compose(
  withRouter,
  withStyles(styles)
)

export default enhance(LoginPage)

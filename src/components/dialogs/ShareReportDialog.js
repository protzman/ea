import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
    whiteSpace: 'pre'
  },
})

class ShareReportDialog extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <DialogTitle id="regenerate-dialog-title">Share Report</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="regenerate-dialog-description"
            classes={{ root: classes.root }}
          >
            Send a copy of this report to the email listed below
          </DialogContentText>
          <div className="loginitem">
            <Input
              autoFocus
              autoComplete="off"
              id="email"
              placeholder="email"
              type="email"
              classes={{ root: classes.root }}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.cancelDialog()} color="primary">
              Cancel
          </Button>
          <Button onClick={() => this.props.confirmDialog()} color="primary">
              Send
          </Button>
        </DialogActions>
      </div>
    )
  }
}
ShareReportDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  confirmDialog: PropTypes.func.isRequired,
  cancelDialog: PropTypes.func.isRequired
}

const enhance = compose(withStyles(styles))
export default enhance(ShareReportDialog)

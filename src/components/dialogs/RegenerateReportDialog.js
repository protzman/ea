import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

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

class RegenerateReportDialog extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <DialogTitle id="regenerate-dialog-title">Regenerate Report</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="regenerate-dialog-description"
            classes={{ root: classes.root }}
          >
            {`${this.props.report.name} was generated previously on \n\n${this.props.report.date}\n\nDo you want to generate and download the report again?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.cancelDialog()} color="primary">
              No
          </Button>
          <Button onClick={() => this.props.confirmDialog()} color="primary">
              Yes, Generate
          </Button>
        </DialogActions>
      </div>
    )
  }
}
RegenerateReportDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  confirmDialog: PropTypes.func.isRequired,
  cancelDialog: PropTypes.func.isRequired
}

const enhance = compose(withStyles(styles))
export default enhance(RegenerateReportDialog)

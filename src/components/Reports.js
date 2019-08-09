import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'

import ReactTooltip from 'react-tooltip'

import ReportTable from './ReportTable'
import NewReportDialog from './dialogs/NewReportDialog'

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
    zIndex: 1300
  },
  listItemTooltip: {
    color: '#2E3440'
  },
  dialog: {
    width: '50%'
  },
})

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newDialog: false
    }
  }

  handleClickOpen() {
    this.setState({ newDialog: true })
  }

  handleNewDialogClose() {
    this.setState({ newDialog: false })
  }

  handleCloseDialog() {
    console.log('close')
  }

  generate() {
    console.log('generating')
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div
          className="content absolute top right left bottom"
          style={{ overflowY: 'auto' }}
        >
          <ReportTable />
        </div>
        <Button
          variant="fab"
          classes={{ root: classes.fab }}
          onClick={() => this.handleClickOpen()}
          data-tip=""
          data-for="new-chart"
        >
          <AddIcon />
        </Button>
        <ReactTooltip
          id="new-chart"
          place="right"
          type="light"
          effect="solid"
          className="tooltip"
          getContent={() => (
            <ListItem dense>
              <ListItemText primary="Generate new report" classes={{ primary: classes.listItemTooltip }} />
            </ListItem>
      )}
        />

        <Dialog
          id="new-report-dialog"
          open={this.state.newDialog}
          onClose={() => this.handleNewDialogClose()}
          aria-labelledby="new-dialog-title"
          aria-describedby="new-dialog-description"
          classes={{ paper: classes.dialog }}
        >
          <NewReportDialog
            cancelDialog={this.handleCloseDialog}
            confirmDialog={() => this.generate()}
          />
        </Dialog>
      </div>
    )
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Reports)

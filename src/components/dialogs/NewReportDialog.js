import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import format from 'date-fns/format'

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
    whiteSpace: 'pre',
    '&:focus': {
      background: 'none'
    }
  },
  inputs: {
    flex: 1
  }
})

class NewReportDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      today: format(new Date(), 'YYYY-MM-DD'),
      age: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDateChange = (date) => {
    this.setState({ date })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <DialogTitle id="regenerate-dialog-title">Generate New Report</DialogTitle>
        <DialogContent>
          <div className="loginitem">
            <Input
              autoFocus
              autoComplete="off"
              id="title"
              placeholder="report title"
              type="text"
              classes={{ root: classes.root }}
              fullWidth
            />
          </div>
          <div className="loginitem">
            <Input
              autoComplete="off"
              id="description"
              placeholder="description"
              type="text"
              classes={{ root: classes.root }}
              fullWidth
            />
          </div>
          <div className="loginitem" style={{ display: 'flex' }}>
            <Input
              id="date"
              type="date"
              defaultValue={this.state.today}
              classes={{ root: classes.root }}
              style={{ marginRight: '1em' }}
              fullWidth

            />
            <Select
              value={this.state.age}
              onChange={this.handleChange}
              inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
              classes={{ root: classes.root, }}
              style={{ marginLeft: '1em' }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.cancelDialog()} color="primary">
              Cancel
          </Button>
          <Button onClick={() => this.props.confirmDialog()} color="primary">
              Genereate
          </Button>
        </DialogActions>
      </div>
    )
  }
}

NewReportDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  cancelDialog: PropTypes.func.isRequired,
  confirmDialog: PropTypes.func.isRequired
}

const enhance = compose(withStyles(styles))
export default enhance(NewReportDialog)

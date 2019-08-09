import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import IconButton from '@material-ui/core/IconButton'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Dialog from '@material-ui/core/Dialog'

import SaveIcon from '@material-ui/icons/VerticalAlignBottom'
import SendIcon from '@material-ui/icons/Send'
import MoreIcon from '@material-ui/icons/MoreVert'

import faker from 'faker'
import RegenerateReportDialog from './dialogs/RegenerateReportDialog'
import ShareReportDialog from './dialogs/ShareReportDialog'


const HeaderTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.text.primary,
    fontSize: 16,
  }
}))(TableCell)

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  dialog: {
    width: '50%'
  },
  table: {
    minWidth: 700,
  },
  tableCell: {
    textOverflow: 'ellipsis'
  },
  paddingNone: {
    paddingLeft: 0,
    paddingRight: 0
  }
})

let id = 0
function createData(name, description, date, events, author) {
  id += 1
  return {
    id, name, description, date, events, author
  }
}

function generateData() {
  const fakedata = []
  let x = 0
  while (x < 100) {
    fakedata.push({
      id: x,
      name: _.capitalize(faker.lorem.words()),
      description: `${faker.lorem.words()}  ${faker.lorem.words()}  ${faker.lorem.words()} ${faker.lorem.words()}  ${faker.lorem.words()}  ${faker.lorem.words()}`,
      date: faker.date.past().toString(),
      events: faker.random.number() * 10,
      author: `${faker.name.firstName()} ${faker.name.lastName()}`
    })
    x += 1
  }
  console.log(fakedata)
  return fakedata
}

const data = generateData()

class ReportTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      activeRow: null,
      currentReport: {},
      regenerateDialog: false,
      shareDialog: false
    }
  }

  handleClick(event, rowId) {
    this.setState({ anchorEl: event.currentTarget, activeRow: rowId })
  }

  handleRegenerateReport(rowInfo) {
    this.setState({
      activeRow: null,
      currentReport: rowInfo,
      regenerateDialog: true,
      anchorEl: null,
    })
  }

  handleShareReport(rowInfo) {
    this.setState({
      activeRow: null,
      currentReport: rowInfo,
      shareDialog: true,
      anchorEl: null,
    })
  }

  handleClose = () => {
    this.setState({ anchorEl: null, activeRow: null })
  }

  regenerate() {
    this.setState({ regenerateDialog: false })
    alert(`regenerating report for ${this.state.currentReport.name}`)
    this.handleClose()
  }

  share() {
    this.setState({ shareDialog: false })
    this.handleClose()
  }

  handleCloseDialog() {
    this.setState({
      regenerateDialog: false,
      shareDialog: false
    })
    this.handleClose()
  }


  render() {
    const { classes } = this.props
    return (
      <div>
        <Table classes={{ root: classes.table }}>
          <TableHead >
            <TableRow >
              <HeaderTableCell classes={{ head: classes.head }} >Report Name</HeaderTableCell>
              <HeaderTableCell>Desciption</HeaderTableCell>
              <HeaderTableCell>Date Created</HeaderTableCell>
              <HeaderTableCell>Events</HeaderTableCell>
              <HeaderTableCell>Author</HeaderTableCell>
              <HeaderTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  <div className="cell-overflow">
                    {n.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="cell-overflow">
                    {n.description}
                  </div>
                </TableCell>
                <TableCell >
                  <div className="cell-overflow">
                    {n.date}
                  </div>
                </TableCell>
                <TableCell >{n.events}</TableCell>
                <TableCell >
                  <div className="cell-overflow">
                    {n.author}
                  </div>
                </TableCell>
                <TableCell >
                  <IconButton
                    aria-label="more"
                    aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={e => this.handleClick(e, n.id)}
                  >
                    <MoreIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={n.id === this.state.activeRow}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={() => this.handleRegenerateReport(n)}>
                      <ListItemIcon>
                        <SaveIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Regenerate Report" />
                    </MenuItem>
                    <MenuItem onClick={() => this.handleShareReport(n)}>
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Share Report" />
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          id="regenerate-report-dialog"
          open={this.state.regenerateDialog}
          onClose={this.handleRegenerateDialogClose}
          aria-labelledby="regenerate-dialog-title"
          aria-describedby="regenerate-dialog-description"
          classes={{ paper: classes.dialog }}
        >
          <RegenerateReportDialog
            report={this.state.currentReport}
            confirmDialog={() => this.regenerate()}
            cancelDialog={() => this.handleCloseDialog()}
          />
        </Dialog>

        <Dialog
          id="share-report-dialog"
          open={this.state.shareDialog}
          onClose={this.handleShareDialogClose}
          aria-labelledby="share-dialog-title"
          aria-describedby="share-dialog-description"
          classes={{ paper: classes.dialog }}
        >
          <ShareReportDialog
            report={this.state.currentReport}
            cancelDialog={() => this.handleCloseDialog()}
            confirmDialog={() => this.share()}
          />
        </Dialog>
      </div>
    )
  }
}

ReportTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReportTable)

import React, { Component } from 'react'
import { compose } from 'redux'
import { PropTypes } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import faker from 'faker'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Badge from '@material-ui/core/Badge'


import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import ChevronIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'

import Drawer from '@material-ui/core/Drawer'

import { Line } from 'react-chartjs-2'

import EventList from '../components/EventList'

const styles = theme => ({
  badge: {
    width: '12px',
    height: '12px',
    top: '-6px',
    right: '-6px',
    fontSize: '0.6em'
  },
  secondary: {
    color: theme.palette.text.primary
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

const chartOptions = {
  maintainAspectRatio: true,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{ gridLines: { display: false } }],
    yAxes: [{ gridLines: { display: false } }]
  }
}

const colors = [
  {
    light: 'rgba(143,188,187,0.1)',
    dark: 'rgba(143,188,187,1)'
  },
  {
    light: 'rgba(136,192,208,0.1)',
    dark: 'rgba(136,192,208,1)'
  },
  {
    light: 'rgba(129,161,193,0.1)',
    dark: 'rgba(129,161,193,1)',
  }
]

const chartData = {
  type: 'Line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(143,188,187,0.1)',
        borderColor: 'rgba(143,188,187,1)',
        borderWidth: 2,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(143,188,187,0.1)',
        pointBackgroundColor: 'rgba(143,188,187,1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(143,188,187,1)',
        pointHoverBorderColor: 'rgba(143,188,187,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: [134234234, 156475645, 94645667, 34345235, 85435344, 89863745, 85634857, 34756376, 87532474, 9430029, 7334633, 343756]
      }
    ]
  }
}

const ics = [
  { type: 'Authentication Event', name: 'Logon Success' },
  { type: 'Authentication Event', name: 'Logon Failure' },
  { type: 'Authentication Event', name: 'Logoff Success' },
  { type: 'File & Object Event', name: 'Create Success' },
  { type: 'File & Object Event', name: 'Create Failure' },
  { type: 'File & Object Event', name: 'Access Success' },
  { type: 'File & Object Event', name: 'Access Failure' },
  { type: 'File & Object Event', name: 'Delete Success' },
  { type: 'File & Object Event', name: 'Delete Failure' },
  { type: 'File & Object Event', name: 'Modify Success' },
  { type: 'File & Object Event', name: 'Modify Failure' },
  { type: 'File & Object Event', name: 'Permission Modifications Success' },
  { type: 'File & Object Event', name: 'Permission Modifications Failure' },
  { type: 'File & Object Event', name: 'Ownership Modifications Success' },
  { type: 'File & Object Event', name: 'ownership Modifications Failure' },
  { type: 'External Device Event', name: 'Write to External Media Success' },
  { type: 'External Device Event', name: 'Write to External Media Failure' },
  { type: 'External Device Event', name: 'Upload from External Media Success' },
  { type: 'External Device Event', name: 'Upload from External Media Failure' },
  { type: 'User & Group Management Event', name: 'User Add Success' },
  { type: 'User & Group Management Event', name: 'User Add Failure' },
  { type: 'User & Group Management Event', name: 'User Delete Success' },
  { type: 'User & Group Management Event', name: 'User Delete Failure' },
  { type: 'User & Group Management Event', name: 'User Modify Success' },
  { type: 'User & Group Management Event', name: 'User Modify Failure' },
  { type: 'User & Group Management Event', name: 'User Suspend Success' },
  { type: 'User & Group Management Event', name: 'User Suspend Failure' },
  { type: 'User & Group Management Event', name: 'User Lock Success' },
  { type: 'User & Group Management Event', name: 'User Lock Failure' },
  { type: 'User & Group Management Event', name: 'Group / Role Add Success' },
  { type: 'User & Group Management Event', name: 'Group / Role Add Failure' },
  { type: 'User & Group Management Event', name: 'Group / Role Delete Success' },
  { type: 'User & Group Management Event', name: 'Group / Role Delete Failure' },
  { type: 'User & Group Management Event', name: 'Group / Role Modify Success' },
  { type: 'User & Group Management Event', name: 'Group / Role Modify Failure' },
  { type: 'Use of Privileged / Special Rights Event', name: 'Security or Audit Policy Change Success' },
  { type: 'Use of Privileged / Special Rights Event', name: 'Security or Audit Policy Change Failure' },
  { type: 'Use of Privileged / Special Rights Event', name: 'Configuration Change Success' },
  { type: 'Use of Privileged / Special Rights Event', name: 'Configuration Change Failure' },
  { type: 'System Event', name: 'Admin or Root Access Success' },
  { type: 'System Event', name: 'Admin or Root Access Failure' },
  { type: 'System Event', name: 'Privilege / Role Escalation Success' },
  { type: 'System Event', name: 'Privilege / Role Escalation Failure' },
  { type: 'System Event', name: 'Audit and Log Data Access Success' },
  { type: 'System Event', name: 'Audit and Log Data Access Failure' },
  { type: 'System Event', name: 'System Reboot, Restart & Shutdown Success' },
  { type: 'System Event', name: 'System Reboot, Restart & Shutdown Failure' },
  { type: 'System Event', name: 'Print to Device Success' },
  { type: 'System Event', name: 'Print to Device Failure' },
  { type: 'System Event', name: 'Print to File Success' },
  { type: 'System Event', name: 'Print to File Failure' },
  { type: 'System Event', name: 'Application Initialization Success' },
  { type: 'System Event', name: 'Application Initialization Failure' },
  { type: 'System Event', name: 'Export Information Success' },
  { type: 'System Event', name: 'Export Information Failure' },
  { type: 'System Event', name: 'Import Information Success' },
  { type: 'System Event', name: 'Import Information Failure' },
]

function generateData() {
  const fakeData = []
  let x = 0
  while (x < 15) {
    fakeData.push({
      id: x,
      name: `NGA-${faker.finance.bitcoinAddress().substring(0, 9)}`,
      ip: `${faker.internet.ipv6()}`,
      events: faker.random.number()
    })
    x += 1
  }
  return fakeData
}

const data = generateData()

const HeaderTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.text.primary,
    fontSize: 16,
  }
}))(TableCell)


class Servers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className="content absolute top right left bottom" style={{ overflowY: 'auto' }} >
          <Grid container spacing={24} alignItems="stretch">
            <Grid item xs={4} md={3}>
              <div style={{ position: 'relative', height: 'calc(100vh - 126px)', overflowY: 'auto' }}>
                <Typography gutterBottom variant="headline" component="h2">
                Servers
                </Typography>

                <Typography paragraph>
                These are the existing servers within the foo-bar application. If you are not seeing one in the list please select the help option from the toolbar to contact an admin.
                </Typography>
                <Typography paragraph>
                  <List>
                    {data.map(n => (
                      <ListItem button>
                        <ListItemText primary={n.name} secondary={n.ip} classes={{ secondary: classes.secondary }} />
                        {n === data[2] ?
                          (<ListItemSecondaryAction>
                            <IconButton>
                              <ChevronIcon />
                            </IconButton>
                           </ListItemSecondaryAction>)
                      :
                      ''}
                      </ListItem>
                    ))}
                  </List>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8} md={9}>
              <div style={{ position: 'relative', height: 'calc(100vh - 126px)', overflowY: 'auto' }}>
                <Typography gutterBottom variant="headline" component="h2">
                  {data[2].name} Server Events
                </Typography>
                <Grid container alignItems="stretch">
                  <Line data={chartData.data} height={50} options={chartOptions} />
                  <Typography gutterBottom variant="headline" component="h2" style={{ paddingTop: '20px' }}>
                ICS 500-27 Breakdown
                  </Typography>

                  <Table classes={{ root: classes.table }}>
                    <TableHead >
                      <TableRow >
                        <HeaderTableCell classes={{ head: classes.head }} >Event Category</HeaderTableCell>
                        <HeaderTableCell>Name</HeaderTableCell>
                        <HeaderTableCell>Count</HeaderTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ics.map(n => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <div className="cell-overflow">
                              {n.type}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="cell-overflow">
                              {n.name}
                            </div>
                          </TableCell>
                          <TableCell >{faker.random.number() * 10}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                </Grid>
              </div>
            </Grid>
          </Grid>
          <EventList open={this.state.open} />
        </div>
      </div>
    )
  }
}

const enhance = compose(withStyles(styles, { withTheme: true }))

export default enhance(Servers)

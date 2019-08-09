import React, { Component } from 'react'
import { compose } from 'redux'
import { PropTypes } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ReactTooltip from 'react-tooltip'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import CloudOffIcon from '@material-ui/icons/CloudOff'
import HearingIcon from '@material-ui/icons/Hearing'
import StarIcon from '@material-ui/icons/Star'
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import TimelineIcon from '@material-ui/icons/Timeline'

import FingerprintIcon from '@material-ui/icons/Fingerprint'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import LeakAddIcon from '@material-ui/icons/LeakAdd'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import WhatsHotIcon from '@material-ui/icons/Whatshot'
import SettingsIcon from '@material-ui/icons/Settings'


import { withRouter } from 'react-router-dom'


const styles = theme => ({
  badge: {
    width: '12px',
    height: '12px',
    top: '-6px',
    right: '-6px',
    fontSize: '0.6em'
  },
  tooltip: {
    marginLeft: '77px'
  },
  listItemTooltip: {
    color: '#2E3440'
  },
  spacer: {
    flex: 1
  },
  gutters: {
    paddingLeft: '24px',
    paddingRight: '24px'
  }
})

class ActionsDrawerIcons extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <List component="nav">
          <ListItem classes={{ gutters: classes.gutters }} button data-tip="" onClick={() => this.props.history.push('/reports')}>
            <ListItemIcon>
              <Badge classes={{ badge: classes.badge }} badgeContent="" color="error">
                <WhatsHotIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Recent Reports" />
          </ListItem>
          <ReactTooltip
            place="right"
            type="light"
            effect="solid"
            className="tooltip"
            getContent={() => (
              <ListItem dense>
                <ListItemIcon classes={{ root: classes.listItemTooltip }}>
                  <NotificationsActiveIcon />
                </ListItemIcon>
                <ListItemText primary="3 new notifications." classes={{ primary: classes.listItemTooltip }} />
              </ListItem>
          )}
          />
          <ListItem button>
            <ListItemIcon>
              <FingerprintIcon />
            </ListItemIcon>
            <ListItemText primary="Darknet Detection" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push('/metrics')}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Network Metrics" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GpsFixedIcon />
            </ListItemIcon>
            <ListItemText primary="Watchlist Alerting" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push('/servers')}>
            <ListItemIcon>
              <LeakAddIcon />
            </ListItemIcon>
            <ListItemText primary="Beacon Detection" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push('/map')}>
            <ListItemIcon>
              <VpnLockIcon />
            </ListItemIcon>
            <ListItemText primary="Data Exfiltration" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push('/servers/event')}>
            <ListItemIcon>
              <CloudOffIcon />
            </ListItemIcon>
            <ListItemText primary="Top-N Lists" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Protocol Violation" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsInputComponentIcon />
            </ListItemIcon>
            <ListItemText primary="IPv6 Tunnel Detection" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HearingIcon />
            </ListItemIcon>
            <ListItemText primary="Web Redirection Detection" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Network Profiling" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Whitelist Generation" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Hide Trace" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push('/admin')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    )
  }
}

ActionsDrawerIcons.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true })
)

export default enhance(ActionsDrawerIcons)

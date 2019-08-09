import React, { Component } from 'react'
import { compose } from 'redux'
import { PropTypes } from 'prop-types'

import faker from 'faker'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'

import { Responsive, WidthProvider } from 'react-grid-layout'

import CapabilityCard from './CapabilityCard'

const ResponsiveGridLayout = WidthProvider(Responsive)

const styles = theme => ({
  root: {
    color: theme.palette.background.paper
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
})


function generateCapabilities() {
  const ar = []
  for (let x = 0; x < 15; x += 1) {
    ar.push({
      i: x, x: 0, y: 0, isResizeable: true, isDraggable: true
    })
  }
  return ar
}

const cards = generateCapabilities()

class ManageCapabilities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [
        'recentReports',
        'darknetDetection',
        'whitelistGeneration',
        'networkProfiling',
        'topnLists',
        'dataExfiltration',
        'ipv6TunnelDetection',
        'beaconDetection',
        'networkMetrics',
        'webRedirectionDetection'
      ],
      layout: {
        lg: cards
      }
    }
  }

    handleToggle = value => () => {
      const { checked } = this.state
      const currentIndex = checked.indexOf(value)
      const newChecked = [...checked]

      if (currentIndex === -1) {
        newChecked.push(value)
      } else {
        newChecked.splice(currentIndex, 1)
      }

      this.setState({
        checked: newChecked,
      })
    }

    render() {
      const { classes } = this.props
      return (
        <div
          className="content absolute top right left bottom"
          style={{ overflowY: 'auto' }}
        >
          <Grid container spacing={24} alignItems="stretch">
            <Grid item xs={4} md={3}>
              <div style={{ position: 'relative', height: 'calc(100vh - 126px)', overflowY: 'auto' }}>
                <Typography gutterBottom variant="headline" component="h2">
                Existing Capabilities
                </Typography>

                <Typography paragraph>
                These are the existing capabilities you have available. You can toggle these to get access to them in the toolbar on the left.
                </Typography>
                <Typography paragraph>
                  <List>
                    <ListItem>
                      <ListItemText primary="Recent Reports" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('recentReports')}
                          checked={this.state.checked.indexOf('recentReports') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Darknet Detection" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('darknetDetection')}
                          checked={this.state.checked.indexOf('darknetDetection') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Network Metrics" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('networkMetrics')}
                          checked={this.state.checked.indexOf('networkMetrics') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Watchlist Alerting" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('watchlistAlerting')}
                          checked={this.state.checked.indexOf('watchlistAlerting') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Beacon Detection" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('beaconDetection')}
                          checked={this.state.checked.indexOf('beaconDetection') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Data Exfiltration" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('dataExfiltration')}
                          checked={this.state.checked.indexOf('dataExfiltration') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Top-N Lists" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('topnLists')}
                          checked={this.state.checked.indexOf('topnLists') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Protocol Violation" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('protocolViolation')}
                          checked={this.state.checked.indexOf('protocolViolation') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Domain Tree Mapping" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('domainTreeMapping')}
                          checked={this.state.checked.indexOf('domainTreeMapping') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="IPv6 Tunnel Detection" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('ipv6TunnelDetection')}
                          checked={this.state.checked.indexOf('ipv6TunnelDetection') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Web Redirection Detection" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('webRedirectionDetection')}
                          checked={this.state.checked.indexOf('webRedirectionDetection') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Network Profiling" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('networkProfiling')}
                          checked={this.state.checked.indexOf('networkProfiling') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Whitelist Generation" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('whitelistGeneration')}
                          checked={this.state.checked.indexOf('whitelistGeneration') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Hide Trace" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('hideTrace')}
                          checked={this.state.checked.indexOf('hideTrace') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Bluetooth" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('bluetooth')}
                          checked={this.state.checked.indexOf('bluetooth') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Bluetooth" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('bluetooth')}
                          checked={this.state.checked.indexOf('bluetooth') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Heuristic Test For Spam Detection" />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('heuristictestSpam')}
                          checked={this.state.checked.indexOf('heuristictestSpam') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8} md={9}>
              <div style={{ position: 'relative', height: 'calc(100vh - 126px)', overflowY: 'auto' }}>
                <Typography gutterBottom variant="headline" component="h2">
                Discover New Capabilities
                </Typography>
                <Grid container alignItems="stretch">
                  {cards.map(n => (
                    <Grid item xs={4}>
                      <CapabilityCard key={n.i} />
                    </Grid>
                    ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      )
    }
}

ManageCapabilities.propTypes = {
  classes: PropTypes.object.isRequired
}

const enhance = compose(withStyles(styles, { withTheme: true }))

export default enhance(ManageCapabilities)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import faker from 'faker'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 300

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: `calc((100vh - 84px) - 10px)`,
    marginTop: '10px',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    background: theme.palette.background.paper
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  secondary: {
    color: theme.palette.text.primary
  },
})

class EventList extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Drawer
          variant="temporary"
          anchor="right"
          classes={{ paper: classes.drawerPaper }}
          onClose={() => this.props.onRequestClose(false)}
          open={this.props.open}
        >
          <Typography gutterBottom variant="headline" component="h2">
            NGA-3D97ELEZB
          </Typography>
          <Typography paragraph>
            External Device Event - Write to External Media Failure
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`User ${faker.random.number()} failed to logon to NGA-3D97ELEZB`}
                secondary={`${faker.date.recent()}`}
                classes={{ secondary: classes.secondary }}
              />
            </ListItem>
          </List>
        </Drawer>
      </div>
    )
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(EventList)

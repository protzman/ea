import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import faker from 'faker'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import classnames from 'classnames'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'

import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Chip from '@material-ui/core/Chip'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'

import LockCloseIcon from '@material-ui/icons/Close'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import StoreIcon from '@material-ui/icons/Store'
import QueryIcon from '@material-ui/icons/Dvr'
import RequestPermissions from '@material-ui/icons/GroupAdd'
import MailIcon from '@material-ui/icons/MailOutline'
import TrashIcon from '@material-ui/icons/Delete'

import { userSelector } from '../selectors'

import background from '../trianglify.png'

const HeaderTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.text.primary,
    fontSize: 16,
  }
}))(TableCell)

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.text.primary,
  },
  input: {
    color: theme.palette.text.primary,
  },
  list: {
    overflow: 'auto',
  },
  divider: {
    background: theme.palette.text.primary
  },
  media: {
    height: 0,
    paddingTop: '6em', // 16:9
  },
  card: {
    justifyContent: 'center'
  },
  avatar: {
    justifyContent: 'center',
    width: '2em',
    height: '2em',
    fontSize: '3em',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
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
  },
  disabled: {
    color: '#4C566A'
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  deleteIcon: {
    color: theme.palette.background.paper
  }
})


function generateData() {
  const fakedata = []
  let x = 0
  while (x < 12) {
    fakedata.push({
      id: x,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: `${faker.internet.email()}`,
      date: faker.date.past().toString(),
    })
    x += 1
  }
  return fakedata
}

const data = generateData()

function genChips() {
  const chipsar = []
  for (let x = 0; x < 6; x += 1) {
    chipsar.push({
      id: x,
      team: faker.commerce.color()
    })
  }
  return chipsar
}

const chips = genChips()

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      personal: true,
      agency: false,
      editEmail: false,
      editPhone: false,
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber()
    }
  }

  handlePersonalClick = () => {
    this.setState(state => ({ personal: !state.personal }))
  }

  handleAgencyClick = () => {
    this.setState(state => ({ agency: !state.agency }))
  }

  handleMouseDownEmail = (event) => {
    event.preventDefault()
  }

  handleMouseDownPhone = (event) => {
    event.preventDefault()
  }

  handleClickEditEmail = () => {
    this.setState(state => ({ editEmail: !state.editEmail }))
  }

  handleClickEditPhone = () => {
    this.setState(state => ({ editPhone: !state.editPhone }))
  }


  render() {
    const { classes } = this.props
    return (
      <div
        className="content absolute top right left bottom"
        style={{ overflowY: 'auto' }}
      >
        <Grid container spacing={24} alignItems="stretch">
          <Grid item xs>
            <CardMedia
              className={classes.media}
              image={background}
              title="Contemplative Reptile"
            />
            <Avatar
              classes={{ root: classes.avatar }}
              alt="user"
              src={this.props.user.avatar_url}
              style={{ marginTop: '-1em', marginLeft: '24px' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={24} alignItems="stretch">
          <Grid item xs>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.user.name}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Personal Information"
                />
                <ListItemSecondaryAction>
                  <IconButton
                    className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.personal
                        })}
                    onClick={this.handlePersonalClick}
                    aria-expanded={this.state.personal}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Collapse in={this.state.personal} timeout="auto" unmountOnExit>
              <Typography paragraph>
                <InputLabel
                  classes={{ root: classes.root }}
                >Email
                </InputLabel>
                <Input
                  fullWidth
                  type="text"
                  disableUnderline
                  disabled={!this.state.editEmail}
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  classes={{ root: classes.root, disabled: classes.disabled }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle-edit-email"
                        onClick={this.handleClickEditEmail}
                        onMouseDown={this.handleMouseDownEmail}
                      >
                        {this.state.editEmail ? <LockOpenIcon /> : <LockCloseIcon />}
                      </IconButton>
                    </InputAdornment>
                      }
                />
              </Typography>
              <Typography paragraph>
                <InputLabel
                  classes={{ root: classes.root }}
                >Phone Number
                </InputLabel>
                <Input
                  fullWidth
                  type="text"
                  disableUnderline
                  disabled={!this.state.editPhone}
                  value={this.state.phoneNumber}
                  onChange={e => this.setState({ phoneNumber: e.target.value })}
                  classes={{ root: classes.root, disabled: classes.disabled }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle-edit-phone"
                        onClick={this.handleClickEditPhone}
                        onMouseDown={this.handleMouseDownPhone}
                      >
                        {this.state.editPhone ? <LockOpenIcon /> : <LockCloseIcon />}
                      </IconButton>
                    </InputAdornment>
                      }
                />
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                <InputLabel
                  classes={{ root: classes.root }}
                >Current Teams
                </InputLabel>
                <div style={{ marginTop: '1em' }}>
                  {chips.map(n => (
                    <Chip
                      key={n.key}
                      label={n.team}
                      onDelete={() => alert('leaving team')}
                      classes={{ root: classes.chip, deleteIcon: classes.deleteIcon }}
                    />
                      ))}
                </div>
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </Collapse>
            <List>
              <ListItem>
                <ListItemText
                  primary="Agency Information"
                />
                <ListItemSecondaryAction>
                  <IconButton
                    className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.agency
                        })}
                    onClick={this.handleAgencyClick}
                    aria-expanded={this.state.agency}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Collapse in={this.state.agency} timeout="auto" unmountOnExit>
              <Typography paragraph variant="body2">
                Method:
              </Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </Collapse>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="headline" component="h2">
                Team Members
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <HeaderTableCell >Name</HeaderTableCell>
                  <HeaderTableCell >Email</HeaderTableCell>
                  <HeaderTableCell >Last Active</HeaderTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(n => (
                  <TableRow key={n.id}>
                    <TableCell >{n.name}</TableCell>
                    <TableCell >{n.email}</TableCell>
                    <TableCell >{n.date}</TableCell>
                  </TableRow>
            ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="headline" component="h2">
            Account Actions
            </Typography>
            <Typography paragraph>
              {faker.lorem.paragraphs()}
            </Typography>
            <Typography paragraph>
              <List>
                <ListItem button>
                  <ListItemText primary="Request Permissions" />
                  <ListItemIcon>
                    <RequestPermissions />
                  </ListItemIcon>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Contact Support" />
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Manage Queries" />
                  <ListItemIcon>
                    <QueryIcon />
                  </ListItemIcon>
                </ListItem>
                <ListItem
                  button
                  onClick={() => this.props.history.push('/admin/capabilities')}
                >
                  <ListItemText primary="Manage Capabilities" />
                  <ListItemIcon>
                    <StoreIcon />
                  </ListItemIcon>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Delete Profile" />
                  <ListItemIcon>
                    <TrashIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            </Typography>
            <CardActions>
              <Button size="small" color="primary">
            Share
              </Button>
              <Button size="small" color="primary">
            Learn More
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: userSelector(state)
  }
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles)
)

export default enhance(Admin)


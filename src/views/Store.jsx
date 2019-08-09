import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'

import AddIcon from '@material-ui/icons/Add'

import NewItem from './NewItem'
import EditItem from './EditItem'
import Item from '../components/Item'

import {
  fetchItemsRequest,
  postItemRequest,
  putItemRequest,
  deleteItemRequest
} from '../actions'

import { itemsSelector } from '../selectors'

const uuidv1 = require('uuid/v1')

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
    width: '400px'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
    zIndex: 1300
  },
})

class Store extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newModal: false,
      editModal: false
    }
  }

  componentDidMount() {
    this.props.fetchItemsRequest()
  }

  handleClickOpenNew = () => {
    this.setState({ newModal: true })
  }

  handleClickOpenEdit(item) {
    console.log('edit:', item)
    this.setState({
      editModal: true,
      activeItem: item
    })
  }

  createItem(options) {
    console.log(options)

    const newItem = {
      ID: uuidv1(),
      name: options.name,
      price: options.price,
      description: options.description
    }
    this.props.postItemRequest(newItem)
    this.setState({ newModal: false })
  }


  handleClose =() => {
    this.setState({
      newModal: false,
      editModal: false
    })
  }

  editItem(item) {
    this.props.putItemRequest(item)
    this.setState({ editModal: false })
  }

  deleteItem(id) {
    this.props.deleteItemRequest(id)
    this.setState({ editModal: false })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div
          className="content absolute top right left bottom"
          style={{ overflowY: 'auto' }}
        >
          <Grid container spacing={24} style={{ paddingTop: '2em' }} >
            {_.map(this.props.items, item => (
              <Grid key={item.ID} item xs={6} lg={3}>
                <Item
                  item={item}
                  handleClickOpenEdit={() => this.handleClickOpenEdit(item)}
                />
              </Grid>
          ))}
          </Grid>
        </div>
        <Button variant="fab" className={classes.fab} onClick={this.handleClickOpenNew} data-tip="" data-for="new-chart">
          <AddIcon />
        </Button>
        <Dialog
          id="new-item-dialog"
          open={this.state.newModal}
          onClose={this.handleClose}
          TransitionComponent={this.Transition}
          aria-labelledby="form-dialog-title"
          classes={{ paper: classes.root }}
        >
          <NewItem
            style={{ width: '400px' }}
            createItem={options => this.createItem(options)}
            handleClose={() => this.handleClose()}
          />
        </Dialog>

        <Dialog
          id="edit-item-dialog"
          open={this.state.editModal}
          onClose={this.handleClose}
          TransitionComponent={this.Transition}
          aria-labelledby="form-dialog-title"
          classes={{ paper: classes.root }}
        >
          <EditItem
            style={{ width: '400px' }}
            item={this.state.activeItem}
            editItem={item => this.editItem(item)}
            deleteItem={id => this.deleteItem(id)}
            handleClose={() => this.handleClose()}
          />
        </Dialog>
      </div>
    )
  }
}

Store.propTypes = {
  fetchItemsRequest: PropTypes.func.isRequired,
  postItemRequest: PropTypes.func.isRequired,
  putItemRequest: PropTypes.func.isRequired,
  deleteItemRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    items: itemsSelector(state)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchItemsRequest () {
    dispatch(fetchItemsRequest())
  },
  postItemRequest(item) {
    dispatch(postItemRequest(item))
  },
  putItemRequest(item) {
    dispatch(putItemRequest(item))
  },
  deleteItemRequest(id) {
    dispatch(deleteItemRequest(id))
  }
})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Store)

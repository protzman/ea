import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  chartitem: {
    flex: 1, display: 'inline', marginLeft: '16px', textAlign: 'center'
  }
})

class EditItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ID: this.props.item.ID,
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description
    }
  }

  handleChange = (event) => {
    const { target } = event
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <div className="loginitem">
              <Input
                autoFocus
                id="metric-name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Item Name"
                type="text"
                classes={{ root: classes.root }}
                fullWidth
              />
            </div>
            <div className="loginitem">
              <Input
                id="metric-price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                placeholder="Item Price"
                type="text"
                classes={{ root: classes.root }}
                fullWidth
              />
            </div>
            <div className="loginitem">
              <Input
                id="metric-description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Item Description"
                type="text"
                classes={{ root: classes.root }}
                fullWidth
              />
            </div>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.handleClose()} color="primary">
              Cancel
          </Button>
          <Button onClick={() => this.props.editItem(this.state)} color="primary">
              Edit
          </Button>
          <Button onClick={() => this.props.deleteItem(this.state.ID)} color="primary">
              Delete
          </Button>
        </DialogActions>
      </div>
    )
  }
}

EditItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  createItem: PropTypes.func.isRequired
}

const enhance = compose(withStyles(styles))
export default enhance(EditItem)

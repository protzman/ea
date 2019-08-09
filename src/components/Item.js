import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    background: theme.palette.background.paper
  }
})

class Item extends Component {
  render() {
    const { item, classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="headline">
              {item.name}
            </Typography>
            <Typography gutterBottom variant="subheading">
              ${item.price}
            </Typography>
            <Typography component="p">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => this.props.handleClickOpenEdit(item)}>
                  Edit
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Item)

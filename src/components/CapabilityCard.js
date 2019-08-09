import React, { Component } from 'react'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import faker from 'faker'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Trianglify from 'trianglify'


const styles = theme => ({
  root: {
    color: theme.palette.background.paper
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
})

class CapabilityCard extends Component {
  render() {
    const { classes } = this.props

    return (
      <div key={this.props.key} style={{ padding: '1em' }}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={Trianglify({ cell_size: 75, x_colors: 'random' }).png()}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {faker.lorem.words()}
            </Typography>
            <Typography component="p">
              {faker.lorem.paragraphs()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
                        Purchase
            </Button>
            <Button size="small" color="primary">
                        Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const enhance = compose(withStyles(styles, { withTheme: true }))

export default enhance(CapabilityCard)


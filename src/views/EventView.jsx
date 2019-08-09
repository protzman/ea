import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default class EventView extends Component {
  render() {
    return (
      <div className="content absolute top right left bottom" style={{ overflowY: 'auto' }} >
        <Grid container spacing={24} alignItems="stretch">
          <Grid item xs={4} md={3}>
            <Typography gutterBottom variant="headline" component="h2">
              Servers
            </Typography>
        External Device Event
Write to External Media Failure
93930
NGA-3D97ELEZB
          </Grid>
        </Grid>
      </div>
    )
  }
}

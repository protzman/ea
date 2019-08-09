import React, { Component } from 'react'
import Backdrop from '@material-ui/core/Modal'
import { CircularProgress } from '@material-ui/core/CircularProgress'

class LoadScreen extends Component {
  render() {
    return (
      <div>
        <CircularProgress color="primary" className="loading" size={200} />
        <Backdrop open style={{ zIndex: 1502 }} />
      </div>
    )
  }
}
export default LoadScreen

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Checkbox from '@material-ui/core/Checkbox'
import Donut from '@material-ui/icons/DonutLarge'
import Pie from '@material-ui/icons/PieChart'
import Line from '@material-ui/icons/Timeline'
import Bar from '@material-ui/icons/Equalizer'

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  group: {
    margin: '8px 0',
  },
  chartitem: {
    flex: 1, display: 'inline', marginLeft: '16px', textAlign: 'center'
  }
})

class NewChartDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      chart: null,
      trackedMetric: '',
      trackedPeriod: ''
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
        <DialogTitle id="form-dialog-title">Configure New Metric</DialogTitle>
        <DialogContent>
          <DialogContentText classes={{ root: classes.root }}>
              Select from the options below to create a new metric that will be displayed on your dashboard
          </DialogContentText>
          <form autoComplete="off">
            <div className="loginitem">
              <Input
                autoFocus
                id="metric-name"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="metric name"
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
                placeholder="metric description"
                type="text"
                classes={{ root: classes.root }}
                fullWidth
              />
            </div>
            <div className="loginitem">
              <FormControl component="fieldset" fullWidth required className={classes.formControl}>
                <RadioGroup
                  aria-label="gender"
                  name="chart"
                  className={classes.group}
                  value={this.state.chart}
                  onChange={this.handleChange}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <FormControlLabel
                    value="donut"
                    className={classes.chartitem}
                    control={<Checkbox icon={<Donut />} checkedIcon={<Donut />} />}
                    label="Donut Chart"
                  />
                  <FormControlLabel
                    value="pie"
                    className={classes.chartitem}
                    control={<Checkbox icon={<Pie />} checkedIcon={<Pie />} />}
                    label="Pie Chart"
                  />
                  <FormControlLabel
                    value="bar"
                    className={classes.chartitem}
                    control={<Checkbox icon={<Bar />} checkedIcon={<Bar />} />}
                    label="Bar Chart"
                  />
                  <FormControlLabel
                    value="line"
                    className={classes.chartitem}
                    control={<Checkbox icon={<Line />} checkedIcon={<Line />} />}
                    label="Line Chart"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="loginitem" style={{ display: 'flex' }}>

              <FormControl fullWidth style={{ marginRight: '1em' }}>
                <Select
                  name="trackedMetric"
                  value={this.state.trackedMetric}
                  onChange={this.handleChange}
                  classes={{ root: classes.root }}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Tracked Metric</MenuItem>
                  <MenuItem value="metricOne">Metric One</MenuItem>
                  <MenuItem value="metricTwo">Metric Two</MenuItem>
                  <MenuItem value="metricThree">Metric Three</MenuItem>
                  <MenuItem value="metricFour">Metric Four</MenuItem>
                  <MenuItem value="metricFive">Metric Five</MenuItem>
                  <MenuItem value="metricSix">Metric Six</MenuItem>
                  <MenuItem value="metricSeven">Metric Seven</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                style={{ marginLeft: '1em' }}
              >
                <Select
                  name="trackedPeriod"
                  value={this.state.trackedPeriod}
                  onChange={this.handleChange}
                  classes={{ root: classes.root }}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Tracked Period</MenuItem>
                  <MenuItem value="week">Past Week</MenuItem>
                  <MenuItem value="month">Past Month</MenuItem>
                  <MenuItem value="year">Past Year</MenuItem>
                </Select>
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
          <Button onClick={() => this.props.generateMetric(this.state)} color="primary">
              Create
          </Button>
        </DialogActions>
      </div>
    )
  }
}

NewChartDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  generateMetric: PropTypes.func.isRequired
}

const enhance = compose(withStyles(styles))
export default enhance(NewChartDialog)

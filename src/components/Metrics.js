import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import TimelineIcon from '@material-ui/icons/Timeline'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

import { Doughnut, Bar, Line, HorizontalBar } from 'react-chartjs-2'
import { Responsive, WidthProvider } from 'react-grid-layout'

import ReactTooltip from 'react-tooltip'

import faker from 'faker'

import NewChartDialog from './dialogs/NewChartDialog'

import {
  fetchMetricRequest,
  postMetricRequest,
  putMetricRequest,
  deleteMetricRequest
} from '../actions'

import { metricsSelector } from '../selectors'

const ResponsiveGridLayout = WidthProvider(Responsive)

const genereateData = (n) => {
  const fakedata = []
  let x = 0
  while (x < n) {
    fakedata.push(faker.random.number())
    x += 1
  }
  return fakedata
}
const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      gridLines: { display: false },
      display: false
    }],
    yAxes: [{
      gridLines: { display: false },
      display: false
    }]
  },
  xAxes: [{
    ticks: {
      display: false // this will remove only the label
    }
  }]

}
const networks = ['AIS', 'CISCP', 'FEDGOV']
const colors = [
  {
    light: 'rgba(143,188,187,0.1)',
    dark: 'rgba(143,188,187,1)'
  },
  {
    light: 'rgba(136,192,208,0.1)',
    dark: 'rgba(136,192,208,1)'
  },
  {
    light: 'rgba(129,161,193,0.1)',
    dark: 'rgba(129,161,193,1)',
  }
]

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  clearIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  activeIcon: {
    position: 'absolute',
    top: 0,
    right: 48
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
    zIndex: 1300
  },
  listItemTooltip: {
    color: '#2E3440'
  }
})

class Metrics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      layout: {
        lg: [{
          i: 'a', x: 0, y: 0, w: 4, h: 3, isResizeable: true
        },
        {
          i: 'd', x: 6, y: 0, w: 8, h: 3, isResizeable: true
        },
        {
          i: 'c', x: 0, y: 4, w: 12, h: 2, isResizeable: true
        }]
      },
      modal: false,
      closeDialog: false,
      metricToDelete: {
        key: '',
        title: ''
      },
      // metrics: [
      //   {
      //     key: 'c',
      //     title: 'Firewall Breaches Over Time',
      //     type: 'Line',
      //     layout: {
      //       i: 'c', x: 0, y: 4, w: 6, h: 4, isResizeable: true
      //     },
      //     data: {
      //       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'],
      //       datasets: [
      //         {
      //           label: 'Plutonium Network',
      //           fill: true,
      //           lineTension: 0.5,
      //           backgroundColor: 'rgba(143,188,187,0.1)',
      //           borderColor: 'rgba(143,188,187,1)',
      //           borderWidth: 2,
      //           borderCapStyle: 'butt',
      //           borderDash: [],
      //           borderDashOffset: 0.0,
      //           borderJoinStyle: 'miter',
      //           pointBorderColor: 'rgba(143,188,187,0.1)',
      //           pointBackgroundColor: 'rgba(143,188,187,1)',
      //           pointBorderWidth: 1,
      //           pointHoverRadius: 5,
      //           pointHoverBackgroundColor: 'rgba(143,188,187,1)',
      //           pointHoverBorderColor: 'rgba(143,188,187,1)',
      //           pointHoverBorderWidth: 2,
      //           pointRadius: 2,
      //           pointHitRadius: 10,
      //           data: genereateData(12)
      //         },
      //         {
      //           label: 'Titanium Network',
      //           fill: true,
      //           lineTension: 0.5,
      //           backgroundColor: 'rgba(136,192,208,0.1)',
      //           borderColor: 'rgba(136,192,208,1)',
      //           borderWidth: 2,
      //           borderCapStyle: 'butt',
      //           borderDash: [],
      //           borderDashOffset: 0.0,
      //           borderJoinStyle: 'miter',
      //           pointBorderColor: 'rgba(136,192,208,0.1)',
      //           pointBackgroundColor: 'rgba(136,192,208,1)',
      //           pointBorderWidth: 1,
      //           pointHoverRadius: 5,
      //           pointHoverBackgroundColor: 'rgba(136,192,208,1)',
      //           pointHoverBorderColor: 'rgba(136,192,208,1)',
      //           pointHoverBorderWidth: 2,
      //           pointRadius: 2,
      //           pointHitRadius: 10,
      //           data: genereateData(12)
      //         },
      //         {
      //           label: 'Uranium Network',
      //           fill: true,
      //           lineTension: 0.5,
      //           backgroundColor: 'rgba(129,161,193,0.1)',
      //           borderColor: 'rgba(129,161,193,1)',
      //           borderWidth: 2,
      //           borderCapStyle: 'butt',
      //           borderDash: [],
      //           borderDashOffset: 0.0,
      //           borderJoinStyle: 'miter',
      //           pointBorderColor: 'rgba(129,161,193,0.1)',
      //           pointBackgroundColor: 'rgba(129,161,193,1)',
      //           pointBorderWidth: 1,
      //           pointHoverRadius: 5,
      //           pointHoverBackgroundColor: 'rgba(129,161,193,1)',
      //           pointHoverBorderColor: 'rgba(129,161,193,1)',
      //           pointHoverBorderWidth: 2,
      //           pointRadius: 2,
      //           pointHitRadius: 10,
      //           data: genereateData(12)
      //         },
      //       ]
      //     }
      //   },
      //   {
      //     key: 'd',
      //     title: 'Weekly IP Traffic',
      //     type: 'Bar',
      //     data: {
      //       labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      //       datasets: [
      //         {
      //           label: 'Plutonium Network',
      //           backgroundColor: 'rgba(143,188,187,0.2)',
      //           borderColor: 'rgba(143,188,187,1)',
      //           borderWidth: 2,
      //           hoverBackgroundColor: 'rgba(143,188,187,0.4)',
      //           hoverBorderColor: 'rgba(143,188,187,1)',
      //           data: genereateData(7)
      //         },
      //         {
      //           label: 'Titanium Network',
      //           backgroundColor: 'rgba(136,192,208,0.2)',
      //           borderColor: 'rgba(136,192,208,1)',
      //           borderWidth: 2,
      //           hoverBackgroundColor: 'rgba(136,192,208,0.4)',
      //           hoverBorderColor: 'rgba(136,192,208,1)',
      //           data: genereateData(7)
      //         },
      //         {
      //           label: 'Uranium Network',
      //           backgroundColor: 'rgba(129,161,193,0.2)',
      //           borderColor: 'rgba(129,161,193,1)',
      //           borderWidth: 2,
      //           hoverBackgroundColor: 'rgba(129,161,193,0.4)',
      //           hoverBorderColor: 'rgba(129,161,193,1)',
      //           data: genereateData(7)
      //         }
      //       ]
      //     }
      //   },
      //   {
      //     key: 'a',
      //     title: 'Intrusions Per Network',
      //     type: 'Doughnut',
      //     data: {
      //       labels: [
      //         'Plutonium',
      //         'Titanium',
      //         'Uranium'
      //       ],
      //       datasets: [{
      //         data: genereateData(3),
      //         backgroundColor: [
      //           'rgba(143,188,187,0.2)',
      //           'rgba(136,192,208,0.2)',
      //           'rgba(129,161,193,0.2)'
      //         ],
      //         hoverBackgroundColor: [
      //           'rgba(143,188,187,0.4)',
      //           'rgba(136,192,208,0.4)',
      //           'rgba(129,161,193,0.4)'
      //         ],
      //         borderColor: ['rgba(143,188,187,1)', 'rgba(136,192,208,1)', 'rgba(129,161,193,1)'],
      //         hoverBorderColor: ['rgba(143,188,187,1)', 'rgba(136,192,208,1)', 'rgba(129,161,193,1)'],
      //       }]
      //     }
      //   }
      // ]
    }
  }

  componentDidMount() {
  }

  handleClickOpen = () => {
    this.setState({ modal: true })
  };

  handleClose = () => {
    this.setState({ modal: false })
  }

  showRemoveMetricDialog = (metricInfo) => {
    this.setState({
      closeDialog: true,
      metricToDelete: {
        key: metricInfo.key,
        title: metricInfo.title
      }
    })
  }

  toggleLiveData = (metricInfo) => {
    if (metricInfo.live) {
      // turn off
    } else {
      // turn on

    }
  }

  confirmRemoveMetric = () => {
    console.log('confirm delete')
    this.setState(prevState => ({
      metrics: prevState.metrics.filter(metric => metric.key !== this.state.metricToDelete.key),
      closeDialog: false
    }))
  }

  getLabels(period) {
    switch (period) {
      case 'week':
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        break
      case 'month':
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
        break
      case 'year':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December']
        break
    }
  }

  generateMetric(config) {
    console.log('generating metric...')
    let newMetric = {}
    console.log(config.chart)
    switch (config.chart) {
      case 'line': {
        const key = faker.random.uuid()
        newMetric = {
          key,
          title: config.title,
          type: 'Line',
          live: false,
          layout: {
            i: key, x: 0, y: 4, w: 6, h: 4, isResizeable: true
          },
          data: {
            labels: this.getLabels(config.trackedPeriod),
            datasets: []
          },
        }
        const datasets = []
        _.forEach(networks, (network, i) => {
          console.log(network, i)
          let data = []
          switch (config.trackedPeriod) {
            case 'week':
              data = genereateData(7)
              break
            case 'month':
              data = genereateData(30)
              break
            case 'year':
              data = genereateData(12)
              break
            default:
              data = []
              break
          }
          datasets.push({
            label: network,
            fill: true,
            lineTension: 0.5,
            backgroundColor: colors[i].light,
            borderColor: colors[i].dark,
            borderWidth: 2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors[i].light,
            pointBackgroundColor: colors[i].dark,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colors[i].dark,
            pointHoverBorderColor: colors[i].dark,
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data
          })
        })
        newMetric.data.datasets = datasets
        const newMetricPosition = {
          i: key, x: 0, y: 7, w: 12, h: 3, isResizeable: true
        }
        this.setState({
          // metrics: [...this.state.metrics, newMetric],
          layout: {
            ...this.state.layout,
            lg: [...this.state.layout.lg, newMetricPosition]
          }
        })
        console.log(newMetric)
        this.props.postMetricRequest(newMetric)
        // ? ---------------------- end of the line case ---------------------- ? //
        break
      }
      case 'donut': {
        const key = faker.random.uuid()
        newMetric = {
          key,
          title: config.title,
          type: 'Doughnut',
          live: false,
          layout: {
            i: key, x: 0, y: 4, w: 4, h: 4, isResizeable: true
          },
          data: {
            labels: this.getLabels(config.trackedPeriod),
            datasets: []
          },
        }
        const datasets = []
        _.forEach(networks, (network, i) => {
          console.log(network, i)
          let data = []
          switch (config.trackedPeriod) {
            case 'week':
              data = genereateData(7)
              break
            case 'month':
              data = genereateData(30)
              break
            case 'year':
              data = genereateData(12)
              break
            default:
              data = []
              break
          }
          datasets.push({
            label: network,
            fill: true,
            lineTension: 0.5,
            backgroundColor: colors[i].light,
            borderColor: colors[i].dark,
            borderWidth: 2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors[i].light,
            pointBackgroundColor: colors[i].dark,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colors[i].dark,
            pointHoverBorderColor: colors[i].dark,
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data
          })
        })
        newMetric.data.datasets = datasets
        const newMetricPosition = {
          i: key, x: 0, y: 0, w: 4, h: 4, isResizeable: true
        }
        this.setState({
          // metrics: [...this.state.metrics, newMetric],
          layout: {
            ...this.state.layout,
            lg: [...this.state.layout.lg, newMetricPosition]
          }
        })
        console.log(newMetric)
        this.props.postMetricRequest(newMetric)
        // ? ---------------------- end of the line case ---------------------- ? //
        break
      }
      case 'bar': {
        const key = faker.random.uuid()
        newMetric = {
          key,
          title: config.title,
          type: 'Bar',
          live: false,
          layout: {
            i: key, x: 0, y: 4, w: 6, h: 4, isResizeable: true
          },
          data: {
            labels: this.getLabels(config.trackedPeriod),
            datasets: []
          },
        }
        const datasets = []
        _.forEach(networks, (network, i) => {
          console.log(network, i)
          let data = []
          switch (config.trackedPeriod) {
            case 'week':
              data = genereateData(7)
              break
            case 'month':
              data = genereateData(30)
              break
            case 'year':
              data = genereateData(12)
              break
            default:
              data = []
              break
          }
          datasets.push({
            label: network,
            fill: true,
            lineTension: 0.5,
            backgroundColor: colors[i].light,
            borderColor: colors[i].dark,
            borderWidth: 2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors[i].light,
            pointBackgroundColor: colors[i].dark,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colors[i].dark,
            pointHoverBorderColor: colors[i].dark,
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data
          })
        })
        newMetric.data.datasets = datasets
        const newMetricPosition = {
          i: key, x: 0, y: 7, w: 12, h: 3, isResizeable: true
        }
        this.setState({
          // metrics: [...this.state.metrics, newMetric],
          layout: {
            ...this.state.layout,
            lg: [...this.state.layout.lg, newMetricPosition]
          }
        })
        console.log(newMetric)
        this.props.postMetricRequest(newMetric)
        // ? ---------------------- end of the line case ---------------------- ? //
        break
      }
      default:
        console.log('error creating metric')
    }
    this.setState({ modal: false })
  }

  Transition = props => <Slide direction="up" {...props} />

  /**
   * Render a grid item for react-gird-layout with a specific chart inside of it
   * @param chart The data and source information about the chart to be created inside of the grid item.
   * @returns A grid item with a chart inside of it.
   */
  renderGridItem = chart => (
    <div key={chart.key} style={{ paddingBottom: '3em', paddingRight: '1em', paddingLeft: '1em' }}>
      <Typography variant="headline" classes={{ root: this.props.classes.root }}>
        {chart.title}
        {
          chart.live ?
            <IconButton className={this.props.classes.activeIcon} color="primary">
              <PauseIcon onClick={() => this.toggleLiveData(chart)} />
            </IconButton> :
            <IconButton className={this.props.classes.activeIcon} color="primary">
              <PlayIcon onClick={() => this.toggleLiveData(chart)} />
            </IconButton>
      }
        <IconButton className={this.props.classes.clearIcon} color="primary">
          <ClearIcon onClick={() => this.showRemoveMetricDialog(chart)} />
        </IconButton>
      </Typography>
      {this.renderChart(chart)}
    </div>
  )

  /**
   * Render a chart based on the chart type.
   * @param chart The data and source information about the chart to be created.
   * @returns A specified chart component.
   */
  renderChart = (chart) => {
    switch (chart.type) {
      case 'Doughnut':
        return <Doughnut data={chart.data} options={{ maintainAspectRatio: false }} />
      case 'Line':
        return (<Line data={chart.data} options={chartOptions} />)
      case 'HorizontalBar':
        return <HorizontalBar data={chart.data} options={chartOptions} />
      case 'Bar':
        return (<Bar data={chart.data} options={chartOptions} />)
      default:
        return (<div>chart error</div>)
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className="content absolute top right left bottom" style={{ overflowY: 'auto' }} >
          <ResponsiveGridLayout
            className="layout"
            layouts={this.state.layout}
            rowHeight={100}
            autoSize
            breakpoints={{ lg: 1200 }}
            cols={{ lg: 12 }}
          >
            {_.map(this.props.metrics, metric => this.renderGridItem(metric))}
          </ResponsiveGridLayout>
        </div>
        <Button variant="fab" className={classes.fab} onClick={this.handleClickOpen} data-tip="" data-for="new-chart">
          <TimelineIcon />
        </Button>
        <ReactTooltip
          id="new-chart"
          place="right"
          type="light"
          effect="solid"
          className="tooltip"
          getContent={() => (
            <ListItem dense>
              <ListItemText primary="Add new chart to dashboard" classes={{ primary: classes.listItemTooltip }} />
            </ListItem>
      )}
        />
        <Dialog
          id="new-metric-dialog"
          open={this.state.modal}
          onClose={this.handleClose}
          TransitionComponent={this.Transition}
          aria-labelledby="form-dialog-title"
        >
          <NewChartDialog generateMetric={config => this.generateMetric(config)} />
        </Dialog>
        <Dialog
          id="delete-metric-dialog"
          open={this.state.closeDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Remove Metric</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              classes={{ root: classes.root }}
            >
          Are you sure you want to remove the metric '<b>{this.state.metricToDelete.title}</b>' from your current dashboard view?'
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ closeDialog: false })} color="primary">
          Keep
            </Button>
            <Button onClick={this.confirmRemoveMetric} color="primary" autoFocus>
          Yes, Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
  }
}

Metrics.propTypes = {
  classes: PropTypes.object.isRequired,
  postMetricRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    metrics: metricsSelector(state)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMetricRequest(id) {
    dispatch(fetchMetricRequest(id))
  },
  postMetricRequest(metric) {
    console.log('posting metric to redux state')
    dispatch(postMetricRequest(metric))
  },
  putMetricRequest(metric) {
    dispatch(putMetricRequest(metric))
  },
  deleteMetricRequest(id) {
    dispatch(deleteMetricRequest(id))
  }
})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(Metrics)

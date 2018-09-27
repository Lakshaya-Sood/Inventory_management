import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as dashboardActions from '../store/dashboard/actions'
import DashboardLayout from '../components/dashboard'

class DashboardContainer extends Component {
  componentDidMount () {
    // fetch main data for this page here
    this.props.fetchData()
  }

  render () {
    return (
      <DashboardLayout {...this.props} />
    )
  }
}

// setup the props that we want to pass down to the components
// ownprop contains route params
function mapStateToProps (state, ownProps) {
  const { apps } = state.dashboard
  return {
    apps
  }
}

// setup the functions that we want to pass down to the components
function mapDispatchToProps (dispatch) {
  return ({
    fetchData: () => {
      dispatch(dashboardActions.fetchData())
    }
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)

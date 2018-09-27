import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductLayout from '../components/product'

class ProductContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
        // here we fetch data for the entire page using redux actions
  }

  render () {
    return (
      <ProductLayout
        {...this.props} />
    )
  }
}

// which props do we want to inject, given the global store state?
// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
// ownProps contains route params
function mapStateToProps (state, ownProps) {
  return {
    sampleProp: 'sample value'
  }
}

export default connect(mapStateToProps)(ProductContainer)

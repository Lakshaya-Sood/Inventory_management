import React, { Component } from 'react'
import { connect } from 'react-redux'
import RecipeLayout from '../components/recipe'

class RecipesContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
        // here we fetch data for the entire page using redux actions
  }

  render () {
    return (
      <RecipeLayout
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

export default connect(mapStateToProps)(RecipesContainer)

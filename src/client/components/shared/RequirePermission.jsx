import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

const propTypes = {
  userAccount: PropTypes.shape({
    authorization: PropTypes.array
  }),
  requiredPermission: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}

const defaultProps = {
  userAccount: {},
  requiredPermission: ''
}

class RequirePermission extends React.Component {
  render () {
    const props = this.props
    const { requiredPermission } = props
    const { authorization } = props.userAccount

     // no permissions are provided, it's safe to render children
    if (!requiredPermission || !requiredPermission.length) {
      return props.children
    }

    // no auth information is present, return a null
    if (!authorization) {
      return null
    }

    if (typeof requiredPermission === 'string') { // Input is a string
      if (_.find(authorization, function (o) { return o[requiredPermission] })) {
        return props.children
      }
    }

    if (Array.isArray(requiredPermission)) { // Input is an array of one or more permissions
      for (let index = 0; index < requiredPermission.length; index++) {
        if (_.find(authorization, function (o) { return o[requiredPermission[index]] })) {
          return props.children
        }
      }
    }

    return null
  }
}

// setup the props that we want to pass down to the components
function mapStateToProps (state, ownProps) {
  const { userAccount } = state
  return {
    userAccount
  }
}

RequirePermission.defaultProps = defaultProps
RequirePermission.propTypes = propTypes

export default connect(mapStateToProps)(RequirePermission)
export { PERMISSIONS } from '../../constants/constants'

// @Authorization HOC wether or not user sees a page

import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Unauthorized from './components/shared/Unauthorized'

export default function Authorization (allowedRoles) {
  return WrappedComponent => {
    class WithAuthorization extends Component {
      render () {
        const { authorization } = this.props

        let jsx = <Unauthorized />

        _.forEach(allowedRoles, (role) => {
          if (_.find(authorization, (item) => { return item[role] })) {
                        // user has atleast one permission
            jsx = <WrappedComponent {...this.props} />
          }
        })
        return jsx
      }
        };

    function mapStateToProps (state, ownProps) {
      const { authorization } = state.userAccount
      return {
        authorization
      }
    }
        // setup the props that we want to pass down to the components
    return connect(mapStateToProps)(WithAuthorization)
  }
};

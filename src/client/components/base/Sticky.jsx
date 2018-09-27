import React, { Component } from 'react'
import { Link } from 'react-router'
import { Sidney, SidneyOption } from 'ssp-ui'
import PropTypes from 'prop-types'
import RequirePermission from '../shared/RequirePermission'
import autoBind from 'react-autobind'

const propTypes = {
  menuDefs: PropTypes.array,
  handleUserProfileClick: PropTypes.func,
  handleExpandClick: PropTypes.func,
  isExpanded: PropTypes.bool
}

const defaultProps = {
  menuDefs: [],
  handleUserProfileClick: () => {},
  handleExpandClick: () => {},
  isExpanded: false
}

class Sticky extends Component {

  render () {
    const { menuDefs } = this.props
    let pathname

    if (__CLIENT__) pathname = document.location.pathname

    const sidneyOptions = menuDefs.map((item) => (
      <RequirePermission key={item.key} requiredPermission={item.permissions}>
        <Link to={item.link}>
          <SidneyOption
            expand={this.props.isExpanded}
            selected={item.link === pathname}
            icon={<item.Icon />}
            label={item.title} />
        </Link>
      </RequirePermission>
    ))

    return (
      <div>
        <Sidney
          notificationCount={this.props.notificationCount}
          onLogoClick={() => {}}
          onUserProfileClick={this.props.handleUserProfileClick}
          onExpandClick={this.props.handleExpandClick}
          expand={this.props.isExpanded}
          appVersion={__APPVERSION__}>
          { sidneyOptions }
        </Sidney>
      </div>
    )
  }
}

Sticky.defaultProps = defaultProps
Sticky.propTypes = propTypes

export default Sticky

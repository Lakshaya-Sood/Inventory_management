import React, {Component} from 'react'
import Sticky from './Sticky'
import { Heather } from 'ssp-ui'
import Drawer from './Drawer'
import ProfileDrawer from './ProfileDrawer'
import AppsIcon from 'ssp-ui/svg-icons/AllApps'
import SettingsIcon from 'ssp-ui/svg-icons/Settings'
import EditIcon from 'ssp-ui/svg-icons/Edit'
import autoBind from 'react-autobind'

const menuDefs = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    Icon: AppsIcon,
    link: '/dashboard',
    permissions: []
  },
  {
    key: 'settings',
    title: 'Product',
    Icon: EditIcon,
    link: '/product-management',
    permissions: []
  },
  {
    key: 'inventory',
    title: 'Recipes',
    Icon: SettingsIcon,
    link: '/recipe-management',
    permissions: []
  },
  {
    key: 'reports',
    title: 'Reports',
    Icon: SettingsIcon,
    link: '/reports',
    permissions: []
  }
]

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      notifications: props.notifications
    }
    autoBind(this)
  }

  handleUserProfileClick (e) {
    this.refs['drawer-user-profile'].handleToggle()
    this.refs['drawer-menu'].handleClose()
  }

  handleMenuClick (e) {
    this.refs['drawer-user-profile'].handleClose()
    this.refs['drawer-menu'].handleToggle()
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  render () {
    const props = this.props
    return (
      <div id='eac-sidebar'>
        <div className='hidden-xs hidden-sm'>
          <Sticky
            notificationCount={2}
            menuDefs={menuDefs}
            handleUserProfileClick={this.handleUserProfileClick}
            handleExpandClick={this.props.handleExpandClick}
            isExpanded={this.props.isExpanded} />

        </div>

        <div className='visible-xs visible-sm'>
          <Heather
            isMenuOpen={this.state.isMenuOpen}
            onMenuClick={this.handleMenuClick}
            ProfileDrawerCount={0}
            onUserProfileClick={this.handleUserProfileClick}
            />

          <Drawer
            ref='drawer-menu'
            onRequestChange={(open) => { this.setState({isMenuOpen: open}) }}
            menuDefs={menuDefs} />
        </div>

        <ProfileDrawer ref='drawer-user-profile' {...props} expand={this.props.isExpanded} />
      </div>
    )
  }
}

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { COLOR_PALLETTE } from '../../constants/constants'
import { Sidelle, SidelleOption } from 'ssp-ui'
import Logout from 'ssp-ui/svg-icons/Logout'
import Settings from 'ssp-ui/svg-icons/Settings'
import Profile from 'ssp-ui/svg-icons/Profile'
import ChevronLeft from 'ssp-ui/svg-icons/ChevronLeft'
import Notification from 'ssp-ui/svg-icons/Notification'
import ArrowLeft from 'ssp-ui/svg-icons/ArrowLeft'
import NotificationList from '../shared/NotificationList'

const propTypes = {
  onRequestChange: PropTypes.func
}

const defaultProps = {
  onRequestChange: () => {}
}

class ProfileDrawer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      currentView: 'INDEX',
      currentTitle: 'My Profile'
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.getMenuDefs = this.getMenuDefs.bind(this)
  }

  getMenuDefs (props) {
    const menuDefs = [
      {
        key: 'notifications',
        label: 'Notifications',
        rightIcon: <Notification fill={COLOR_PALLETTE.blue} />,
        leftIcon: <ChevronLeft fill={COLOR_PALLETTE.blue} />,
        component: <NotificationList {...props} />
      },
      {
        key: 'myProfile',
        label: 'My Profile',
        rightIcon: <Profile fill={COLOR_PALLETTE.blue} />,
        leftIcon: <ChevronLeft fill={COLOR_PALLETTE.blue} />,
        component: <div />
      },
      {
        key: 'settings',
        label: 'Settings',
        rightIcon: <Settings fill={COLOR_PALLETTE.blue} />,
        leftIcon: <ChevronLeft fill={COLOR_PALLETTE.blue} />,
        component: <div />
      },
      {
        key: 'logout',
        label: 'logout',
        onClick: () => { document.location = '/logout' },
        rightIcon: <Logout fill={COLOR_PALLETTE.blue} />
      }
    ]
    return menuDefs
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize () {
    this.forceUpdate()
  }

  handleToggle () {
    // jp(11/6/2017)
    // since we position sidelle differently based on screen size
    // like on the left size for medium and above and on the left side on small
    // there is a small UI issue, where when you resize screen you'll notice the <Sidelle /> transition
    // from left to right
    // we use 'isOpen' to fix that issue
    const self = this
    this.setState({isOpen: !this.state.isOpen})
    setTimeout(function () {
      self.refs['sidelle-main'].handleToggle()
    }, 10)
  }

  handleClose () {
    this.refs['sidelle-main'] && this.refs['sidelle-main'].handleClose()
  }

  setView (item) {
    this.setState({currentView: item.key, currentTitle: item.label})
  }

  renderChildren (props) {
    // todo: jp(10/10/2017) this mechanism is generic and can go inside fabric-ui
    const { currentView } = this.state

    if (currentView === 'INDEX') {
      const options = this.getMenuDefs(props).map((item) => (
        <SidelleOption
          onClick={item.onClick || this.setView.bind(this, item)}
          rightIcon={item.rightIcon}
          leftIcon={item.leftIcon}
          label={item.label} />
      ))
      return options
    }

    const component = this.getMenuDefs(props).find(function (item) { return item.key === currentView }).component
    return (
      <div>
        <SidelleOption
          onClick={() => this.setState({currentView: 'INDEX', currentTitle: 'My Profile'})}
          rightIcon={<ArrowLeft fill={COLOR_PALLETTE.grey} />}
          label={<h2 className='text-center'><strong>My Profile</strong></h2>} />
        { component }
      </div>
    )
  }

  render () {
    const props = this.props
    // TODO: render sidelle based on isOpen and remove using refs
    // this needs to fixed in fui first
    if (!this.state.isOpen) return null

    // based on screen size, pass proper styles to <Sidelle/ >
    // default style for mobile view
    const overlayStyle = {top: '56px'}
    const containerStyle = {top: '56px'}
    let width = 320
    let openSecondary = true
    // for mobile view
    if (__CLIENT__ && window.matchMedia('(max-width: 767px)').matches) {
      width = '100%'
    }

    // for ipad landscape and desktop views
    if (__CLIENT__ && window.matchMedia('(min-width: 992px)').matches) {
      containerStyle.left = props.expand ? '240px' : '80px'
      containerStyle.top = 0
      overlayStyle.top = 0
      width = 392
      openSecondary = false
    }
    return (
      <Sidelle
        ref='sidelle-main'
        openSecondary={openSecondary}
        overlayStyle={overlayStyle}
        containerStyle={containerStyle}
        onRequestChange={(open) => { setTimeout(() => this.setState({isOpen: open}), 100) }}
        width={width}
        title={<h2><strong>{this.state.currentTitle}</strong></h2>}
        {...props}>
        { this.renderChildren(props) }
      </Sidelle>
    )
  }
}

ProfileDrawer.defaultProps = defaultProps
ProfileDrawer.propTypes = propTypes

export default ProfileDrawer

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import RequirePermission from '../shared/RequirePermission'
import { Sidelle, SidelleOption } from 'ssp-ui'
import autoBind from 'react-autobind'
import { COLOR_PALLETTE } from '../../constants/constants'

const propTypes = {
  menuDefs: PropTypes.array,
  onRequestChange: PropTypes.func
}

const defaultProps = {
  menuDefs: [],
  onRequestChange: () => {}
}

class Drawer extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
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
    this.refs['sidelle-main'].handleToggle()
  }

  handleClose () {
    this.refs['sidelle-main'].handleClose()
    this.props.onRequestChange(false)
  }

  render () {
    const props = this.props

    const sidelleOptions = props.menuDefs.map((item) => (
      <RequirePermission key={item.key} requiredPermission={item.permissions}>
        <Link to={item.link} >
          <SidelleOption
            onClick={this.handleClose}
            rightIcon={<item.Icon fill={COLOR_PALLETTE.blue} />}
            label={item.title} />
        </Link>
      </RequirePermission>
    ))

    const width = (__CLIENT__ && window.matchMedia('(max-width: 767px)').matches && '100%') || 320

    return (
      <Sidelle
        ref='sidelle-main'
        overlayStyle={{top: '56px'}}
        containerStyle={{top: '56px'}}
        onRequestChange={props.onRequestChange}
        width={width}>
        {sidelleOptions}
      </Sidelle>
    )
  }
}

Drawer.defaultProps = defaultProps
Drawer.propTypes = propTypes

export default Drawer

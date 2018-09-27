import React, {Component} from 'react'
import Sidebar from '../base/Sidebar'
import autoBind from 'react-autobind'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isExpanded: false
    }
    autoBind(this)
  }

  handleExpandClick () {
    this.setState({isExpanded: !this.state.isExpanded})
  }
  render () {
    let style = 'container-fluid main  '
    if (this.state.isExpanded) {
      style = style + ' slide-body'
    }
    return (
      <div className='fabric-ui-view'>
        <Sidebar
          isExpanded={this.state.isExpanded}
          handleExpandClick={this.handleExpandClick} />
        <div className={style}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Home

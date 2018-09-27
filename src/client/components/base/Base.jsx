import React, { Component } from 'react'
import ThemeProvider from 'ssp-ui/ThemeProvider'

export default class Base extends Component {
  render () {
    return (
      <ThemeProvider>
        <div className='fabric-ui-base'>
          {this.props.children}
        </div>
      </ThemeProvider>
    )
  }
}

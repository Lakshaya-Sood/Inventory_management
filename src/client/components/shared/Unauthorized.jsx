import React, { Component } from 'react'

class Unauthorized extends Component {
  render () {
    return (
      <div style={{padding: 3 + 'em'}}>
        <div className='row'>
          <div className='col-xs-12 text-center'>
            <br /><br /><br /><br /><br />
            <div>
              <br /><br />
              <h2>401 UNAUTHORIZED. (Sample Screen)</h2>
              <h3>You do not have access to current page. Click <a href={'/dashboard'}>here</a> to go to the home page.</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Unauthorized

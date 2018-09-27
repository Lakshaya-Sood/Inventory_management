// In a nutshell, components are supposed to be concerned only with displaying stuff.
// The only place they are supposed to get information from is their props.
// data and event handler functions should come as props
// layout components should be stateless
// purpose is to group all other components in the page together
import React, { Component } from 'react';
import FirstChart from "./LineChart";


export default class DashboardLayout extends Component {
  constructor(props)
  {
    super(props);
  }

  render () {
    return (
      <div key="dashboard">
        <div className='row'>
          <div className='col-md-12'>
          <FirstChart/>
         
          </div>
        </div>
        
      </div>
    )
  }
  }


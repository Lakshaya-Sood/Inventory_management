import React from 'react'

const defaultProps = {
}

class NotificationList extends React.Component {
  render () {
    return (
      <div>
        <p className='center'>There are no notifications.</p>}
      </div>
    )
  }
}

NotificationList.defaultProps = defaultProps

export default NotificationList

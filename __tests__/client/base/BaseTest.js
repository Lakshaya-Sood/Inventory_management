import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Base from '../../../src/client/components/base/Base'

describe('Base', () => {
  it('should render children when passed in', () => {
    const wrapper = shallow((
      <Base>
        <div className='view' />
      </Base>
    ))
    expect(wrapper.find('MuiThemeProvider').length).toBe(1)
    expect(wrapper.find('IntlProvider').length).toBe(1)
    expect(wrapper.find('.fabric-ui-base').children().length).toBe(1)
    expect(wrapper.contains(<div className='view' />)).toBe(true)
  })
})

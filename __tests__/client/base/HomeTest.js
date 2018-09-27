import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Component from '../../../src/client/components/base/Home'

describe('Home', () => {
  it('should render 2 children', () => {
    const wrapper = shallow(
      <Component />
    )
    expect(wrapper.is('.fabric-ui-view')).toBe(true)
    expect(wrapper.find('.fabric-ui-view').children().length).toBe(2)
  })

  it('should render children when passed in', () => {
    const wrapper = shallow((
      <Component>
        <div className='view' />
      </Component>
    ))
    expect(wrapper.contains(<div className='view' />)).toBe(true)
  })
})

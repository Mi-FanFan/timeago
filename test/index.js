import React from 'react'
import { shallow } from 'enzyme'

import TimeAgo from '../src'

it('just now', () => {
  const wrapper = shallow(<TimeAgo date={new Date()} />)
  expect(wrapper.text()).toEqual('刚刚')
})

it('1 second ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000} />)
  expect(wrapper.text()).toEqual('刚刚')
})

it('59 seconds ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 2000} />)
  expect(wrapper.text()).toEqual('刚刚')
})

it('1 minute ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60} />)
  expect(wrapper.text()).toEqual('1分钟前')
})

it('59 minutes ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 59000 * 60} />)
  expect(wrapper.text()).toEqual('59分钟前')
})

it('1 hour ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60 * 60} />)
  expect(wrapper.text()).toEqual('1小时前')
})

it('23 hours ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 23000 * 60 * 60} />)
  expect(wrapper.text()).toEqual('23小时前')
})


it('1 day ago', t => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60 * 60 * 24} />)
  t.is(wrapper.text(), '1 day ago')
})

it('1 week ago', t => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60 * 60 * 24 * 260} />)
  t.is(wrapper.text(), '1 week ago')
})

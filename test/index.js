import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

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


it('>24h昨天', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60 * 60 * 24} />)
  expect(wrapper.text()).toEqual('昨天' + moment().subtract(1, 'days').format('HH:mm'))
})

it('1 week ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60 * 60 * 24 * 260} />)
  expect(wrapper.text()).toEqual(moment().subtract(260, 'days').format('MM-DD HH:mm'))
})

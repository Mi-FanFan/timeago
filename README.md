A simple time-ago component for ReactJs.

ES6 imports 
```js
import TimeAgo from 'mff-timeago'

```


## Usage:

```jsx
<TimeAgo date="Aug 29, 2014" />

```

## Props

#### `date` (required)
Date is a date in the past or the future. This can be a Date Object, A UTC date-string or number of milliseconds since epoch time.

#### `now` (optional)
A function that returns what `Date.now` returns. Useful for server-side rendering.

#### `live` (optional)
React-Timeago is live by default and will auto update its value. However, if you don't want this behaviour, you can set `live: false`.

#### `title` (optional)
If the component is left as the default 'time' component, a title attribute is passed to it.
You can customize this by passing a string, or a UTC date-string will be used based on
the given date.

#### `minPeriod` (optional) (default: 0)
The minimum number of seconds that the component should wait before updating. The component will still update if you pass new props.
Use this if, for example, you don't want to update every second for recent times.

#### `maxPeriod` (optional) (default: Infinity)
The opposite of `minPeriod`. Use this to force dates to update more often than the default behaviour.
For example, you can use this update a time every 5 minutes even after it is more than an hour old.

#### Anything Else? (optional)
As of v2.0 you can pass in any props. Any props not used by React-TimeAgo will be passed down to the resulting component.
This means that you can pass `className`, `styles`, `id`, `title`, `aria-label`, event handlers or anything else you want.



##Rules 

1. 1分钟之内，显示： 刚刚
2. 一小时内，显示： xx分钟前
3. 小于24小时，显示： xx小时前
4. 间隔超过24小时，显示：昨天xx：xx
5. 间隔超过48小时，显示：xx月xx日 xx：xx
6. 间隔超过一年，显示：xxxx年xx月xx日 xx：xx

## SemVer

TimeAgo follows SemVer strictly.

## Changelog


#### v1.0.0

* Initial component
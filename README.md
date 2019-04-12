## Installation

```sh
$ npm install electric-flow-ui
```

[electric-flow 1.0.3+](https://www.npmjs.com/package/electric-flow)* is required.

### How to apply middleware

example:

```js
const express = require('express')
const ElectricFlow = require('electric-flow')
const ElectricFlowUI = require('electric-flow-ui')


const electricFlow = new Electrician()
const app = express()


ElectricFlowUI.applyMiddleware({
  electricFlow,
  app,
  options: { appName: 'Demo' }
})
```

The `settings` fields are:

- `electricFlow`: ElectricFlow instance.
- `app`: Express app.
- `options`: object, specifies appName on others for ui.
  - `appName`: string, Appname display on title bar and navigation bar.
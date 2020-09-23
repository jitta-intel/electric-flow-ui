const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const BullBoard = require('bull-board')


/*
  this config will be passes through view rendering
  config = { api, basePath }
*/
const applyMiddleware = ({ app, electricFlow, options }) => {
  const config = createConfig(electricFlow, options)
  console.log('Electric-flow-Ui: init ui with config ', config)
  BullBoard.setQueues(electricFlow.getQueues())
  app.use(config.basePath, createApp(config))
  app.use(config.bullBoardPath, BullBoard.UI)
}


function createConfig(electricFlow, options = {}) {
  const config = {
    // baseUiPath
    basePath: `${electricFlow.basePath}/ui`,
    api: electricFlow.apiPath,
    bullBoardPath: `${electricFlow.basePath}/ui/bull-board`,
    appName: options.appName || 'App'
  }
  return config
}

function createApp(config, listenOpts = {}) {
  const app = express()
  handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
  })
  const hbs = exphbs.create({
      defaultLayout: `${__dirname}/views/layouts/main.hbs`,
      handlebars,
      partialsDir: `${__dirname}/views/partials/`,
      extname: 'hbs'
    })
  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs')
  app.set('views', `${__dirname}/views`)
  app.locals.config = config
  app.use(express.static('public'))
  app.use((req, res, next) => {
    res.locals.query = req.query
    res.locals.param = {}
    next()
  })
  app.get('/', (req, res) => {
    res.redirect(`${req.originalUrl}/mainboard`)
  })

  app.get('/mainboard', function (req, res) {
    res.render('mainboard')
  })

  app.get('/mainboard/:name', function (req, res) {
    const param = {
      mainboard: req.params.name
    }
    res.locals.param = param
    res.render('main_discharge')
  })

  app.get('/mainboard/:name/circuit_discharge', function (req, res) {
    const param = {
      mainboard: req.params.name
    }
    res.locals.param = param
    res.render('circuit_discharge')
  })
  return app
}

module.exports = {
  applyMiddleware
}

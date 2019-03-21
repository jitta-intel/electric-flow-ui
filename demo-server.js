const createApp = require('./')

const port = 4789

createApp({
  api: 'http://localhost:3000'
})
.listen(port, () => console.log(`eui is running on port ${port}`))

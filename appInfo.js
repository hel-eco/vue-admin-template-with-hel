const helDevUtils = require('hel-dev-utils')
const pkg = require('./package.json')

// deploy to unpkg
const appInfo = helDevUtils.createVue2SubApp(pkg, { npmCdnType: 'unpkg' })

// deploy to self deployed unpkg
// const appInfo = helDevUtils.createVue2SubApp(pkg, { npmCdnType: 'unpkg', homePage: 'http://my-unpkg:8888' });

// deploy to git
// const appInfo = helDevUtils.createVue2SubApp(pkg, { homePage: 'https://hel-eco.github.io/hel-tpl-remote-vue-comp/as_v1' });

module.exports = appInfo

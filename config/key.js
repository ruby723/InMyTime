if (process.env.NODE_EVE === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
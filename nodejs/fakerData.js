var faker = require('faker')
var lodash = require('lodash')
faker.locale = "zh_CN"

module.exports = function() {
    return {
        people: lodash.times(100, function(n) {
            return {
                id: n,
                question: faker.name.title(),
                answers: faker.lorem.text(),
            }
        })
    }
}
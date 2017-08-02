'use strict'

module.exports = {
    db : require('./providers/db'),
    categoryService: require('./services/category.service.js'),
    projectService: require('./services/project.service.js'),
    taskService: require('./services/task.service.js')
}
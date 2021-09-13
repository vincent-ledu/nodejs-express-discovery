const express = require("express")

module.exports = { middle1: function(req, res, next) {
    console.log("middle exported")
    next()
    }
}
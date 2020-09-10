"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
console.log(env)
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const dbSocketAddr = "34.65.236.148"
const sequelize = new Sequelize('BOOK', 'root', '12A n f012345A', {
    dialect: 'mysql',
  });
var db = {};


fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        console.log(file + " file")
        var model = require(__dirname + "/" +file);
        db[file] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
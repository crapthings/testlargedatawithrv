_ = require('lodash')
moment = require('moment')
Faker = faker = require('faker')
React = require('react')
render = require('react-dom').render
List = require('react-virtualized').List
randomColor = require('randomcolor')
Container = require('react-komposer').composeWithTracker

Categories = new Mongo.Collection('categories')
Books = new Mongo.Collection('books')
Authors = new Mongo.Collection('authors')

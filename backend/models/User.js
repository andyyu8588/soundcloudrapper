const mongoose = require('mongoose')
const {any} = require('underscore')

const UserSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  // firstname: String,
  // lastname: String,
  birthdate: Date,
  gender: String,
  profilepicture: {type: String, default: ''},
  followers: {type: Array, default: []},
  following: {type: Array, default: []},
  rooms: {type: Array, default: []},
  socketIds: {type: Array, default: []},
  isActive: {type: Boolean, default: true}, // active vs online
  tags: {type: [String], default: []},
  log: {
    type: {
      in: Array,
      out: Array,
    },
    default: {
      in: [new Date().toISOString()],
      out: [],
    },
  },
  trips: {
    type: [{
      dateRange: {
        start: Date,
        end: Date,
        length: Number,
      },
      tripName: String,
      schedule: [{
        day: Date,
        venues: [mongoose.Schema.Types.Mixed],
      }],
      private: Boolean,
    }],
    default: [],
  },
  history: {
    type: [
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
    ],
    default: [
      {code: 'NA', continent: 'North-America', places: []},
      {code: 'SA', continent: 'South-America', places: []},
      {code: 'EU', continent: 'Europe', places: []},
      {code: 'AS', continent: 'Asia', places: []},
      {code: 'AF', continent: 'Africa', places: []},
      {code: 'OC', continent: 'Oceania', places: []},
      {code: 'AN', continent: 'Antarctica', places: []},
    ],
  },
  wishlist: {
    type: [
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
      {code: String, continent: String, places: Array},
    ],
    default: [
      {code: 'NA', continent: 'North-America', places: []},
      {code: 'SA', continent: 'South-America', places: []},
      {code: 'EU', continent: 'Europe', places: []},
      {code: 'AS', continent: 'Asia', places: []},
      {code: 'AF', continent: 'Africa', places: []},
      {code: 'OC', continent: 'Oceania', places: []},
      {code: 'AN', continent: 'Antarctica', places: []},
    ],
  },
  posts: [String,
    // {
    // date: { type: String, required: true },
    // location:{ type: String, required: true},
    // author: { type: String, required: true },
    // likes: { type: [String], default: [] },
    // title: { type: String, required: true },
    // content: { type: String, required: true },
    // imagePath: { type: String, required: true },
    // tags: {type: [String], required: true}
    // }
  ],
})

module.exports = mongoose.model('User', UserSchema)

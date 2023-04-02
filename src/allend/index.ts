
import Map from './DClient/Map'
const Order = require('./DClient/Order').default
const Event = require('./DClient/Event').default
const Client = require('./DClient/Client').default

export const DClient = { Client, Order, Event, Map }
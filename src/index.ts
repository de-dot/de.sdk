
export const Auth = require('./backend/Auth').default

const Map = require('./allend/DClient/Map').default
const Order = require('./allend/DClient/Order').default
const Event = require('./allend/DClient/Event').default
const Client = require('./allend/DClient/Client').default

export const DClient = { Client, Order, Event, Map }
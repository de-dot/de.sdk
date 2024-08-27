
import _Utils from '../utils'
import _Mapkit from './Mapkit'

import Order from './DClient/Order'
import Event from './DClient/Event'
import Client from './DClient/Client'

export const Utils = _Utils
export const Mapkit = _Mapkit
export const DClient = { Client, Order, Event }
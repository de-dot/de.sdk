import type { MapOptions, TObject } from '../../types'

import IOF from 'iframe.io'
import Handles from './Handles'
import Controls from './Controls'
import Stream from '../../utils/stream'

export type Plugin = () => void

export default class Plugins {
  private chn: IOF
  private handles: Handles
  private controls: Controls
  private options: MapOptions
  private LIST: TObject<Plugin>  = {}

  constructor( chn: IOF, handles: Handles, controls: Controls, options: MapOptions ){
    this.chn = chn
    this.options = options
    this.handles = handles
    this.controls = controls
  }

  mount( list: TObject<Plugin> ){

  }
}
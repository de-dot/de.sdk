import type { GPSLocation, Coordinates, MapLayerStyle, MapOptions, Caption, WaypointIndex, SearchPlace, Itinerary } from '../../types'

import IOF from 'iframe.io'

export default class Controls {
  private options: MapOptions
  private chn: IOF

  constructor( chn: IOF, options: MapOptions ){
    this.chn = chn
    this.options = options
  }

  /**
   * Refresh access token to remove server
   * 
   * @param token - Latest access token
   */
  refreshToken( token: string ){
    if( !token ) return
    this.options.accessToken = token
  }

  /**
   * Update map style
   * 
   * @param style - Map style ID
   */
  setMapStyle( style: MapLayerStyle ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Set style
      this.chn.emit('set:map:style', style, ( error: string | boolean ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve()
      } )
    })
  }

  /**
   * @return - User's current GPS location
   */
  getCurrentLocation(): Promise<GPSLocation | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get current location
      this.chn.emit('get:current:location', ( error: string | boolean, location: GPSLocation ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( location )
      } )
    } )
  }
  /**
   * Pin user's current location on the current active map
   * 
   * @return - User's current GPS location coordinates or `null` when it failed
   */
  pinCurrentLocation(): Promise<Coordinates | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Pin user's current location on the map
      this.chn.emit('pin:current:location', ( error: string | boolean, location: Coordinates | null ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( location )
      } )
    } )
  }

  /**
   * Get a location coordinates of placed that matched this name
   * 
   * @param name - Place name to resolve
   * @return - Array list of coordinates
   */
  resolvePlace( name: string ): Promise<Coordinates | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get location coordinates from place name
      this.chn.emit('resolve:place', name, ( error: string | boolean, data: any ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }
  /**
   * Get a location details of placed that matched this coordinates
   * 
   * @param coords - Coordinates
   * @return - Array list of geocoding data
   */
  resolveCoordinates( coords: Coordinates | string ): Promise<Coordinates | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get location place from coordinates
      this.chn.emit('resolve:coordinates', coords, ( error: string | boolean, data: any ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }

  /**
   * Search a location or places
   * 
   * @param input - Place in string
   * @return - Autocompletion list matched places
   */
  searchQuery( input: string ): Promise<string[]> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Launch search query
      this.chn.emit('search:query', input, ( error: string | boolean, data: any ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }
  /**
   * Select a suggested place by the search
   * 
   * @param index - Index of place in suggested list
   * @return - More details of selected place
   */
  searchSelect( index: number ): Promise<SearchPlace | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get place's details
      this.chn.emit('search:select', index, ( error: string | boolean, data: SearchPlace | null ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }
  
  /**
   * Set route origin
   * 
   * @param coords - Coordinates of the route origin
   * @param caption - Caption information ot the origin
   */
  setOrigin( coords: Coordinates, caption: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('set:route:origin', { coords, caption }, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Remove added route origin
   */
  removeOrigin(): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('remove:route:origin', ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Set route destination
   * 
   * @param coords - Coordinates of the route destination
   * @param caption - Caption information ot the destination
   */
  setDestination( coords: Coordinates, caption: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('set:route:destination', { coords, caption }, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Remove added route destination
   */
  removeDestination(): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('remove:route:destination', ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Set a route waypoint
   * 
   * @param coords - Coordinates of the route waypoint
   * @param index - (Optional) Define unique order index of the waypoint on the route
   * @param caption - (Optional) Caption information ot the waypoint
   */
  addWaypoint( coords: Coordinates, caption: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('add:route:waypoint', { coords, caption }, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Update a route waypoint specs
   * 
   * @param index - Order index of the waypoint to update
   * @param coords - Coordinates of the route waypoint
   * @param caption - (Optional) Caption information ot the waypoint
   */
  updateWaypoint( index: number, coords: Coordinates, caption?: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('update:route:waypoint', { index, coords, caption }, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Remove added route waypoint
   * 
   * @param index - Order index of the waypoint to be removed
   */
  removeWaypoint( index: number ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('remove:route:waypoint', index, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Set a caption details of a route point
   * 
   * @param index - Order index of targeted route waypoint
   * @param caption - Caption information to set
   */
  setWaypointCaption( index: WaypointIndex, caption?: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('set:waypoint:caption', { index, caption }, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Update the caption details of a route point
   * 
   * @param index - Order index of targeted route waypoint
   * @param caption - Caption information to update
   */
  updateWaypointCaption( index: WaypointIndex, caption?: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('update:waypoint:caption', { index, caption }, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }

  /**
   * Set all the route waypoints
   * 
   * @param itinerary - Array of coordinates and captions of the route waypoints
   */
  setRoute( itinerary: Itinerary ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('set:route', itinerary, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }

  /**
   * Refresh navigation direction data with fresh
   * coordinates.
   */
  upsertDirection( route: any ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('upsert:navigation:direction', route, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Initialize navigation direction on the map
   * 
   * @position - Current position of the subject
   */
  setInitialPosition( position: GPSLocation ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('initial:navigation:position', position, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Load & Start navigation direction on the map
   */
  startNavigation(): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('navigation:load', ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Stop initiated navigation and remove from the map
   * 
   * @return - Instance of the navigator
   */
  stopNavigation(): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('navigation:dismiss', ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
  /**
   * Move from current location to the next location
   * 
   * @position - Current position of the subject
   * @return - Instance of the navigator
   */
  navigate( position: GPSLocation ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.chn.emit('navigation:navigate', position, ( error: string | boolean ) => {
        if( error ) return reject( error )
        resolve()
      } )
    } )
  }
}
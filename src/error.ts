/**
 * A request De. answered with a failure.
 *
 * Every client threw on `error: true` already, but with a bare Error carrying
 * only the message — so a caller could not tell an expired offer (404) from a
 * rejected body (400) from De. being down (502) without parsing prose. A proxy
 * mapping De.'s answer onto its own response had nothing to map, and a
 * simulation counting ordinary 404s as ordinary had nothing to count.
 *
 * `status` is the HTTP status; `payload` is the envelope as it arrived, for
 * the field-level detail a validation failure carries.
 */
export default class APIError extends Error {
	readonly status: number
	readonly payload?: unknown

	constructor( message: string, status: number, payload?: unknown ){
		super( message )

		this.name = 'APIError'
		this.status = status
		this.payload = payload

		// Restores the prototype chain across the ES5 target, so `instanceof` holds
		Object.setPrototypeOf( this, APIError.prototype )
	}
}

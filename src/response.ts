/**
 * The HTTP status a returned envelope arrived with.
 *
 * Clients return De.'s `{ error, status, message, data }` envelope, which is
 * what makes `status` — the precise refusal code — reachable. It carries no
 * HTTP status, and for most callers that is right: the envelope says more than
 * a number can.
 *
 * A proxy is the exception. It answers its own client with an HTTP status, and
 * mapping every De. refusal onto a generic 400 loses the distinction between
 * "no such order" and "you may not do that" for whoever is downstream.
 *
 * So the status is kept beside the response rather than inside it: the type
 * stays exactly the envelope, and a caller that needs the number asks for it,
 * keyed on the object it was given. Keying on identity rather than on a
 * mutable field is what makes it safe under concurrency — two calls in flight
 * cannot read each other's status.
 *
 * ```ts
 * const answer = await lsp.orders.get( reference )
 * if( answer.error ) throw new HTTPException( statusOf( answer ) ?? 400, ... )
 * ```
 */
const statuses = new WeakMap<object, number>()

/** Record the status for a parsed response body. Called by the transport. */
export const rememberStatus = ( body: unknown, status: number ): void => {
	if( body && typeof body === 'object' ) statuses.set( body as object, status )
}

/**
 * The HTTP status the given envelope arrived with.
 *
 * `undefined` when the object did not come from this SDK's transport, or when
 * the call threw instead of returning — `APIError` carries its own `status`.
 */
export const statusOf = ( envelope: unknown ): number | undefined =>
	envelope && typeof envelope === 'object' ? statuses.get( envelope as object ) : undefined

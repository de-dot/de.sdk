import type {
	SharedInvitationSendValidation,
	SharedInvitationCancelValidation,
	SharedInvitationAcceptValidation
} from '@de./types/shared/invitation'
import { type Http, type Res } from '../../utils'

export default class SharedInvitation {
	constructor( private http: Http, private prefix: string ){}

	async send( as: string, body: SharedInvitationSendValidation['body'] ): Promise<SharedInvitationSendValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedInvitationSendValidation['response']>>({
			url: `/${this.prefix}/invitation/${as}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( body: SharedInvitationCancelValidation['body'] ): Promise<SharedInvitationCancelValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedInvitationCancelValidation['response']>>({
			url: `/${this.prefix}/invitation/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async accept( body: SharedInvitationAcceptValidation['body'] ): Promise<SharedInvitationAcceptValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedInvitationAcceptValidation['response']>>({
			url: `/${this.prefix}/invitation/accept`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}

import type {
	LSPFleetCreateValidation,
	LSPFleetRetrieveValidation,
	LSPFleetListValidation,
	LSPFleetUpdateValidation,
	LSPFleetUpdateStatusValidation,
	LSPFleetRemoveValidation
} from '@de./types/lsp/fleet'
import type {
	LSPVehicleAddValidation,
	LSPVehicleRetrieveValidation,
	LSPVehicleListValidation,
	LSPVehicleUpdateValidation,
	LSPVehicleUpdateStatusValidation,
	LSPVehicleUpdateSpecsValidation,
	LSPVehicleUpdateIoTValidation,
	LSPVehicleAllocateValidation,
	LSPVehicleRemoveValidation
} from '@de./types/lsp/fleet/vehicle'
import type {
	LSPFleetParkingAddFacilityValidation,
	LSPFleetParkingRetrieveFacilityValidation,
	LSPFleetParkingFetchFacilitiesValidation,
	LSPFleetParkingUpdateFacilityValidation,
	LSPFleetParkingRemoveFacilityValidation,
	LSPFleetParkingAddSpaceValidation,
	LSPFleetParkingUpdateSpaceValidation,
	LSPFleetParkingRemoveSpaceValidation,
	LSPFleetParkingCreateAssignmentValidation,
	LSPFleetParkingRetrieveAssignmentValidation,
	LSPFleetParkingFetchAssignmentsValidation,
	LSPFleetParkingUpdateAssignmentValidation,
	LSPFleetParkingCheckInValidation,
	LSPFleetParkingCheckOutValidation,
	LSPFleetParkingCancelAssignmentValidation,
	LSPFleetParkingCreateReservationValidation,
	LSPFleetParkingRetrieveReservationValidation,
	LSPFleetParkingFetchReservationsValidation,
	LSPFleetParkingUpdateReservationValidation,
	LSPFleetParkingConfirmReservationValidation,
	LSPFleetParkingCancelReservationValidation,
	LSPFleetParkingGetUtilizationValidation
} from '@de./types/lsp/fleet/parking'
import type {
	LSPFleetMaintenanceAddRecordValidation,
	LSPFleetMaintenanceRetrieveRecordValidation,
	LSPFleetMaintenanceFetchRecordsValidation,
	LSPFleetMaintenanceUpdateRecordValidation,
	LSPFleetMaintenanceDeleteRecordValidation,
	LSPFleetMaintenanceStartValidation,
	LSPFleetMaintenanceCompleteValidation,
	LSPFleetMaintenanceCancelValidation,
	LSPFleetMaintenanceApproveValidation,
	LSPFleetMaintenanceAddScheduleValidation,
	LSPFleetMaintenanceRetrieveScheduleValidation,
	LSPFleetMaintenanceFetchSchedulesValidation,
	LSPFleetMaintenanceUpdateScheduleValidation,
	LSPFleetMaintenanceDeleteScheduleValidation,
	LSPFleetMaintenanceActivateScheduleValidation,
	LSPFleetMaintenanceDeactivateScheduleValidation,
	LSPFleetMaintenanceGetHistoryValidation,
	LSPFleetMaintenanceGetUpcomingValidation,
	LSPFleetMaintenanceGetOverdueValidation
} from '@de./types/lsp/fleet/maintenance'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Fleets ────────────────────────────────────────────────────────────────

export default class LSPFleets {
	constructor( private http: Http ){}

	async create( body: LSPFleetCreateValidation['body'] ): Promise<LSPFleetCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetCreateValidation['response']>>({
			url: '/lsp/fleets/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPFleetListValidation['querystring'] ): Promise<LSPFleetListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetListValidation['response']>>({
			url: `/lsp/fleets${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<LSPFleetRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetRetrieveValidation['response']>>({
			url: `/lsp/fleets/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPFleetUpdateValidation['body'] ): Promise<LSPFleetUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetUpdateValidation['response']>>({
			url: `/lsp/fleets/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPFleetUpdateStatusValidation['body'] ): Promise<LSPFleetUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetUpdateStatusValidation['response']>>({
			url: `/lsp/fleets/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleets/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Vehicles ──────────────────────────────────────────────────────────────

	async addVehicle( body: LSPVehicleAddValidation['body'] ): Promise<LSPVehicleAddValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleAddValidation['response']>>({
			url: '/lsp/fleet/vehicles/add',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listVehicles( querystring?: LSPVehicleListValidation['querystring'] ): Promise<LSPVehicleListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleListValidation['response']>>({
			url: `/lsp/fleet/vehicles${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveVehicle( id: string ): Promise<LSPVehicleRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleRetrieveValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicle( id: string, body: LSPVehicleUpdateValidation['body'] ): Promise<LSPVehicleUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleUpdateValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicleStatus( id: string, body: LSPVehicleUpdateStatusValidation['body'] ): Promise<LSPVehicleUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleUpdateStatusValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicleSpecs( id: string, body: LSPVehicleUpdateSpecsValidation['body'] ): Promise<LSPVehicleUpdateSpecsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleUpdateSpecsValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}/specs`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicleIoT( id: string, body: LSPVehicleUpdateIoTValidation['body'] ): Promise<LSPVehicleUpdateIoTValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleUpdateIoTValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}/iot`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async allocateVehicle( id: string, body: LSPVehicleAllocateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/vehicles/${id}/allocate`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async deallocateVehicle( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/vehicles/${id}/deallocate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeVehicle( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Parking Facilities ────────────────────────────────────────────────────

	async addParkingFacility( body: LSPFleetParkingAddFacilityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/fleet/parking/facilities',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingFacilities( querystring?: LSPFleetParkingFetchFacilitiesValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingFacility( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getParkingFacilityUtilization( id: string, querystring: LSPFleetParkingGetUtilizationValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities/${id}/utilization${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingFacility( id: string, body: LSPFleetParkingUpdateFacilityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeParkingFacility( id: string, body: LSPFleetParkingRemoveFacilityValidation['body'] ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
	}

	async addParkingSpace( id: string, body: LSPFleetParkingAddSpaceValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingSpace( id: string, spaceId: string, body: LSPFleetParkingUpdateSpaceValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeParkingSpace( id: string, spaceId: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Parking Assignments ───────────────────────────────────────────────────

	async createParkingAssignment( body: LSPFleetParkingCreateAssignmentValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/fleet/parking/assignments',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingAssignments( querystring?: LSPFleetParkingFetchAssignmentsValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/assignments${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingAssignment( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingAssignment( id: string, body: LSPFleetParkingUpdateAssignmentValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkInParking( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/assignments/${id}/check-in`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkOutParking( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/assignments/${id}/check-out`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelParkingAssignment( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/assignments/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Parking Reservations ──────────────────────────────────────────────────

	async createParkingReservation( body: LSPFleetParkingCreateReservationValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/fleet/parking/reservations',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingReservations( querystring?: LSPFleetParkingFetchReservationsValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/reservations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingReservation( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingReservation( id: string, body: LSPFleetParkingUpdateReservationValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async confirmParkingReservation( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/reservations/${id}/confirm`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelParkingReservation( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/parking/reservations/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Maintenance Records ───────────────────────────────────────────────────

	async addMaintenanceRecord( body: LSPFleetMaintenanceAddRecordValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/fleet/maintenance/records',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listMaintenanceRecords( querystring?: LSPFleetMaintenanceFetchRecordsValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveMaintenanceRecord( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getVehicleMaintenanceHistory( vid: string, querystring: LSPFleetMaintenanceGetHistoryValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/vehicles/${vid}/history${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateMaintenanceRecord( id: string, body: LSPFleetMaintenanceUpdateRecordValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async startMaintenance( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records/${id}/start`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeMaintenance( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records/${id}/complete`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelMaintenance( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async approveMaintenance( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records/${id}/approve`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteMaintenanceRecord( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Maintenance Schedules ─────────────────────────────────────────────────

	async addMaintenanceSchedule( body: LSPFleetMaintenanceAddScheduleValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/fleet/maintenance/schedules',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listMaintenanceSchedules( querystring?: LSPFleetMaintenanceFetchSchedulesValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getUpcomingMaintenance( querystring?: LSPFleetMaintenanceGetUpcomingValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules/upcoming${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOverdueMaintenance( querystring?: LSPFleetMaintenanceGetOverdueValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules/overdue${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveMaintenanceSchedule( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateMaintenanceSchedule( id: string, body: LSPFleetMaintenanceUpdateScheduleValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async activateMaintenanceSchedule( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules/${id}/activate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deactivateMaintenanceSchedule( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules/${id}/deactivate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteMaintenanceSchedule( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}
}

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
	LSPVehicleRemoveValidation,
	LSPVehicleDeallocateValidation
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

	async remove( id: string ): Promise<boolean> {
		const { error, message } = await this.http.request<Res<LSPFleetRemoveValidation['response']>>({
			url: `/lsp/fleets/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
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

	async allocateVehicle( id: string, body: LSPVehicleAllocateValidation['body'] ): Promise<LSPVehicleAllocateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleAllocateValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}/allocate`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async deallocateVehicle( id: string ): Promise<LSPVehicleDeallocateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleDeallocateValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}/deallocate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeVehicle( id: string ): Promise<LSPVehicleRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPVehicleRemoveValidation['response']>>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Parking Facilities ────────────────────────────────────────────────────

	async addParkingFacility( body: LSPFleetParkingAddFacilityValidation['body'] ): Promise<LSPFleetParkingAddFacilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingAddFacilityValidation['response']>>({
			url: '/lsp/fleet/parking/facilities',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingFacilities( querystring?: LSPFleetParkingFetchFacilitiesValidation['querystring'] ): Promise<LSPFleetParkingFetchFacilitiesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingFetchFacilitiesValidation['response']>>({
			url: `/lsp/fleet/parking/facilities${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingFacility( id: string ): Promise<LSPFleetParkingRetrieveFacilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingRetrieveFacilityValidation['response']>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getParkingFacilityUtilization( id: string, querystring: LSPFleetParkingGetUtilizationValidation['querystring'] ): Promise<LSPFleetParkingGetUtilizationValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingGetUtilizationValidation['response']>>({
			url: `/lsp/fleet/parking/facilities/${id}/utilization${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingFacility( id: string, body: LSPFleetParkingUpdateFacilityValidation['body'] ): Promise<LSPFleetParkingUpdateFacilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingUpdateFacilityValidation['response']>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeParkingFacility( id: string, body: LSPFleetParkingRemoveFacilityValidation['body'] ): Promise<LSPFleetParkingRemoveFacilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingRemoveFacilityValidation['response']>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async addParkingSpace( id: string, body: LSPFleetParkingAddSpaceValidation['body'] ): Promise<LSPFleetParkingAddSpaceValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingAddSpaceValidation['response']>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingSpace( id: string, spaceId: string, body: LSPFleetParkingUpdateSpaceValidation['body'] ): Promise<LSPFleetParkingUpdateSpaceValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingUpdateSpaceValidation['response']>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeParkingSpace( id: string, spaceId: string ): Promise<boolean> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingRemoveSpaceValidation['response']>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}

	// ── Parking Assignments ───────────────────────────────────────────────────

	async createParkingAssignment( body: LSPFleetParkingCreateAssignmentValidation['body'] ): Promise<LSPFleetParkingCreateAssignmentValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingCreateAssignmentValidation['response']>>({
			url: '/lsp/fleet/parking/assignments',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingAssignments( querystring?: LSPFleetParkingFetchAssignmentsValidation['querystring'] ): Promise<LSPFleetParkingFetchAssignmentsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingFetchAssignmentsValidation['response']>>({
			url: `/lsp/fleet/parking/assignments${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingAssignment( id: string ): Promise<LSPFleetParkingRetrieveAssignmentValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingRetrieveAssignmentValidation['response']>>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingAssignment( id: string, body: LSPFleetParkingUpdateAssignmentValidation['body'] ): Promise<LSPFleetParkingUpdateAssignmentValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingUpdateAssignmentValidation['response']>>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkInParking( id: string ): Promise<LSPFleetParkingCheckInValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingCheckInValidation['response']>>({
			url: `/lsp/fleet/parking/assignments/${id}/check-in`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkOutParking( id: string ): Promise<LSPFleetParkingCheckOutValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingCheckOutValidation['response']>>({
			url: `/lsp/fleet/parking/assignments/${id}/check-out`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelParkingAssignment( id: string ): Promise<LSPFleetParkingCancelAssignmentValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingCancelAssignmentValidation['response']>>({
			url: `/lsp/fleet/parking/assignments/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Parking Reservations ──────────────────────────────────────────────────

	async createParkingReservation( body: LSPFleetParkingCreateReservationValidation['body'] ): Promise<LSPFleetParkingCreateReservationValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingCreateReservationValidation['response']>>({
			url: '/lsp/fleet/parking/reservations',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingReservations( querystring?: LSPFleetParkingFetchReservationsValidation['querystring'] ): Promise<LSPFleetParkingFetchReservationsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingFetchReservationsValidation['response']>>({
			url: `/lsp/fleet/parking/reservations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingReservation( id: string ): Promise<LSPFleetParkingRetrieveReservationValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingRetrieveReservationValidation['response']>>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingReservation( id: string, body: LSPFleetParkingUpdateReservationValidation['body'] ): Promise<LSPFleetParkingUpdateReservationValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingUpdateReservationValidation['response']>>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async confirmParkingReservation( id: string ): Promise<LSPFleetParkingConfirmReservationValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingConfirmReservationValidation['response']>>({
			url: `/lsp/fleet/parking/reservations/${id}/confirm`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelParkingReservation( id: string ): Promise<LSPFleetParkingCancelReservationValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetParkingCancelReservationValidation['response']>>({
			url: `/lsp/fleet/parking/reservations/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Maintenance Records ───────────────────────────────────────────────────

	async addMaintenanceRecord( body: LSPFleetMaintenanceAddRecordValidation['body'] ): Promise<LSPFleetMaintenanceAddRecordValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceAddRecordValidation['response']>>({
			url: '/lsp/fleet/maintenance/records',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listMaintenanceRecords( querystring?: LSPFleetMaintenanceFetchRecordsValidation['querystring'] ): Promise<LSPFleetMaintenanceFetchRecordsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceFetchRecordsValidation['response']>>({
			url: `/lsp/fleet/maintenance/records${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveMaintenanceRecord( id: string ): Promise<LSPFleetMaintenanceRetrieveRecordValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceRetrieveRecordValidation['response']>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getVehicleMaintenanceHistory( vid: string, querystring: LSPFleetMaintenanceGetHistoryValidation['querystring'] ): Promise<LSPFleetMaintenanceGetHistoryValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceGetHistoryValidation['response']>>({
			url: `/lsp/fleet/maintenance/vehicles/${vid}/history${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateMaintenanceRecord( id: string, body: LSPFleetMaintenanceUpdateRecordValidation['body'] ): Promise<LSPFleetMaintenanceUpdateRecordValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceUpdateRecordValidation['response']>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async startMaintenance( id: string ): Promise<LSPFleetMaintenanceStartValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceStartValidation['response']>>({
			url: `/lsp/fleet/maintenance/records/${id}/start`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeMaintenance( id: string ): Promise<LSPFleetMaintenanceCompleteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceCompleteValidation['response']>>({
			url: `/lsp/fleet/maintenance/records/${id}/complete`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelMaintenance( id: string ): Promise<LSPFleetMaintenanceCancelValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceCancelValidation['response']>>({
			url: `/lsp/fleet/maintenance/records/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async approveMaintenance( id: string ): Promise<LSPFleetMaintenanceApproveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceApproveValidation['response']>>({
			url: `/lsp/fleet/maintenance/records/${id}/approve`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteMaintenanceRecord( id: string ): Promise<boolean> {
		const { error, message } = await this.http.request<Res<LSPFleetMaintenanceDeleteRecordValidation['response']>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}

	// ── Maintenance Schedules ─────────────────────────────────────────────────

	async addMaintenanceSchedule( body: LSPFleetMaintenanceAddScheduleValidation['body'] ): Promise<LSPFleetMaintenanceAddScheduleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceAddScheduleValidation['response']>>({
			url: '/lsp/fleet/maintenance/schedules',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listMaintenanceSchedules( querystring?: LSPFleetMaintenanceFetchSchedulesValidation['querystring'] ): Promise<LSPFleetMaintenanceFetchSchedulesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceFetchSchedulesValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getUpcomingMaintenance( querystring?: LSPFleetMaintenanceGetUpcomingValidation['querystring'] ): Promise<LSPFleetMaintenanceGetUpcomingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceGetUpcomingValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules/upcoming${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOverdueMaintenance( querystring?: LSPFleetMaintenanceGetOverdueValidation['querystring'] ): Promise<LSPFleetMaintenanceGetOverdueValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceGetOverdueValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules/overdue${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveMaintenanceSchedule( id: string ): Promise<LSPFleetMaintenanceRetrieveScheduleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceRetrieveScheduleValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateMaintenanceSchedule( id: string, body: LSPFleetMaintenanceUpdateScheduleValidation['body'] ): Promise<LSPFleetMaintenanceUpdateScheduleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceUpdateScheduleValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async activateMaintenanceSchedule( id: string ): Promise<LSPFleetMaintenanceActivateScheduleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceActivateScheduleValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules/${id}/activate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deactivateMaintenanceSchedule( id: string ): Promise<LSPFleetMaintenanceDeactivateScheduleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPFleetMaintenanceDeactivateScheduleValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules/${id}/deactivate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteMaintenanceSchedule( id: string ): Promise<boolean> {
		const { error, message } = await this.http.request<Res<LSPFleetMaintenanceDeleteScheduleValidation['response']>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}
}

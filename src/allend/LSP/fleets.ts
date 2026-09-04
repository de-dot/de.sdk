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
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Fleets ────────────────────────────────────────────────────────────────

export default class LSPFleets {
	constructor( private http: Http ){}

	async create( body: LSPFleetCreateValidation['body'] ): Promise<Data<LSPFleetCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetCreateValidation['response']>>>({
			url: '/lsp/fleets/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPFleetListValidation['querystring'] ): Promise<Data<LSPFleetListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetListValidation['response']>>>({
			url: `/lsp/fleets${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<Data<LSPFleetRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetRetrieveValidation['response']>>>({
			url: `/lsp/fleets/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPFleetUpdateValidation['body'] ): Promise<Data<LSPFleetUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetUpdateValidation['response']>>>({
			url: `/lsp/fleets/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPFleetUpdateStatusValidation['body'] ): Promise<Data<LSPFleetUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetUpdateStatusValidation['response']>>>({
			url: `/lsp/fleets/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<boolean> {
		const { error, message } = await this.http.request<Res<Data<LSPFleetRemoveValidation['response']>>>({
			url: `/lsp/fleets/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}

	// ── Vehicles ──────────────────────────────────────────────────────────────

	async addVehicle( body: LSPVehicleAddValidation['body'] ): Promise<Data<LSPVehicleAddValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleAddValidation['response']>>>({
			url: '/lsp/fleet/vehicles/add',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listVehicles( querystring?: LSPVehicleListValidation['querystring'] ): Promise<Data<LSPVehicleListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleListValidation['response']>>>({
			url: `/lsp/fleet/vehicles${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveVehicle( id: string ): Promise<Data<LSPVehicleRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleRetrieveValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicle( id: string, body: LSPVehicleUpdateValidation['body'] ): Promise<Data<LSPVehicleUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleUpdateValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicleStatus( id: string, body: LSPVehicleUpdateStatusValidation['body'] ): Promise<Data<LSPVehicleUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleUpdateStatusValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicleSpecs( id: string, body: LSPVehicleUpdateSpecsValidation['body'] ): Promise<Data<LSPVehicleUpdateSpecsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleUpdateSpecsValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}/specs`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateVehicleIoT( id: string, body: LSPVehicleUpdateIoTValidation['body'] ): Promise<Data<LSPVehicleUpdateIoTValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleUpdateIoTValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}/iot`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async allocateVehicle( id: string, body: LSPVehicleAllocateValidation['body'] ): Promise<Data<LSPVehicleAllocateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleAllocateValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}/allocate`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async deallocateVehicle( id: string ): Promise<Data<LSPVehicleDeallocateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleDeallocateValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}/deallocate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeVehicle( id: string ): Promise<Data<LSPVehicleRemoveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPVehicleRemoveValidation['response']>>>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Parking Facilities ────────────────────────────────────────────────────

	async addParkingFacility( body: LSPFleetParkingAddFacilityValidation['body'] ): Promise<Data<LSPFleetParkingAddFacilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingAddFacilityValidation['response']>>>({
			url: '/lsp/fleet/parking/facilities',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingFacilities( querystring?: LSPFleetParkingFetchFacilitiesValidation['querystring'] ): Promise<Data<LSPFleetParkingFetchFacilitiesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingFetchFacilitiesValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingFacility( id: string ): Promise<Data<LSPFleetParkingRetrieveFacilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingRetrieveFacilityValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getParkingFacilityUtilization( id: string, querystring: LSPFleetParkingGetUtilizationValidation['querystring'] ): Promise<Data<LSPFleetParkingGetUtilizationValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingGetUtilizationValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities/${id}/utilization${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingFacility( id: string, body: LSPFleetParkingUpdateFacilityValidation['body'] ): Promise<Data<LSPFleetParkingUpdateFacilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingUpdateFacilityValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeParkingFacility( id: string, body: LSPFleetParkingRemoveFacilityValidation['body'] ): Promise<Data<LSPFleetParkingRemoveFacilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingRemoveFacilityValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async addParkingSpace( id: string, body: LSPFleetParkingAddSpaceValidation['body'] ): Promise<Data<LSPFleetParkingAddSpaceValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingAddSpaceValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingSpace( id: string, spaceId: string, body: LSPFleetParkingUpdateSpaceValidation['body'] ): Promise<Data<LSPFleetParkingUpdateSpaceValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingUpdateSpaceValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeParkingSpace( id: string, spaceId: string ): Promise<boolean> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingRemoveSpaceValidation['response']>>>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}

	// ── Parking Assignments ───────────────────────────────────────────────────

	async createParkingAssignment( body: LSPFleetParkingCreateAssignmentValidation['body'] ): Promise<Data<LSPFleetParkingCreateAssignmentValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingCreateAssignmentValidation['response']>>>({
			url: '/lsp/fleet/parking/assignments',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingAssignments( querystring?: LSPFleetParkingFetchAssignmentsValidation['querystring'] ): Promise<Data<LSPFleetParkingFetchAssignmentsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingFetchAssignmentsValidation['response']>>>({
			url: `/lsp/fleet/parking/assignments${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingAssignment( id: string ): Promise<Data<LSPFleetParkingRetrieveAssignmentValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingRetrieveAssignmentValidation['response']>>>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingAssignment( id: string, body: LSPFleetParkingUpdateAssignmentValidation['body'] ): Promise<Data<LSPFleetParkingUpdateAssignmentValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingUpdateAssignmentValidation['response']>>>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkInParking( id: string ): Promise<Data<LSPFleetParkingCheckInValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingCheckInValidation['response']>>>({
			url: `/lsp/fleet/parking/assignments/${id}/check-in`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkOutParking( id: string ): Promise<Data<LSPFleetParkingCheckOutValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingCheckOutValidation['response']>>>({
			url: `/lsp/fleet/parking/assignments/${id}/check-out`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelParkingAssignment( id: string ): Promise<Data<LSPFleetParkingCancelAssignmentValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingCancelAssignmentValidation['response']>>>({
			url: `/lsp/fleet/parking/assignments/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Parking Reservations ──────────────────────────────────────────────────

	async createParkingReservation( body: LSPFleetParkingCreateReservationValidation['body'] ): Promise<Data<LSPFleetParkingCreateReservationValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingCreateReservationValidation['response']>>>({
			url: '/lsp/fleet/parking/reservations',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listParkingReservations( querystring?: LSPFleetParkingFetchReservationsValidation['querystring'] ): Promise<Data<LSPFleetParkingFetchReservationsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingFetchReservationsValidation['response']>>>({
			url: `/lsp/fleet/parking/reservations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveParkingReservation( id: string ): Promise<Data<LSPFleetParkingRetrieveReservationValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingRetrieveReservationValidation['response']>>>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateParkingReservation( id: string, body: LSPFleetParkingUpdateReservationValidation['body'] ): Promise<Data<LSPFleetParkingUpdateReservationValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingUpdateReservationValidation['response']>>>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async confirmParkingReservation( id: string ): Promise<Data<LSPFleetParkingConfirmReservationValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingConfirmReservationValidation['response']>>>({
			url: `/lsp/fleet/parking/reservations/${id}/confirm`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelParkingReservation( id: string ): Promise<Data<LSPFleetParkingCancelReservationValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetParkingCancelReservationValidation['response']>>>({
			url: `/lsp/fleet/parking/reservations/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Maintenance Records ───────────────────────────────────────────────────

	async addMaintenanceRecord( body: LSPFleetMaintenanceAddRecordValidation['body'] ): Promise<Data<LSPFleetMaintenanceAddRecordValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceAddRecordValidation['response']>>>({
			url: '/lsp/fleet/maintenance/records',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listMaintenanceRecords( querystring?: LSPFleetMaintenanceFetchRecordsValidation['querystring'] ): Promise<Data<LSPFleetMaintenanceFetchRecordsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceFetchRecordsValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveMaintenanceRecord( id: string ): Promise<Data<LSPFleetMaintenanceRetrieveRecordValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceRetrieveRecordValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getVehicleMaintenanceHistory( vid: string, querystring: LSPFleetMaintenanceGetHistoryValidation['querystring'] ): Promise<Data<LSPFleetMaintenanceGetHistoryValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceGetHistoryValidation['response']>>>({
			url: `/lsp/fleet/maintenance/vehicles/${vid}/history${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateMaintenanceRecord( id: string, body: LSPFleetMaintenanceUpdateRecordValidation['body'] ): Promise<Data<LSPFleetMaintenanceUpdateRecordValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceUpdateRecordValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async startMaintenance( id: string ): Promise<Data<LSPFleetMaintenanceStartValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceStartValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records/${id}/start`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeMaintenance( id: string ): Promise<Data<LSPFleetMaintenanceCompleteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceCompleteValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records/${id}/complete`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelMaintenance( id: string ): Promise<Data<LSPFleetMaintenanceCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceCancelValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records/${id}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async approveMaintenance( id: string ): Promise<Data<LSPFleetMaintenanceApproveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceApproveValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records/${id}/approve`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteMaintenanceRecord( id: string ): Promise<boolean> {
		const { error, message } = await this.http.request<Res<Data<LSPFleetMaintenanceDeleteRecordValidation['response']>>>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}

	// ── Maintenance Schedules ─────────────────────────────────────────────────

	async addMaintenanceSchedule( body: LSPFleetMaintenanceAddScheduleValidation['body'] ): Promise<Data<LSPFleetMaintenanceAddScheduleValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceAddScheduleValidation['response']>>>({
			url: '/lsp/fleet/maintenance/schedules',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listMaintenanceSchedules( querystring?: LSPFleetMaintenanceFetchSchedulesValidation['querystring'] ): Promise<Data<LSPFleetMaintenanceFetchSchedulesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceFetchSchedulesValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getUpcomingMaintenance( querystring?: LSPFleetMaintenanceGetUpcomingValidation['querystring'] ): Promise<Data<LSPFleetMaintenanceGetUpcomingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceGetUpcomingValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules/upcoming${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOverdueMaintenance( querystring?: LSPFleetMaintenanceGetOverdueValidation['querystring'] ): Promise<Data<LSPFleetMaintenanceGetOverdueValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceGetOverdueValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules/overdue${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveMaintenanceSchedule( id: string ): Promise<Data<LSPFleetMaintenanceRetrieveScheduleValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceRetrieveScheduleValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateMaintenanceSchedule( id: string, body: LSPFleetMaintenanceUpdateScheduleValidation['body'] ): Promise<Data<LSPFleetMaintenanceUpdateScheduleValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceUpdateScheduleValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async activateMaintenanceSchedule( id: string ): Promise<Data<LSPFleetMaintenanceActivateScheduleValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceActivateScheduleValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules/${id}/activate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deactivateMaintenanceSchedule( id: string ): Promise<Data<LSPFleetMaintenanceDeactivateScheduleValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPFleetMaintenanceDeactivateScheduleValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules/${id}/deactivate`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteMaintenanceSchedule( id: string ): Promise<boolean> {
		const { error, message } = await this.http.request<Res<Data<LSPFleetMaintenanceDeleteScheduleValidation['response']>>>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}
}

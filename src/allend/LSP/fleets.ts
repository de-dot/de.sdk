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

	async create( body: LSPFleetCreateValidation['body'] ): Promise<LSPFleetCreateValidation['response']> {
		return await this.http.request<LSPFleetCreateValidation['response']>({
			url: '/lsp/fleets/create',
			method: 'POST',
			body
		})
	}

	async list( querystring?: LSPFleetListValidation['querystring'] ): Promise<LSPFleetListValidation['response']> {
		return await this.http.request<LSPFleetListValidation['response']>({
			url: `/lsp/fleets${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<LSPFleetRetrieveValidation['response']> {
		return await this.http.request<LSPFleetRetrieveValidation['response']>({
			url: `/lsp/fleets/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: LSPFleetUpdateValidation['body'] ): Promise<LSPFleetUpdateValidation['response']> {
		return await this.http.request<LSPFleetUpdateValidation['response']>({
			url: `/lsp/fleets/${id}`,
			method: 'PATCH',
			body
		})
	}

	async updateStatus( id: string, body: LSPFleetUpdateStatusValidation['body'] ): Promise<LSPFleetUpdateStatusValidation['response']> {
		return await this.http.request<LSPFleetUpdateStatusValidation['response']>({
			url: `/lsp/fleets/${id}/status`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<LSPFleetRemoveValidation['response']> {
		return await this.http.request<LSPFleetRemoveValidation['response']>({
			url: `/lsp/fleets/${id}`,
			method: 'DELETE'
		})
	}

	// ── Vehicles ──────────────────────────────────────────────────────────────

	async addVehicle( body: LSPVehicleAddValidation['body'] ): Promise<LSPVehicleAddValidation['response']> {
		return await this.http.request<LSPVehicleAddValidation['response']>({
			url: '/lsp/fleet/vehicles/add',
			method: 'POST',
			body
		})
	}

	async listVehicles( querystring?: LSPVehicleListValidation['querystring'] ): Promise<LSPVehicleListValidation['response']> {
		return await this.http.request<LSPVehicleListValidation['response']>({
			url: `/lsp/fleet/vehicles${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveVehicle( id: string ): Promise<LSPVehicleRetrieveValidation['response']> {
		return await this.http.request<LSPVehicleRetrieveValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'GET'
		})
	}

	async updateVehicle( id: string, body: LSPVehicleUpdateValidation['body'] ): Promise<LSPVehicleUpdateValidation['response']> {
		return await this.http.request<LSPVehicleUpdateValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'PATCH',
			body
		})
	}

	async updateVehicleStatus( id: string, body: LSPVehicleUpdateStatusValidation['body'] ): Promise<LSPVehicleUpdateStatusValidation['response']> {
		return await this.http.request<LSPVehicleUpdateStatusValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}/status`,
			method: 'PATCH',
			body
		})
	}

	async updateVehicleSpecs( id: string, body: LSPVehicleUpdateSpecsValidation['body'] ): Promise<LSPVehicleUpdateSpecsValidation['response']> {
		return await this.http.request<LSPVehicleUpdateSpecsValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}/specs`,
			method: 'PATCH',
			body
		})
	}

	async updateVehicleIoT( id: string, body: LSPVehicleUpdateIoTValidation['body'] ): Promise<LSPVehicleUpdateIoTValidation['response']> {
		return await this.http.request<LSPVehicleUpdateIoTValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}/iot`,
			method: 'PATCH',
			body
		})
	}

	async allocateVehicle( id: string, body: LSPVehicleAllocateValidation['body'] ): Promise<LSPVehicleAllocateValidation['response']> {
		return await this.http.request<LSPVehicleAllocateValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}/allocate`,
			method: 'PUT',
			body
		})
	}

	async deallocateVehicle( id: string ): Promise<LSPVehicleDeallocateValidation['response']> {
		return await this.http.request<LSPVehicleDeallocateValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}/deallocate`,
			method: 'PATCH'
		})
	}

	async removeVehicle( id: string ): Promise<LSPVehicleRemoveValidation['response']> {
		return await this.http.request<LSPVehicleRemoveValidation['response']>({
			url: `/lsp/fleet/vehicles/${id}`,
			method: 'DELETE'
		})
	}

	// ── Parking Facilities ────────────────────────────────────────────────────

	async addParkingFacility( body: LSPFleetParkingAddFacilityValidation['body'] ): Promise<LSPFleetParkingAddFacilityValidation['response']> {
		return await this.http.request<LSPFleetParkingAddFacilityValidation['response']>({
			url: '/lsp/fleet/parking/facilities',
			method: 'POST',
			body
		})
	}

	async listParkingFacilities( querystring?: LSPFleetParkingFetchFacilitiesValidation['querystring'] ): Promise<LSPFleetParkingFetchFacilitiesValidation['response']> {
		return await this.http.request<LSPFleetParkingFetchFacilitiesValidation['response']>({
			url: `/lsp/fleet/parking/facilities${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveParkingFacility( id: string ): Promise<LSPFleetParkingRetrieveFacilityValidation['response']> {
		return await this.http.request<LSPFleetParkingRetrieveFacilityValidation['response']>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'GET'
		})
	}

	async getParkingFacilityUtilization( id: string, querystring: LSPFleetParkingGetUtilizationValidation['querystring'] ): Promise<LSPFleetParkingGetUtilizationValidation['response']> {
		return await this.http.request<LSPFleetParkingGetUtilizationValidation['response']>({
			url: `/lsp/fleet/parking/facilities/${id}/utilization${qs( querystring )}`,
			method: 'GET'
		})
	}

	async updateParkingFacility( id: string, body: LSPFleetParkingUpdateFacilityValidation['body'] ): Promise<LSPFleetParkingUpdateFacilityValidation['response']> {
		return await this.http.request<LSPFleetParkingUpdateFacilityValidation['response']>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'PATCH',
			body
		})
	}

	async removeParkingFacility( id: string, body: LSPFleetParkingRemoveFacilityValidation['body'] ): Promise<LSPFleetParkingRemoveFacilityValidation['response']> {
		return await this.http.request<LSPFleetParkingRemoveFacilityValidation['response']>({
			url: `/lsp/fleet/parking/facilities/${id}`,
			method: 'DELETE',
			body
		})
	}

	async addParkingSpace( id: string, body: LSPFleetParkingAddSpaceValidation['body'] ): Promise<LSPFleetParkingAddSpaceValidation['response']> {
		return await this.http.request<LSPFleetParkingAddSpaceValidation['response']>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces`,
			method: 'POST',
			body
		})
	}

	async updateParkingSpace( id: string, spaceId: string, body: LSPFleetParkingUpdateSpaceValidation['body'] ): Promise<LSPFleetParkingUpdateSpaceValidation['response']> {
		return await this.http.request<LSPFleetParkingUpdateSpaceValidation['response']>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'PATCH',
			body
		})
	}

	async removeParkingSpace( id: string, spaceId: string ): Promise<LSPFleetParkingRemoveSpaceValidation['response']> {
		return await this.http.request<LSPFleetParkingRemoveSpaceValidation['response']>({
			url: `/lsp/fleet/parking/facilities/${id}/spaces/${spaceId}`,
			method: 'DELETE'
		})
	}

	// ── Parking Assignments ───────────────────────────────────────────────────

	async createParkingAssignment( body: LSPFleetParkingCreateAssignmentValidation['body'] ): Promise<LSPFleetParkingCreateAssignmentValidation['response']> {
		return await this.http.request<LSPFleetParkingCreateAssignmentValidation['response']>({
			url: '/lsp/fleet/parking/assignments',
			method: 'POST',
			body
		})
	}

	async listParkingAssignments( querystring?: LSPFleetParkingFetchAssignmentsValidation['querystring'] ): Promise<LSPFleetParkingFetchAssignmentsValidation['response']> {
		return await this.http.request<LSPFleetParkingFetchAssignmentsValidation['response']>({
			url: `/lsp/fleet/parking/assignments${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveParkingAssignment( id: string ): Promise<LSPFleetParkingRetrieveAssignmentValidation['response']> {
		return await this.http.request<LSPFleetParkingRetrieveAssignmentValidation['response']>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'GET'
		})
	}

	async updateParkingAssignment( id: string, body: LSPFleetParkingUpdateAssignmentValidation['body'] ): Promise<LSPFleetParkingUpdateAssignmentValidation['response']> {
		return await this.http.request<LSPFleetParkingUpdateAssignmentValidation['response']>({
			url: `/lsp/fleet/parking/assignments/${id}`,
			method: 'PATCH',
			body
		})
	}

	async checkInParking( id: string ): Promise<LSPFleetParkingCheckInValidation['response']> {
		return await this.http.request<LSPFleetParkingCheckInValidation['response']>({
			url: `/lsp/fleet/parking/assignments/${id}/check-in`,
			method: 'PATCH'
		})
	}

	async checkOutParking( id: string ): Promise<LSPFleetParkingCheckOutValidation['response']> {
		return await this.http.request<LSPFleetParkingCheckOutValidation['response']>({
			url: `/lsp/fleet/parking/assignments/${id}/check-out`,
			method: 'PATCH'
		})
	}

	async cancelParkingAssignment( id: string ): Promise<LSPFleetParkingCancelAssignmentValidation['response']> {
		return await this.http.request<LSPFleetParkingCancelAssignmentValidation['response']>({
			url: `/lsp/fleet/parking/assignments/${id}/cancel`,
			method: 'PATCH'
		})
	}

	// ── Parking Reservations ──────────────────────────────────────────────────

	async createParkingReservation( body: LSPFleetParkingCreateReservationValidation['body'] ): Promise<LSPFleetParkingCreateReservationValidation['response']> {
		return await this.http.request<LSPFleetParkingCreateReservationValidation['response']>({
			url: '/lsp/fleet/parking/reservations',
			method: 'POST',
			body
		})
	}

	async listParkingReservations( querystring?: LSPFleetParkingFetchReservationsValidation['querystring'] ): Promise<LSPFleetParkingFetchReservationsValidation['response']> {
		return await this.http.request<LSPFleetParkingFetchReservationsValidation['response']>({
			url: `/lsp/fleet/parking/reservations${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveParkingReservation( id: string ): Promise<LSPFleetParkingRetrieveReservationValidation['response']> {
		return await this.http.request<LSPFleetParkingRetrieveReservationValidation['response']>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'GET'
		})
	}

	async updateParkingReservation( id: string, body: LSPFleetParkingUpdateReservationValidation['body'] ): Promise<LSPFleetParkingUpdateReservationValidation['response']> {
		return await this.http.request<LSPFleetParkingUpdateReservationValidation['response']>({
			url: `/lsp/fleet/parking/reservations/${id}`,
			method: 'PATCH',
			body
		})
	}

	async confirmParkingReservation( id: string ): Promise<LSPFleetParkingConfirmReservationValidation['response']> {
		return await this.http.request<LSPFleetParkingConfirmReservationValidation['response']>({
			url: `/lsp/fleet/parking/reservations/${id}/confirm`,
			method: 'PATCH'
		})
	}

	async cancelParkingReservation( id: string ): Promise<LSPFleetParkingCancelReservationValidation['response']> {
		return await this.http.request<LSPFleetParkingCancelReservationValidation['response']>({
			url: `/lsp/fleet/parking/reservations/${id}/cancel`,
			method: 'PATCH'
		})
	}

	// ── Maintenance Records ───────────────────────────────────────────────────

	async addMaintenanceRecord( body: LSPFleetMaintenanceAddRecordValidation['body'] ): Promise<LSPFleetMaintenanceAddRecordValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceAddRecordValidation['response']>({
			url: '/lsp/fleet/maintenance/records',
			method: 'POST',
			body
		})
	}

	async listMaintenanceRecords( querystring?: LSPFleetMaintenanceFetchRecordsValidation['querystring'] ): Promise<LSPFleetMaintenanceFetchRecordsValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceFetchRecordsValidation['response']>({
			url: `/lsp/fleet/maintenance/records${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveMaintenanceRecord( id: string ): Promise<LSPFleetMaintenanceRetrieveRecordValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceRetrieveRecordValidation['response']>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'GET'
		})
	}

	async getVehicleMaintenanceHistory( vid: string, querystring: LSPFleetMaintenanceGetHistoryValidation['querystring'] ): Promise<LSPFleetMaintenanceGetHistoryValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceGetHistoryValidation['response']>({
			url: `/lsp/fleet/maintenance/vehicles/${vid}/history${qs( querystring )}`,
			method: 'GET'
		})
	}

	async updateMaintenanceRecord( id: string, body: LSPFleetMaintenanceUpdateRecordValidation['body'] ): Promise<LSPFleetMaintenanceUpdateRecordValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceUpdateRecordValidation['response']>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'PATCH',
			body
		})
	}

	async startMaintenance( id: string ): Promise<LSPFleetMaintenanceStartValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceStartValidation['response']>({
			url: `/lsp/fleet/maintenance/records/${id}/start`,
			method: 'PATCH'
		})
	}

	async completeMaintenance( id: string ): Promise<LSPFleetMaintenanceCompleteValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceCompleteValidation['response']>({
			url: `/lsp/fleet/maintenance/records/${id}/complete`,
			method: 'PATCH'
		})
	}

	async cancelMaintenance( id: string ): Promise<LSPFleetMaintenanceCancelValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceCancelValidation['response']>({
			url: `/lsp/fleet/maintenance/records/${id}/cancel`,
			method: 'PATCH'
		})
	}

	async approveMaintenance( id: string ): Promise<LSPFleetMaintenanceApproveValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceApproveValidation['response']>({
			url: `/lsp/fleet/maintenance/records/${id}/approve`,
			method: 'PATCH'
		})
	}

	async deleteMaintenanceRecord( id: string ): Promise<LSPFleetMaintenanceDeleteRecordValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceDeleteRecordValidation['response']>({
			url: `/lsp/fleet/maintenance/records/${id}`,
			method: 'DELETE'
		})
	}

	// ── Maintenance Schedules ─────────────────────────────────────────────────

	async addMaintenanceSchedule( body: LSPFleetMaintenanceAddScheduleValidation['body'] ): Promise<LSPFleetMaintenanceAddScheduleValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceAddScheduleValidation['response']>({
			url: '/lsp/fleet/maintenance/schedules',
			method: 'POST',
			body
		})
	}

	async listMaintenanceSchedules( querystring?: LSPFleetMaintenanceFetchSchedulesValidation['querystring'] ): Promise<LSPFleetMaintenanceFetchSchedulesValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceFetchSchedulesValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getUpcomingMaintenance( querystring?: LSPFleetMaintenanceGetUpcomingValidation['querystring'] ): Promise<LSPFleetMaintenanceGetUpcomingValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceGetUpcomingValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules/upcoming${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getOverdueMaintenance( querystring?: LSPFleetMaintenanceGetOverdueValidation['querystring'] ): Promise<LSPFleetMaintenanceGetOverdueValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceGetOverdueValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules/overdue${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveMaintenanceSchedule( id: string ): Promise<LSPFleetMaintenanceRetrieveScheduleValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceRetrieveScheduleValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'GET'
		})
	}

	async updateMaintenanceSchedule( id: string, body: LSPFleetMaintenanceUpdateScheduleValidation['body'] ): Promise<LSPFleetMaintenanceUpdateScheduleValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceUpdateScheduleValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'PATCH',
			body
		})
	}

	async activateMaintenanceSchedule( id: string ): Promise<LSPFleetMaintenanceActivateScheduleValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceActivateScheduleValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules/${id}/activate`,
			method: 'PATCH'
		})
	}

	async deactivateMaintenanceSchedule( id: string ): Promise<LSPFleetMaintenanceDeactivateScheduleValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceDeactivateScheduleValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules/${id}/deactivate`,
			method: 'PATCH'
		})
	}

	async deleteMaintenanceSchedule( id: string ): Promise<LSPFleetMaintenanceDeleteScheduleValidation['response']> {
		return await this.http.request<LSPFleetMaintenanceDeleteScheduleValidation['response']>({
			url: `/lsp/fleet/maintenance/schedules/${id}`,
			method: 'DELETE'
		})
	}
}

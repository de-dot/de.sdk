import type {
	LSPCoverageOverviewValidation,
	LSPCoverageAddCityAreaValidation,
	LSPCoverageAddTownAreaValidation,
	LSPCoverageAddMetroAreaValidation,
	LSPCoverageAddCountyAreaValidation,
	LSPCoverageAddStateAreaValidation,
	LSPCoverageAddRegionAreaValidation,
	LSPCoverageAddCountryAreaValidation,
	LSPCoverageAddCustomAreaValidation,
	LSPCoverageUpdateCityAreaValidation,
	LSPCoverageUpdateTownAreaValidation,
	LSPCoverageUpdateMetroAreaValidation,
	LSPCoverageUpdateCountyAreaValidation,
	LSPCoverageUpdateStateAreaValidation,
	LSPCoverageUpdateRegionAreaValidation,
	LSPCoverageUpdateCountryAreaValidation,
	LSPCoverageUpdateCustomAreaValidation,
	LSPCoverageGetAreaValidation,
	LSPCoverageListAreasValidation,
	LSPCoverageLinkNodeValidation,
	LSPCoverageUnlinkNodeValidation,
	LSPCoverageRemoveAreaValidation,
	LSPCoverageAddPointsRouteValidation,
	LSPCoverageAddGeoJsonRouteValidation,
	LSPCoverageUpdatePointsRouteValidation,
	LSPCoverageUpdateGeoJsonRouteValidation,
	LSPCoverageGetRouteValidation,
	LSPCoverageListRoutesValidation,
	LSPCoverageAddRouteNodeValidation,
	LSPCoverageRemoveRouteNodeValidation,
	LSPCoverageRemoveRouteValidation,
	LSPCoverageCheckValidation,
	LSPCoverageFindAreasValidation,
	LSPCoverageGetServiceabilityValidation,
	LSPCoverageValidateBoundaryValidation,
	LSPCoverageFindNearestValidation,
	LSPCoverageCheckRestrictionsValidation,
	LSPCoverageFindParkingZonesValidation
} from '@de./types/lsp/coverage'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Coverage ────────────────────────────────────────────────────────────────
//
// de.arch /lsp/coverage — overview, areas, routes, and checks.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSPCoverage {
	constructor( private http: Http ){}

	async overview( querystring?: LSPCoverageOverviewValidation['querystring'] ): Promise<Data<LSPCoverageOverviewValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageOverviewValidation['response']>>>({
			url: `/lsp/coverage${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Areas ─────────────────────────────────────────────────────────────────

	async addCityArea( body: LSPCoverageAddCityAreaValidation['body'] ): Promise<Data<LSPCoverageAddCityAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddCityAreaValidation['response']>>>({ url: '/lsp/coverage/areas/city', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addTownArea( body: LSPCoverageAddTownAreaValidation['body'] ): Promise<Data<LSPCoverageAddTownAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddTownAreaValidation['response']>>>({ url: '/lsp/coverage/areas/town', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addMetropolitanArea( body: LSPCoverageAddMetroAreaValidation['body'] ): Promise<Data<LSPCoverageAddMetroAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddMetroAreaValidation['response']>>>({ url: '/lsp/coverage/areas/metropolitan', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addCountyArea( body: LSPCoverageAddCountyAreaValidation['body'] ): Promise<Data<LSPCoverageAddCountyAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddCountyAreaValidation['response']>>>({ url: '/lsp/coverage/areas/county', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addStateArea( body: LSPCoverageAddStateAreaValidation['body'] ): Promise<Data<LSPCoverageAddStateAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddStateAreaValidation['response']>>>({ url: '/lsp/coverage/areas/state', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addRegionArea( body: LSPCoverageAddRegionAreaValidation['body'] ): Promise<Data<LSPCoverageAddRegionAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddRegionAreaValidation['response']>>>({ url: '/lsp/coverage/areas/region', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addCountryArea( body: LSPCoverageAddCountryAreaValidation['body'] ): Promise<Data<LSPCoverageAddCountryAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddCountryAreaValidation['response']>>>({ url: '/lsp/coverage/areas/country', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addCustomArea( body: LSPCoverageAddCustomAreaValidation['body'] ): Promise<Data<LSPCoverageAddCustomAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddCustomAreaValidation['response']>>>({ url: '/lsp/coverage/areas/custom', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async listAreas( querystring?: LSPCoverageListAreasValidation['querystring'] ): Promise<Data<LSPCoverageListAreasValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageListAreasValidation['response']>>>({ url: `/lsp/coverage/areas${qs( querystring )}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async getArea( id: string ): Promise<Data<LSPCoverageGetAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageGetAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async updateCityArea( id: string, body: LSPCoverageUpdateCityAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateCityAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateCityAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/city`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateTownArea( id: string, body: LSPCoverageUpdateTownAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateTownAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateTownAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/town`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateMetropolitanArea( id: string, body: LSPCoverageUpdateMetroAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateMetroAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateMetroAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/metropolitan`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateCountyArea( id: string, body: LSPCoverageUpdateCountyAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateCountyAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateCountyAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/county`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateStateArea( id: string, body: LSPCoverageUpdateStateAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateStateAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateStateAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/state`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateRegionArea( id: string, body: LSPCoverageUpdateRegionAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateRegionAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateRegionAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/region`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateCountryArea( id: string, body: LSPCoverageUpdateCountryAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateCountryAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateCountryAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/country`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateCustomArea( id: string, body: LSPCoverageUpdateCustomAreaValidation['body'] ): Promise<Data<LSPCoverageUpdateCustomAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateCustomAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/custom`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async linkNode( id: string, body: LSPCoverageLinkNodeValidation['body'] ): Promise<Data<LSPCoverageLinkNodeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageLinkNodeValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/link`, method: 'PUT', body })
		if( error ) throw new Error( message )
		return data
	}

	async unlinkNode( id: string, body: LSPCoverageUnlinkNodeValidation['body'] ): Promise<Data<LSPCoverageUnlinkNodeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUnlinkNodeValidation['response']>>>({ url: `/lsp/coverage/areas/${id}/unlink`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async removeArea( id: string ): Promise<Data<LSPCoverageRemoveAreaValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageRemoveAreaValidation['response']>>>({ url: `/lsp/coverage/areas/${id}`, method: 'DELETE' })
		if( error ) throw new Error( message )
		return data
	}

	// ── Routes ────────────────────────────────────────────────────────────────

	async addPointsRoute( body: LSPCoverageAddPointsRouteValidation['body'] ): Promise<Data<LSPCoverageAddPointsRouteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddPointsRouteValidation['response']>>>({ url: '/lsp/coverage/routes/points', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addGeoJsonRoute( body: LSPCoverageAddGeoJsonRouteValidation['body'] ): Promise<Data<LSPCoverageAddGeoJsonRouteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddGeoJsonRouteValidation['response']>>>({ url: '/lsp/coverage/routes/geojson', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async listRoutes( querystring?: LSPCoverageListRoutesValidation['querystring'] ): Promise<Data<LSPCoverageListRoutesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageListRoutesValidation['response']>>>({ url: `/lsp/coverage/routes${qs( querystring )}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async getRoute( id: string ): Promise<Data<LSPCoverageGetRouteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageGetRouteValidation['response']>>>({ url: `/lsp/coverage/routes/${id}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async updatePointsRoute( id: string, body: LSPCoverageUpdatePointsRouteValidation['body'] ): Promise<Data<LSPCoverageUpdatePointsRouteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdatePointsRouteValidation['response']>>>({ url: `/lsp/coverage/routes/${id}/points`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateGeoJsonRoute( id: string, body: LSPCoverageUpdateGeoJsonRouteValidation['body'] ): Promise<Data<LSPCoverageUpdateGeoJsonRouteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageUpdateGeoJsonRouteValidation['response']>>>({ url: `/lsp/coverage/routes/${id}/geojson`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async addRouteNode( id: string, body: LSPCoverageAddRouteNodeValidation['body'] ): Promise<Data<LSPCoverageAddRouteNodeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageAddRouteNodeValidation['response']>>>({ url: `/lsp/coverage/routes/${id}/transit-point`, method: 'PUT', body })
		if( error ) throw new Error( message )
		return data
	}

	async removeRouteNode( id: string, body: LSPCoverageRemoveRouteNodeValidation['body'] ): Promise<Data<LSPCoverageRemoveRouteNodeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageRemoveRouteNodeValidation['response']>>>({ url: `/lsp/coverage/routes/${id}/transit-point`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async removeRoute( id: string ): Promise<Data<LSPCoverageRemoveRouteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageRemoveRouteValidation['response']>>>({ url: `/lsp/coverage/routes/${id}`, method: 'DELETE' })
		if( error ) throw new Error( message )
		return data
	}

	// ── Checks ────────────────────────────────────────────────────────────────

	async check( body: LSPCoverageCheckValidation['body'] ): Promise<Data<LSPCoverageCheckValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageCheckValidation['response']>>>({ url: '/lsp/coverage/checks/check', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async findAreas( body: LSPCoverageFindAreasValidation['body'] ): Promise<Data<LSPCoverageFindAreasValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageFindAreasValidation['response']>>>({ url: '/lsp/coverage/checks/find', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async getServiceability( querystring: LSPCoverageGetServiceabilityValidation['querystring'] ): Promise<Data<LSPCoverageGetServiceabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageGetServiceabilityValidation['response']>>>({ url: `/lsp/coverage/checks/serviceability${qs( querystring )}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async validateBoundary( body: LSPCoverageValidateBoundaryValidation['body'] ): Promise<Data<LSPCoverageValidateBoundaryValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageValidateBoundaryValidation['response']>>>({ url: '/lsp/coverage/checks/validate-boundary', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async findNearest( body: LSPCoverageFindNearestValidation['body'] ): Promise<Data<LSPCoverageFindNearestValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageFindNearestValidation['response']>>>({ url: '/lsp/coverage/checks/nearest', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async checkRestrictions( body: LSPCoverageCheckRestrictionsValidation['body'] ): Promise<Data<LSPCoverageCheckRestrictionsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageCheckRestrictionsValidation['response']>>>({ url: '/lsp/coverage/checks/restrictions', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async findParkingZones( body: LSPCoverageFindParkingZonesValidation['body'] ): Promise<Data<LSPCoverageFindParkingZonesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCoverageFindParkingZonesValidation['response']>>>({ url: '/lsp/coverage/checks/parking', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}
}

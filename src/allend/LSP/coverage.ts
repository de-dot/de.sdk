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
import { qs, type Http, type Res } from '../../utils'

// ── LSP Coverage ────────────────────────────────────────────────────────────────
//
// de.arch /lsp/coverage — overview, areas, routes, and checks.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSPCoverage {
	constructor( private http: Http ){}

	async overview( querystring?: LSPCoverageOverviewValidation['querystring'] ): Promise<LSPCoverageOverviewValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageOverviewValidation['response']>>({
			url: `/lsp/coverage${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Areas ─────────────────────────────────────────────────────────────────

	async addCityArea( body: LSPCoverageAddCityAreaValidation['body'] ): Promise<LSPCoverageAddCityAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddCityAreaValidation['response']>>({ url: '/lsp/coverage/areas/city', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addTownArea( body: LSPCoverageAddTownAreaValidation['body'] ): Promise<LSPCoverageAddTownAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddTownAreaValidation['response']>>({ url: '/lsp/coverage/areas/town', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addMetropolitanArea( body: LSPCoverageAddMetroAreaValidation['body'] ): Promise<LSPCoverageAddMetroAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddMetroAreaValidation['response']>>({ url: '/lsp/coverage/areas/metropolitan', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addCountyArea( body: LSPCoverageAddCountyAreaValidation['body'] ): Promise<LSPCoverageAddCountyAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddCountyAreaValidation['response']>>({ url: '/lsp/coverage/areas/county', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addStateArea( body: LSPCoverageAddStateAreaValidation['body'] ): Promise<LSPCoverageAddStateAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddStateAreaValidation['response']>>({ url: '/lsp/coverage/areas/state', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addRegionArea( body: LSPCoverageAddRegionAreaValidation['body'] ): Promise<LSPCoverageAddRegionAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddRegionAreaValidation['response']>>({ url: '/lsp/coverage/areas/region', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addCountryArea( body: LSPCoverageAddCountryAreaValidation['body'] ): Promise<LSPCoverageAddCountryAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddCountryAreaValidation['response']>>({ url: '/lsp/coverage/areas/country', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addCustomArea( body: LSPCoverageAddCustomAreaValidation['body'] ): Promise<LSPCoverageAddCustomAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddCustomAreaValidation['response']>>({ url: '/lsp/coverage/areas/custom', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async listAreas( querystring?: LSPCoverageListAreasValidation['querystring'] ): Promise<LSPCoverageListAreasValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageListAreasValidation['response']>>({ url: `/lsp/coverage/areas${qs( querystring )}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async getArea( id: string ): Promise<LSPCoverageGetAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageGetAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async updateCityArea( id: string, body: LSPCoverageUpdateCityAreaValidation['body'] ): Promise<LSPCoverageUpdateCityAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateCityAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/city`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateTownArea( id: string, body: LSPCoverageUpdateTownAreaValidation['body'] ): Promise<LSPCoverageUpdateTownAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateTownAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/town`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateMetropolitanArea( id: string, body: LSPCoverageUpdateMetroAreaValidation['body'] ): Promise<LSPCoverageUpdateMetroAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateMetroAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/metropolitan`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateCountyArea( id: string, body: LSPCoverageUpdateCountyAreaValidation['body'] ): Promise<LSPCoverageUpdateCountyAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateCountyAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/county`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateStateArea( id: string, body: LSPCoverageUpdateStateAreaValidation['body'] ): Promise<LSPCoverageUpdateStateAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateStateAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/state`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateRegionArea( id: string, body: LSPCoverageUpdateRegionAreaValidation['body'] ): Promise<LSPCoverageUpdateRegionAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateRegionAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/region`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateCountryArea( id: string, body: LSPCoverageUpdateCountryAreaValidation['body'] ): Promise<LSPCoverageUpdateCountryAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateCountryAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/country`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateCustomArea( id: string, body: LSPCoverageUpdateCustomAreaValidation['body'] ): Promise<LSPCoverageUpdateCustomAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateCustomAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}/custom`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async linkNode( id: string, body: LSPCoverageLinkNodeValidation['body'] ): Promise<LSPCoverageLinkNodeValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageLinkNodeValidation['response']>>({ url: `/lsp/coverage/areas/${id}/link`, method: 'PUT', body })
		if( error ) throw new Error( message )
		return data
	}

	async unlinkNode( id: string, body: LSPCoverageUnlinkNodeValidation['body'] ): Promise<LSPCoverageUnlinkNodeValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUnlinkNodeValidation['response']>>({ url: `/lsp/coverage/areas/${id}/unlink`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async removeArea( id: string ): Promise<LSPCoverageRemoveAreaValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageRemoveAreaValidation['response']>>({ url: `/lsp/coverage/areas/${id}`, method: 'DELETE' })
		if( error ) throw new Error( message )
		return data
	}

	// ── Routes ────────────────────────────────────────────────────────────────

	async addPointsRoute( body: LSPCoverageAddPointsRouteValidation['body'] ): Promise<LSPCoverageAddPointsRouteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddPointsRouteValidation['response']>>({ url: '/lsp/coverage/routes/points', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async addGeoJsonRoute( body: LSPCoverageAddGeoJsonRouteValidation['body'] ): Promise<LSPCoverageAddGeoJsonRouteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddGeoJsonRouteValidation['response']>>({ url: '/lsp/coverage/routes/geojson', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async listRoutes( querystring?: LSPCoverageListRoutesValidation['querystring'] ): Promise<LSPCoverageListRoutesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageListRoutesValidation['response']>>({ url: `/lsp/coverage/routes${qs( querystring )}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async getRoute( id: string ): Promise<LSPCoverageGetRouteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageGetRouteValidation['response']>>({ url: `/lsp/coverage/routes/${id}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async updatePointsRoute( id: string, body: LSPCoverageUpdatePointsRouteValidation['body'] ): Promise<LSPCoverageUpdatePointsRouteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdatePointsRouteValidation['response']>>({ url: `/lsp/coverage/routes/${id}/points`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async updateGeoJsonRoute( id: string, body: LSPCoverageUpdateGeoJsonRouteValidation['body'] ): Promise<LSPCoverageUpdateGeoJsonRouteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageUpdateGeoJsonRouteValidation['response']>>({ url: `/lsp/coverage/routes/${id}/geojson`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async addRouteNode( id: string, body: LSPCoverageAddRouteNodeValidation['body'] ): Promise<LSPCoverageAddRouteNodeValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageAddRouteNodeValidation['response']>>({ url: `/lsp/coverage/routes/${id}/transit-point`, method: 'PUT', body })
		if( error ) throw new Error( message )
		return data
	}

	async removeRouteNode( id: string, body: LSPCoverageRemoveRouteNodeValidation['body'] ): Promise<LSPCoverageRemoveRouteNodeValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageRemoveRouteNodeValidation['response']>>({ url: `/lsp/coverage/routes/${id}/transit-point`, method: 'PATCH', body })
		if( error ) throw new Error( message )
		return data
	}

	async removeRoute( id: string ): Promise<LSPCoverageRemoveRouteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageRemoveRouteValidation['response']>>({ url: `/lsp/coverage/routes/${id}`, method: 'DELETE' })
		if( error ) throw new Error( message )
		return data
	}

	// ── Checks ────────────────────────────────────────────────────────────────

	async check( body: LSPCoverageCheckValidation['body'] ): Promise<LSPCoverageCheckValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageCheckValidation['response']>>({ url: '/lsp/coverage/checks/check', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async findAreas( body: LSPCoverageFindAreasValidation['body'] ): Promise<LSPCoverageFindAreasValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageFindAreasValidation['response']>>({ url: '/lsp/coverage/checks/find', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async getServiceability( querystring: LSPCoverageGetServiceabilityValidation['querystring'] ): Promise<LSPCoverageGetServiceabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageGetServiceabilityValidation['response']>>({ url: `/lsp/coverage/checks/serviceability${qs( querystring )}`, method: 'GET' })
		if( error ) throw new Error( message )
		return data
	}

	async validateBoundary( body: LSPCoverageValidateBoundaryValidation['body'] ): Promise<LSPCoverageValidateBoundaryValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageValidateBoundaryValidation['response']>>({ url: '/lsp/coverage/checks/validate-boundary', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async findNearest( body: LSPCoverageFindNearestValidation['body'] ): Promise<LSPCoverageFindNearestValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageFindNearestValidation['response']>>({ url: '/lsp/coverage/checks/nearest', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async checkRestrictions( body: LSPCoverageCheckRestrictionsValidation['body'] ): Promise<LSPCoverageCheckRestrictionsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageCheckRestrictionsValidation['response']>>({ url: '/lsp/coverage/checks/restrictions', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}

	async findParkingZones( body: LSPCoverageFindParkingZonesValidation['body'] ): Promise<LSPCoverageFindParkingZonesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCoverageFindParkingZonesValidation['response']>>({ url: '/lsp/coverage/checks/parking', method: 'POST', body })
		if( error ) throw new Error( message )
		return data
	}
}

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

	async overview( querystring?: LSPCoverageOverviewValidation['querystring'] ): Promise<LSPCoverageOverviewValidation['response']> {
		return await this.http.request<LSPCoverageOverviewValidation['response']>({
			url: `/lsp/coverage${qs( querystring )}`,
			method: 'GET'
		})
	}

	// ── Areas ─────────────────────────────────────────────────────────────────

	async addCityArea( body: LSPCoverageAddCityAreaValidation['body'] ): Promise<LSPCoverageAddCityAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddCityAreaValidation['response']>({ url: '/lsp/coverage/areas/city', method: 'POST', body })
	}

	async addTownArea( body: LSPCoverageAddTownAreaValidation['body'] ): Promise<LSPCoverageAddTownAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddTownAreaValidation['response']>({ url: '/lsp/coverage/areas/town', method: 'POST', body })
	}

	async addMetropolitanArea( body: LSPCoverageAddMetroAreaValidation['body'] ): Promise<LSPCoverageAddMetroAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddMetroAreaValidation['response']>({ url: '/lsp/coverage/areas/metropolitan', method: 'POST', body })
	}

	async addCountyArea( body: LSPCoverageAddCountyAreaValidation['body'] ): Promise<LSPCoverageAddCountyAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddCountyAreaValidation['response']>({ url: '/lsp/coverage/areas/county', method: 'POST', body })
	}

	async addStateArea( body: LSPCoverageAddStateAreaValidation['body'] ): Promise<LSPCoverageAddStateAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddStateAreaValidation['response']>({ url: '/lsp/coverage/areas/state', method: 'POST', body })
	}

	async addRegionArea( body: LSPCoverageAddRegionAreaValidation['body'] ): Promise<LSPCoverageAddRegionAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddRegionAreaValidation['response']>({ url: '/lsp/coverage/areas/region', method: 'POST', body })
	}

	async addCountryArea( body: LSPCoverageAddCountryAreaValidation['body'] ): Promise<LSPCoverageAddCountryAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddCountryAreaValidation['response']>({ url: '/lsp/coverage/areas/country', method: 'POST', body })
	}

	async addCustomArea( body: LSPCoverageAddCustomAreaValidation['body'] ): Promise<LSPCoverageAddCustomAreaValidation['response']> {
		return await this.http.request<LSPCoverageAddCustomAreaValidation['response']>({ url: '/lsp/coverage/areas/custom', method: 'POST', body })
	}

	async listAreas( querystring?: LSPCoverageListAreasValidation['querystring'] ): Promise<LSPCoverageListAreasValidation['response']> {
		return await this.http.request<LSPCoverageListAreasValidation['response']>({ url: `/lsp/coverage/areas${qs( querystring )}`, method: 'GET' })
	}

	async getArea( id: string ): Promise<LSPCoverageGetAreaValidation['response']> {
		return await this.http.request<LSPCoverageGetAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}`, method: 'GET' })
	}

	async updateCityArea( id: string, body: LSPCoverageUpdateCityAreaValidation['body'] ): Promise<LSPCoverageUpdateCityAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateCityAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/city`, method: 'PATCH', body })
	}

	async updateTownArea( id: string, body: LSPCoverageUpdateTownAreaValidation['body'] ): Promise<LSPCoverageUpdateTownAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateTownAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/town`, method: 'PATCH', body })
	}

	async updateMetropolitanArea( id: string, body: LSPCoverageUpdateMetroAreaValidation['body'] ): Promise<LSPCoverageUpdateMetroAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateMetroAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/metropolitan`, method: 'PATCH', body })
	}

	async updateCountyArea( id: string, body: LSPCoverageUpdateCountyAreaValidation['body'] ): Promise<LSPCoverageUpdateCountyAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateCountyAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/county`, method: 'PATCH', body })
	}

	async updateStateArea( id: string, body: LSPCoverageUpdateStateAreaValidation['body'] ): Promise<LSPCoverageUpdateStateAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateStateAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/state`, method: 'PATCH', body })
	}

	async updateRegionArea( id: string, body: LSPCoverageUpdateRegionAreaValidation['body'] ): Promise<LSPCoverageUpdateRegionAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateRegionAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/region`, method: 'PATCH', body })
	}

	async updateCountryArea( id: string, body: LSPCoverageUpdateCountryAreaValidation['body'] ): Promise<LSPCoverageUpdateCountryAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateCountryAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/country`, method: 'PATCH', body })
	}

	async updateCustomArea( id: string, body: LSPCoverageUpdateCustomAreaValidation['body'] ): Promise<LSPCoverageUpdateCustomAreaValidation['response']> {
		return await this.http.request<LSPCoverageUpdateCustomAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}/custom`, method: 'PATCH', body })
	}

	async linkNode( id: string, body: LSPCoverageLinkNodeValidation['body'] ): Promise<LSPCoverageLinkNodeValidation['response']> {
		return await this.http.request<LSPCoverageLinkNodeValidation['response']>({ url: `/lsp/coverage/areas/${id}/link`, method: 'PUT', body })
	}

	async unlinkNode( id: string, body: LSPCoverageUnlinkNodeValidation['body'] ): Promise<LSPCoverageUnlinkNodeValidation['response']> {
		return await this.http.request<LSPCoverageUnlinkNodeValidation['response']>({ url: `/lsp/coverage/areas/${id}/unlink`, method: 'PATCH', body })
	}

	async removeArea( id: string ): Promise<LSPCoverageRemoveAreaValidation['response']> {
		return await this.http.request<LSPCoverageRemoveAreaValidation['response']>({ url: `/lsp/coverage/areas/${id}`, method: 'DELETE' })
	}

	// ── Routes ────────────────────────────────────────────────────────────────

	async addPointsRoute( body: LSPCoverageAddPointsRouteValidation['body'] ): Promise<LSPCoverageAddPointsRouteValidation['response']> {
		return await this.http.request<LSPCoverageAddPointsRouteValidation['response']>({ url: '/lsp/coverage/routes/points', method: 'POST', body })
	}

	async addGeoJsonRoute( body: LSPCoverageAddGeoJsonRouteValidation['body'] ): Promise<LSPCoverageAddGeoJsonRouteValidation['response']> {
		return await this.http.request<LSPCoverageAddGeoJsonRouteValidation['response']>({ url: '/lsp/coverage/routes/geojson', method: 'POST', body })
	}

	async listRoutes( querystring?: LSPCoverageListRoutesValidation['querystring'] ): Promise<LSPCoverageListRoutesValidation['response']> {
		return await this.http.request<LSPCoverageListRoutesValidation['response']>({ url: `/lsp/coverage/routes${qs( querystring )}`, method: 'GET' })
	}

	async getRoute( id: string ): Promise<LSPCoverageGetRouteValidation['response']> {
		return await this.http.request<LSPCoverageGetRouteValidation['response']>({ url: `/lsp/coverage/routes/${id}`, method: 'GET' })
	}

	async updatePointsRoute( id: string, body: LSPCoverageUpdatePointsRouteValidation['body'] ): Promise<LSPCoverageUpdatePointsRouteValidation['response']> {
		return await this.http.request<LSPCoverageUpdatePointsRouteValidation['response']>({ url: `/lsp/coverage/routes/${id}/points`, method: 'PATCH', body })
	}

	async updateGeoJsonRoute( id: string, body: LSPCoverageUpdateGeoJsonRouteValidation['body'] ): Promise<LSPCoverageUpdateGeoJsonRouteValidation['response']> {
		return await this.http.request<LSPCoverageUpdateGeoJsonRouteValidation['response']>({ url: `/lsp/coverage/routes/${id}/geojson`, method: 'PATCH', body })
	}

	async addRouteNode( id: string, body: LSPCoverageAddRouteNodeValidation['body'] ): Promise<LSPCoverageAddRouteNodeValidation['response']> {
		return await this.http.request<LSPCoverageAddRouteNodeValidation['response']>({ url: `/lsp/coverage/routes/${id}/transit-point`, method: 'PUT', body })
	}

	async removeRouteNode( id: string, body: LSPCoverageRemoveRouteNodeValidation['body'] ): Promise<LSPCoverageRemoveRouteNodeValidation['response']> {
		return await this.http.request<LSPCoverageRemoveRouteNodeValidation['response']>({ url: `/lsp/coverage/routes/${id}/transit-point`, method: 'PATCH', body })
	}

	async removeRoute( id: string ): Promise<LSPCoverageRemoveRouteValidation['response']> {
		return await this.http.request<LSPCoverageRemoveRouteValidation['response']>({ url: `/lsp/coverage/routes/${id}`, method: 'DELETE' })
	}

	// ── Checks ────────────────────────────────────────────────────────────────

	async check( body: LSPCoverageCheckValidation['body'] ): Promise<LSPCoverageCheckValidation['response']> {
		return await this.http.request<LSPCoverageCheckValidation['response']>({ url: '/lsp/coverage/checks/check', method: 'POST', body })
	}

	async findAreas( body: LSPCoverageFindAreasValidation['body'] ): Promise<LSPCoverageFindAreasValidation['response']> {
		return await this.http.request<LSPCoverageFindAreasValidation['response']>({ url: '/lsp/coverage/checks/find', method: 'POST', body })
	}

	async getServiceability( querystring: LSPCoverageGetServiceabilityValidation['querystring'] ): Promise<LSPCoverageGetServiceabilityValidation['response']> {
		return await this.http.request<LSPCoverageGetServiceabilityValidation['response']>({ url: `/lsp/coverage/checks/serviceability${qs( querystring )}`, method: 'GET' })
	}

	async validateBoundary( body: LSPCoverageValidateBoundaryValidation['body'] ): Promise<LSPCoverageValidateBoundaryValidation['response']> {
		return await this.http.request<LSPCoverageValidateBoundaryValidation['response']>({ url: '/lsp/coverage/checks/validate-boundary', method: 'POST', body })
	}

	async findNearest( body: LSPCoverageFindNearestValidation['body'] ): Promise<LSPCoverageFindNearestValidation['response']> {
		return await this.http.request<LSPCoverageFindNearestValidation['response']>({ url: '/lsp/coverage/checks/nearest', method: 'POST', body })
	}

	async checkRestrictions( body: LSPCoverageCheckRestrictionsValidation['body'] ): Promise<LSPCoverageCheckRestrictionsValidation['response']> {
		return await this.http.request<LSPCoverageCheckRestrictionsValidation['response']>({ url: '/lsp/coverage/checks/restrictions', method: 'POST', body })
	}

	async findParkingZones( body: LSPCoverageFindParkingZonesValidation['body'] ): Promise<LSPCoverageFindParkingZonesValidation['response']> {
		return await this.http.request<LSPCoverageFindParkingZonesValidation['response']>({ url: '/lsp/coverage/checks/parking', method: 'POST', body })
	}
}

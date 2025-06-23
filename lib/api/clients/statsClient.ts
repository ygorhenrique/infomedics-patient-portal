import { baseApiClient } from "./baseApiClient"
import { API_ENDPOINTS } from "../config"
import type { DashboardStats } from "../types/stats"
import type { RequestOptions } from "../types/common"

export class StatsClient {
  async getDashboardStats(options?: RequestOptions): Promise<DashboardStats> {
    return baseApiClient.get<DashboardStats>(API_ENDPOINTS.stats, options)
  }
}

export const statsClient = new StatsClient()

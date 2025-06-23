// Export all clients
export { patientsClient } from "./clients/patientsClient"
export { appointmentsClient } from "./clients/appointmentsClient"
export { dentistsClient } from "./clients/dentistsClient"
export { treatmentsClient } from "./clients/treatmentsClient"
export { statsClient } from "./clients/statsClient"

// Export types
export type * from "./types/patients"
export type * from "./types/appointments"
export type * from "./types/dentists"
export type * from "./types/treatments"
export type * from "./types/stats"
export type * from "./types/common"
export type * from "./types/errors"

// Export errors for error handling
export { ApiError, NetworkError, ValidationError } from "./types/errors"

// Export config
export { API_CONFIG, API_ENDPOINTS } from "./config"

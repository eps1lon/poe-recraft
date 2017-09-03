export function apiEndpoint(endpoint) {
  return state => `${state.poe.api_root}/${endpoint}`;
}

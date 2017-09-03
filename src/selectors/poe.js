export function apiEndpoint(state, endpoint) {
  return `${state.poe.api_root}/${endpoint}`;
}

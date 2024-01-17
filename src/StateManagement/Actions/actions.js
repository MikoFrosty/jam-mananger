// Action to toggle the view
export function toggleView(viewMode) {
  return {
    type: "TOGGLE_VIEW",
    payload: viewMode,
  };
}

// Action to toggle the refresh
export function toggleRefetch(refetch) {
  return {
    type: "TOGGLE_REFETCH",
    payload: refetch
  }
}
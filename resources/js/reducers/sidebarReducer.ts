// 1. Define el tipo del estado
type State = {
  sidebarOpen: boolean;
};

// 2. Define los tipos de acciones
type Action = { type: 'toggleSidebar' };

// 3. Crea el reducer
export function sidebarReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggleSidebar':
      return { sidebarOpen: !state.sidebarOpen };
    default:
      return state;
  }
}

export interface BroadcastDataModel<T> {
  type: BROADCAST_DATA_TYPE;
  payload: T;
}

export const enum BROADCAST_DATA_TYPE {
  BG_IMAGGE_CHANGE,
  BGM_CHANGE,
  MODAL_POPUP,
  USER_LOGGEDIN,
  HIDE_NAV,
}

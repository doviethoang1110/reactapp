import { TOGGLE_GRANT } from "../constants/ActionTypes";

export const actionToggleGrant = (grant) => ({
    type: TOGGLE_GRANT,
    payload: grant
});
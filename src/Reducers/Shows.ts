import { SHOW_DETAIL_LOADED } from "./../Actions/Shows";
import { Show } from "../Models/Show";
import produce from "immer";
import { AnyAction } from "redux";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query_shows: { [query: string]: number[] };
  query: string;
  showLoading: { [showId: number]: boolean };
  loading: boolean;
};

export const initialState: State = {
  shows: {},
  query_shows: {},
  query: "",
  showLoading: {},
  loading: false,
};

const ShowReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case SHOW_DETAIL_LOADED:
      return produce(state, (draft) => {
        const show = action.payload as Show;
        draft.shows[show.id] = show;
      });
    default:
      return state;
  }
};

export default ShowReducer;

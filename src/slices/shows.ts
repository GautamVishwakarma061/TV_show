//import { ShowLoadedAction, ShowsQueryChangeAction } from "./../Actions/Shows";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { Show } from "../Models/Show";

type State = {
  shows: { [showId: number]: Show };
  query_shows: { [query: string]: number[] };
  query: string;
  showLoading: { [showId: number]: boolean };
  loading: boolean;
};

const initialState: State = {
  shows: {},
  query_shows: {},
  query: "",
  showLoading: {},
  loading: false,
};
const ShowSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    showsLoaded,
    showsQueryChange,
  },
});

function showsLoaded(state: State, action: PayloadAction<Show[]>) {
  const shows = action.payload as Show[];
  if (!shows || shows.length === 0) {
    return;
  }

  const showSchema = new schema.Entity("shows");

  const normalizedata = normalize(shows, [showSchema]);

  state.loading = false;

  state.query_shows[state.query] = normalizedata.result;

  state.shows = { ...state.shows, ...normalizedata.entities.shows };
}

function showsQueryChange(state: State, action: PayloadAction<string>) {
  state.query = action.payload;

  state.query && (state.loading = true);
}

const { actions, reducer: showsReducer } = ShowSlice;

export const {
  showsLoaded: showsLoadedAction,
  showsQueryChange: showsQueryChangeAction,
} = actions;

export default showsReducer;

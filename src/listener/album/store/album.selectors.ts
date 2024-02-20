import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const albumState = (state: InitialState) => state.album;

const albumId = createSelector(albumState, album => album?.albumId);
const name = createSelector(albumState, album => album?.name);
const albums = createSelector(albumState, album => album?.albums);
const artist = createSelector(albumState, album => album?.artist);
const date = createSelector(albumState, album => album?.date);
const coverImageUrl = createSelector(albumState, album => album?.coverImageUrl);
const likes = createSelector(albumState, album => album?.likes);
const isAlbumDataLoading = createSelector(albumState, album => album?.isAlbumDataLoading);
const isAlbumsLoading = createSelector(albumState, album => album?.isAlbumsLoading);
const songs = createSelector(albumState, album => album?.songs);
const backgroundColor = createSelector(albumState, album => album?.backgroundColor);

export const albumSelectors = {
  albumId,
  name,
  albums,
  artist,
  date,
  coverImageUrl,
  likes,
  isAlbumDataLoading,
  isAlbumsLoading,
  songs,
  backgroundColor
};
import { put, select, takeEvery } from 'redux-saga/effects'
import { GetSongsResponseData, SongActionTypes, SongInfoResponseData } from './song.model';
import SongService from './song.service';
import { songActions } from './song.actions';
import { ErrorActionType, showNotification } from '../../../helpers/react/redux.helper';
import { GetSongByIdStartActionType, GetSongsStartActionType, LoadMoreSongsStartActionType } from './song.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { songSelectors } from './song.selectors';
import { notification } from 'antd';

export const songEffects = [
  takeEvery(SongActionTypes.GET_SONG_BY_ID, getSongById),
  takeEvery(SongActionTypes.GET_SONG_BY_ID_FAILED, handleError),
  takeEvery(SongActionTypes.GET_SONGS, getSongs),
  takeEvery(SongActionTypes.GET_SONGS_FAILED, handleError),
  takeEvery(SongActionTypes.LOAD_MORE_SONGS, loadMoreSongs),
  takeEvery(SongActionTypes.LOAD_MORE_SONGS_FAILED, handleError)
];

function* getSongById(action: GetSongByIdStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: SongInfoResponseData = yield SongService.getSongById(listenerId, action.payload.songId, action.payload.playlistId);
    const currentSongs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
    const songs: Array<SongInfoResponseData> = [response].concat(currentSongs || []);
    yield put(songActions.getSongByIdSuccess(songs));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.getSongByIdFailed({ error }));
  }
}

function* getSongs(action: GetSongsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetSongsResponseData = yield SongService.getSongs(listenerId, action.payload);
    const callSourceId = localStorage.getItem('currentSourceId');
    const mostRecentCall = callSourceId === action.payload.options.albumId ||
      callSourceId === action.payload.options.artistId || callSourceId === action.payload.options.playlistId;
    const currentSongs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
    const songs: Array<SongInfoResponseData> = mostRecentCall ? response.songs : currentSongs;
    yield put(songActions.getSongsSuccess({ songs: songs, isMoreSongsForLoading: response.isMoreSongsForLoading }));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.getSongsFailed({ error }));
  }
}

function* loadMoreSongs(action: LoadMoreSongsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetSongsResponseData = yield SongService.getSongs(listenerId, action.payload);
    const currentSongs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
    const songs: Array<SongInfoResponseData> = (currentSongs || []).concat(...response.songs);
    yield put(songActions.loadMoreSongsSuccess({ songs: songs, isMoreSongsForLoading: response.isMoreSongsForLoading }));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.loadMoreSongsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}
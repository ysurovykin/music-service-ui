import { put, select, takeEvery } from 'redux-saga/effects'
import { AlbumActionTypes, AlbumInfoResponseData } from './album.model';
import AlbumService from './album.service';
import { albumActions } from './album.actions';
import { ErrorActionType, showNotification } from '../../../helpers/react/redux.helper';
import {
  AddAlbumToLibraryStartActionType,
  GetAlbumByIdStartActionType,
  GetAlbumsByArtistIdStartActionType,
  GetAlbumsWhereArtistAppearsStartActionType,
  RemoveAlbumFromLibraryStartActionType
} from './album.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { albumSelectors } from './album.selectors';

export const albumEffects = [
  takeEvery(AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID, getAlbumsByArtistId),
  takeEvery(AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_FAILED, handleError),
  takeEvery(AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS, getAlbumsWhereArtistAppears),
  takeEvery(AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS_FAILED, handleError),
  takeEvery(AlbumActionTypes.GET_ALBUM_BY_ID, getAlbumById),
  takeEvery(AlbumActionTypes.GET_ALBUM_BY_ID_FAILED, handleError),
  takeEvery(AlbumActionTypes.ADD_ALBUM_TO_LIBRARY, addAlbumToLibrary),
  takeEvery(AlbumActionTypes.ADD_ALBUM_TO_LIBRARY_FAILED, handleError),
  takeEvery(AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY, removeAlbumFromLibrary),
  takeEvery(AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY_FAILED, handleError)
];

function* getAlbumsByArtistId(action: GetAlbumsByArtistIdStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const albums: Array<AlbumInfoResponseData> = yield AlbumService.getAlbumsByArtistId(listenerId, action.payload);
    yield put(albumActions.getAlbumsByArtistIdSuccess(albums));
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.getAlbumsByArtistIdFailed({ error }));
  }
}

function* getAlbumsWhereArtistAppears(action: GetAlbumsWhereArtistAppearsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const albums: Array<AlbumInfoResponseData> = yield AlbumService.getAlbumsWhereArtistAppears(listenerId, action.payload);
    yield put(albumActions.getAlbumsWhereArtistAppearsSuccess(albums));
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.getAlbumsWhereArtistAppearsFailed({ error }));
  }
}

function* getAlbumById(action: GetAlbumByIdStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const album: AlbumInfoResponseData = yield AlbumService.getAlbumById(listenerId, action.payload);
    yield put(albumActions.getAlbumByIdSuccess(album));
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.getAlbumByIdFailed({ error }));
  }
}

function* addAlbumToLibrary(action: AddAlbumToLibraryStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield AlbumService.addAlbumToLibrary(listenerId, action.payload);
    const albums: Array<AlbumInfoResponseData> = yield select(albumSelectors.albums);
    const editedAlbums = albums?.length ? structuredClone(albums) : [];
    const albumToEditIndex = editedAlbums.findIndex((album: AlbumInfoResponseData) => album.albumId === action.payload);
    if (editedAlbums[albumToEditIndex]) {
      editedAlbums[albumToEditIndex].isAddedToLibrary = true;
    }
    yield put(albumActions.updateAlbumsInfo(editedAlbums));
    yield put(albumActions.addAlbumToLibrarySuccess());
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.addAlbumToLibraryFailed({ error }));
  }
}

function* removeAlbumFromLibrary(action: RemoveAlbumFromLibraryStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield AlbumService.removeAlbumFromLibrary(listenerId, action.payload);
    const albums: Array<AlbumInfoResponseData> = yield select(albumSelectors.albums);
    const editedAlbums = albums?.length ? structuredClone(albums) : [];
    const albumToEditIndex = editedAlbums.findIndex((album: AlbumInfoResponseData) => album.albumId === action.payload);
    if (editedAlbums[albumToEditIndex]) {
      editedAlbums[albumToEditIndex].isAddedToLibrary = false;
    }
    yield put(albumActions.updateAlbumsInfo(editedAlbums));
    yield put(albumActions.removeAlbumFromLibrarySuccess());
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.removeAlbumFromLibraryFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}
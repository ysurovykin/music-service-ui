import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import {
  GetPlaylistsByListenerIdFailedActionType,
  GetPlaylistsByListenerIdStartActionType,
  GetPlaylistsByListenerIdSuccessActionType,
  GetPlaylistByIdStartActionType,
  GetPlaylistByIdSuccessActionType,
  GetPlaylistByIdFailedActionType,
  OpenCreatePlaylistModalActionType,
  CloseCreatePlaylistModalActionType,
  OpenEditPlaylistsModalActionType,
  CloseEditPlaylistsModalActionType,
  EditSongPlaylistsStartActionType,
  EditSongPlaylistsSuccessActionType,
  EditSongPlaylistsFailedActionType,
  CreatePlaylistStartActionType,
  CreatePlaylistSuccessActionType,
  CreatePlaylistFailedActionType,
  EditPlaylistStartActionType,
  EditPlaylistSuccessActionType,
  EditPlaylistFailedActionType,
  OpenEditPlaylistModalActionType,
  CloseEditPlaylistModalActionType
} from "./playlist.actions.types";
import {
  PlaylistActionTypes,
  PlaylistInfoResponseData,
  EditPlaylistsRequest,
  openEditSongPlaylistsModal,
  CreatePlaylistRequestData,
  EditPlaylistRequestData,
} from "./playlist.model";
export const getPlaylistsByListenerIdStartAction = (listenerId: string):
  GetPlaylistsByListenerIdStartActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID, payload: listenerId });

export const getPlaylistsByListenerIdSuccessAction = (response: Array<PlaylistInfoResponseData>):
  GetPlaylistsByListenerIdSuccessActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS, payload: response });

export const getPlaylistsByListenerIdFailedAction = (error: ActionFailedError):
  GetPlaylistsByListenerIdFailedActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED, payload: error });

export const getPlaylistByIdStartAction = (playlistId: string):
  GetPlaylistByIdStartActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID, payload: playlistId });

export const getPlaylistByIdSuccessAction = (response: PlaylistInfoResponseData):
  GetPlaylistByIdSuccessActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID_SUCCESS, payload: response });

export const getPlaylistByIdFailedAction = (error: ActionFailedError):
  GetPlaylistByIdFailedActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED, payload: error });


export const openEditPlaylistsModalAction = (songInfo: openEditSongPlaylistsModal):
  OpenEditPlaylistsModalActionType => ({ type: PlaylistActionTypes.OPEN_EDIT_SONG_PLAYLISTS_MODAL, payload: songInfo });

export const closeEditPlaylistsModalAction = ():
  CloseEditPlaylistsModalActionType => ({ type: PlaylistActionTypes.CLOSE_EDIT_SONG_PLAYLISTS_MODAL, payload: undefined });

export const editSongPlaylistsStartAction = (request: EditPlaylistsRequest):
  EditSongPlaylistsStartActionType => ({ type: PlaylistActionTypes.EDIT_SONG_PLAYLISTS, payload: request });

export const editSongPlaylistsSuccessAction = (updatedSongs: Array<SongInfoResponseData>):
  EditSongPlaylistsSuccessActionType => ({ type: PlaylistActionTypes.EDIT_SONG_PLAYLISTS_SUCCESS, payload: updatedSongs });

export const editSongPlaylistsFailedAction = (error: ActionFailedError):
  EditSongPlaylistsFailedActionType => ({ type: PlaylistActionTypes.EDIT_SONG_PLAYLISTS_FAILED, payload: error });

export const openCreatePlaylistModalAction = ():
  OpenCreatePlaylistModalActionType => ({ type: PlaylistActionTypes.OPEN_CREATE_PLAYLIST_MODAL, payload: undefined });

export const closeCreatePlaylistModalAction = ():
  CloseCreatePlaylistModalActionType => ({ type: PlaylistActionTypes.CLOSE_CREATE_PLAYLIST_MODAL, payload: undefined });

export const createPlaylistStartAction = (request: CreatePlaylistRequestData):
  CreatePlaylistStartActionType => ({ type: PlaylistActionTypes.CREATE_PLAYLIST, payload: request });

export const createPlaylistSuccessAction = ():
  CreatePlaylistSuccessActionType => ({ type: PlaylistActionTypes.CREATE_PLAYLIST_SUCCESS, payload: undefined });

export const createPlaylistFailedAction = (error: ActionFailedError):
  CreatePlaylistFailedActionType => ({ type: PlaylistActionTypes.CREATE_PLAYLIST_FAILED, payload: error });

export const openEditPlaylistModalAction = ():
  OpenEditPlaylistModalActionType => ({ type: PlaylistActionTypes.OPEN_EDIT_PLAYLIST_MODAL, payload: undefined });

export const closeEditPlaylistModalAction = ():
  CloseEditPlaylistModalActionType => ({ type: PlaylistActionTypes.CLOSE_EDIT_PLAYLIST_MODAL, payload: undefined });

export const editPlaylistStartAction = (request: EditPlaylistRequestData):
  EditPlaylistStartActionType => ({ type: PlaylistActionTypes.EDIT_PLAYLIST, payload: request });

export const editPlaylistSuccessAction = ():
  EditPlaylistSuccessActionType => ({ type: PlaylistActionTypes.EDIT_PLAYLIST_SUCCESS, payload: undefined });

export const editPlaylistFailedAction = (error: ActionFailedError):
  EditPlaylistFailedActionType => ({ type: PlaylistActionTypes.EDIT_PLAYLIST_FAILED, payload: error });

export const playlistActions = {
  getPlaylistsByListenerId: (listenerId: string) => getPlaylistsByListenerIdStartAction(listenerId),
  getPlaylistsByListenerIdSuccess: (response: Array<PlaylistInfoResponseData>) => getPlaylistsByListenerIdSuccessAction(response),
  getPlaylistsByListenerIdFailed: (error: ActionFailedError) => getPlaylistsByListenerIdFailedAction(error),
  getPlaylistById: (playlistId: string) => getPlaylistByIdStartAction(playlistId),
  getPlaylistByIdSuccess: (response: PlaylistInfoResponseData) => getPlaylistByIdSuccessAction(response),
  getPlaylistByIdFailed: (error: ActionFailedError) => getPlaylistByIdFailedAction(error),
  openEditSongPlaylistsModal: (songInfo: openEditSongPlaylistsModal) => openEditPlaylistsModalAction(songInfo),
  closeEditSongPlaylistsModal: () => closeEditPlaylistsModalAction(),
  editSongPlaylists: (request: EditPlaylistsRequest) => editSongPlaylistsStartAction(request),
  editSongPlaylistsSuccess: (updatedSongs: Array<SongInfoResponseData>) => editSongPlaylistsSuccessAction(updatedSongs),
  editSongPlaylistsFailed: (error: ActionFailedError) => editSongPlaylistsFailedAction(error),
  openCreatePlaylistModal: () => openCreatePlaylistModalAction(),
  closeCreatePlaylistModal: () => closeCreatePlaylistModalAction(),
  createPlaylist: (request: CreatePlaylistRequestData) => createPlaylistStartAction(request),
  createPlaylistSuccess: () => createPlaylistSuccessAction(),
  createPlaylistFailed: (error: ActionFailedError) => createPlaylistFailedAction(error),
  openEditPlaylistModal: () => openEditPlaylistModalAction(),
  closeEditPlaylistModal: () => closeEditPlaylistModalAction(),
  editPlaylist: (request: EditPlaylistRequestData) => editPlaylistStartAction(request),
  editPlaylistSuccess: () => editPlaylistSuccessAction(),
  editPlaylistFailed: (error: ActionFailedError) => editPlaylistFailedAction(error),
}


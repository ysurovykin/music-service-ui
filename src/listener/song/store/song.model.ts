import { AlbumShortDataType } from "../../album/store/album.model";
import { ArtistShortDataType } from "../../artist/store/artist.model";

export const songState: SongState = {
  name: undefined,
  artists: undefined,
  songId: undefined,
  album: undefined,
  plays: undefined,
  date: undefined,
  duration: undefined,
  coverImageUrl: undefined,
  backgroundColor: undefined,
  songUrl: undefined,
  isSongDataLoading: false,
  isPlaying: false,
  songsQueue: undefined,
  songIndex: undefined,
  isEditPlaylistModalOpen: undefined,
  playlistIds: undefined,
  isPlaylistIdsLoading: undefined,
  editPlaylistsSongId: undefined,
};

export interface SongState extends SongInfoResponseData {
  isPlaying?: boolean;
  isSongDataLoading?: boolean;
  songsQueue?: Array<SongInfoResponseData>;
  songIndex?: number;
  isEditPlaylistModalOpen?: boolean;
  isPlaylistIdsLoading?: boolean;
  editPlaylistsSongId?: string;
}

export type EditedPlaylist = {
  playlistId: string;
  added: boolean;
}

export type EditPlaylistsRequest = {
  songId: string;
  editedPlaylists: Array<EditedPlaylist>;
  playlistIdToUpdate?: string
}

export type PlaySongData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortDataType>;
  coverImageUrl?: string;
  backgroundColor?: string;
  songUrl?: string;
  duration?: number;
  songsQueue?: Array<SongInfoResponseData>;
  songIndex?: number;
  playlistIds?: Array<string>;
}

export type SongInfoResponseData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortDataType>;
  album?: AlbumShortDataType;
  plays?: number;
  date?: Date;
  duration?: number;
  coverImageUrl?: string;
  backgroundColor?: string;
  songUrl?: string;
  playlistIds?: Array<string>;
}

export enum SongActionTypes {
  GET_SONG_BY_ID = "GET_SONG_BY_ID_START",
  GET_SONG_BY_ID_SUCCESS = "GET_SONG_BY_ID_SUCCESS",
  GET_SONG_BY_ID_FAILED = "GET_SONG_BY_ID_FAILED",

  PLAY_SONG = "PLAY_SONG",
  UNPAUSE_SONG = "UNPAUSE_SONG",
  PAUSE_SONG = "PAUSE_SONG",

  OPEN_EDIT_PLAYLISTS_MODAL = "OPEN_EDIT_PLAYLISTS_MODAL",
  CLOSE_EDIT_PLAYLISTS_MODAL = "CLOSE_EDIT_PLAYLISTS_MODAL",

  EDIT_PLAYLISTS = "EDIT_PLAYLISTS",
  EDIT_PLAYLISTS_SUCCESS = "EDIT_PLAYLISTS_SUCCESS",
  EDIT_PLAYLISTS_FAILED = "EDIT_PLAYLISTS_FAILED",
};
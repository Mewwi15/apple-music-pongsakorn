import axios from 'axios';

export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  cover: string;
  previewUrl?: string;
  isExplicit?: boolean;
  type: 'album' | 'track';
}

interface ITunesRawItem {
  trackId: number;
  collectionId: number;
  trackName: string;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
  trackExplicitness?: string;
  wrapperType: string;
}

const BASE_URL = 'https://itunes.apple.com';

export const searchLibrary = async (term: string): Promise<MusicItem[]> => {
  if (!term) return [];
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { term, country: 'US', media: 'music', entity: 'song', limit: 20 }
  });
  return response.data.results.map((item: ITunesRawItem) => ({
    id: item.trackId?.toString() || item.collectionId.toString(),
    title: item.trackName || item.collectionName,
    artist: item.artistName,
    cover: item.artworkUrl100.replace('100x100bb', '600x600bb'),
    previewUrl: item.previewUrl,
    isExplicit: item.trackExplicitness === 'explicit',
    type: 'track'
  }));
};

export const searchMusicVideos = async (term: string): Promise<MusicItem[]> => {
  if (!term) return [];
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { term, country: 'US', entity: 'musicVideo', limit: 20 }
  });
  return response.data.results.map((item: ITunesRawItem) => ({
    id: item.trackId?.toString() || item.collectionId.toString(),
    title: item.trackName || item.collectionName,
    artist: item.artistName,
    cover: item.artworkUrl100.replace('100x100bb', '600x600bb'),
    previewUrl: item.previewUrl,
    type: 'track'
  }));
};

export const getAlbumTracks = async (albumId: string): Promise<MusicItem[]> => {
  const response = await axios.get(`${BASE_URL}/lookup`, {
    params: { id: albumId, entity: 'song' }
  });
  return response.data.results
    .filter((item: ITunesRawItem) => item.wrapperType === 'track')
    .map((item: ITunesRawItem) => ({
      id: item.trackId?.toString() || item.collectionId.toString(),
      title: item.trackName || 'Unknown Track',
      artist: item.artistName,
      album: item.collectionName,
      cover: item.artworkUrl100.replace('100x100bb', '600x600bb'),
      previewUrl: item.previewUrl,
      type: 'track'
    }));
};
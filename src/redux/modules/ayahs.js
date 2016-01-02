import { ayahsSchema } from './schemas';
import { arrayOf } from 'normalizr';

import { createFontFacesArray } from 'helpers/buildFontFaces';

export const LOAD = '@@quran/ayahs/LOAD';
export const LOAD_SUCCESS = '@@quran/ayahs/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/ayahs/LOAD_FAIL';
export const CLEAR_CURRENT = '@@quran/ayahs/CLEAR_CURRENT';

const initialState = {
  errored: false,
  loaded: false,
  entities: {},
  result: [],
  fontFaces: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_CURRENT:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.id]: {}
        }
      };
    case LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        errored: false,
        entities: {
          ...state.entities,
          [action.surahId]: Object.assign({}, state.entities[action.surahId], action.result.entities.ayahs)
        },
        result: Object.assign({}, state.result, action.result.result),
        fontFaces: [].concat(state.fontFaces, createFontFacesArray(action.result.result.map(key => action.result.entities.ayahs[key])))
      };
    case LOAD_FAIL:
      console.log(action);
      return state;
    default:
      return state;
  }
}

// For safe measure
const defaultOptions = {
  audio: 8,
  quran: 1,
  content: [19]
};

export function load(id, from, to, options = defaultOptions) {
  const { audio, quran, content } = options;

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(ayahsSchema),
    promise: (client) => client.get(`/surahs/${id}/ayat`, {
      params: {
        from,
        to,
        audio: audio,
        quran: quran,
        content: content
      }
    }),
    surahId: id
  };
}

export function clearCurrent(id) {
  return {
    type: CLEAR_CURRENT,
    id
  };
}

export function isLoaded() {
  return false;
}
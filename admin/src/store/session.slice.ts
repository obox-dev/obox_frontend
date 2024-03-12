import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistConfig } from 'redux-persist';

export interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: SessionState = {
  accessToken: null,
  refreshToken: null,
};

const { reducer, actions } = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});


const config: PersistConfig<SessionState> = {
  key: 'session',
  storage,
  stateReconciler: hardSet,
};

export { reducer, actions, config };
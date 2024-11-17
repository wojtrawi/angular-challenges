import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export type CallState = 'init' | 'loading' | 'loaded' | { error: string };

interface FeatureState {
  callState: CallState;
}

const initialState: FeatureState = {
  callState: 'init',
};

export function withCallState() {
  return signalStoreFeature(
    withState<FeatureState>(initialState),
    withComputed((store) => ({
      loading: computed(() => store.callState() === 'loading'),
      loaded: computed(() => store.callState() === 'loaded'),
      error: computed(() => {
        const state = store.callState();
        return typeof state === 'object' ? state.error : null;
      }),
    })),
    withMethods((store) => ({
      _setLoading() {
        patchState(store, { callState: 'loading' });
      },
      _setLoaded() {
        patchState(store, { callState: 'loaded' });
      },
      _setError(error: string) {
        patchState(store, { callState: { error } });
      },
      _reset() {
        patchState(store, { callState: 'init' });
      },
    })),
  );
}

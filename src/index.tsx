import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export interface UseAppStateOptions {
    onForeground?: () => void;
    onBackground?: () => void;
    onChange?: (status: AppStateStatus) => void;
}

export function useAppState(options: UseAppStateOptions = {}): AppStateStatus {
    const { onForeground, onBackground, onChange } = options;
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
    const appStateRef = useRef<AppStateStatus>(AppState.currentState);
    const onForegroundRef = useRef(onForeground);
    const onBackgroundRef = useRef(onBackground);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        onForegroundRef.current = onForeground;
        onBackgroundRef.current = onBackground;
        onChangeRef.current = onChange;
    }, [onForeground, onBackground, onChange]);

    useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            const prevAppState = appStateRef.current;

            if (onChangeRef.current) {
                onChangeRef.current(nextAppState);
            }

            if (
                prevAppState.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                if (onForegroundRef.current) {
                    onForegroundRef.current();
                }
            } else if (
                prevAppState === 'active' &&
                nextAppState.match(/inactive|background/)
            ) {
                if (onBackgroundRef.current) {
                    onBackgroundRef.current();
                }
            }

            appStateRef.current = nextAppState;
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    return appState;
}

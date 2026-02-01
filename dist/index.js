"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppState = useAppState;
const react_1 = require("react");
const react_native_1 = require("react-native");
function useAppState(options = {}) {
    const { onForeground, onBackground, onChange } = options;
    const [appState, setAppState] = (0, react_1.useState)(react_native_1.AppState.currentState);
    const appStateRef = (0, react_1.useRef)(react_native_1.AppState.currentState);
    const onForegroundRef = (0, react_1.useRef)(onForeground);
    const onBackgroundRef = (0, react_1.useRef)(onBackground);
    const onChangeRef = (0, react_1.useRef)(onChange);
    (0, react_1.useEffect)(() => {
        onForegroundRef.current = onForeground;
        onBackgroundRef.current = onBackground;
        onChangeRef.current = onChange;
    }, [onForeground, onBackground, onChange]);
    (0, react_1.useEffect)(() => {
        const handleAppStateChange = (nextAppState) => {
            const prevAppState = appStateRef.current;
            if (onChangeRef.current) {
                onChangeRef.current(nextAppState);
            }
            if (prevAppState.match(/inactive|background/) &&
                nextAppState === 'active') {
                if (onForegroundRef.current) {
                    onForegroundRef.current();
                }
            }
            else if (prevAppState === 'active' &&
                nextAppState.match(/inactive|background/)) {
                if (onBackgroundRef.current) {
                    onBackgroundRef.current();
                }
            }
            appStateRef.current = nextAppState;
            setAppState(nextAppState);
        };
        const subscription = react_native_1.AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);
    return appState;
}

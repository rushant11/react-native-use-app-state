import { AppStateStatus } from 'react-native';
export interface UseAppStateOptions {
    onForeground?: () => void;
    onBackground?: () => void;
    onChange?: (status: AppStateStatus) => void;
}
export declare function useAppState(options?: UseAppStateOptions): AppStateStatus;

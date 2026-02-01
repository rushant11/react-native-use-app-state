# react-native-use-app-state

A tiny, reliable hook for managing React Native AppState. Handles foreground/background transitions and state changes with ease.

## Installation

```sh
npm install react-native-use-app-state
# or
yarn add react-native-use-app-state
```

## Usage

```typescript
import { useAppState } from 'react-native-use-app-state';

const App = () => {
  const currentStatus = useAppState({
    onForeground: () => {
      console.log('App successfully came to foreground!');
      // Good place to refetch data or update user status
    },
    onBackground: () => {
      console.log('App went to background!');
      // Good place to save state or pause tasks
    },
    onChange: (status) => {
      console.log('AppState changed to:', status);
    },
  });

  return (
    <View>
      <Text>Current State: {currentStatus}</Text>
    </View>
  );
};
```

## API

### `useAppState(options)`

#### Options
| Name | Type | Description |
|Args|---|---|
| `onForeground` | `() => void` | Callback fired when app transitions from background/inactive to active. |
| `onBackground` | `() => void` | Callback fired when app transitions from active to background/inactive. |
| `onChange` | `(status: AppStateStatus) => void` | Callback fired on any state change. |

#### Returns
- `AppStateStatus`: The current state of the app ('active', 'background', 'inactive', etc.).

## License
MIT

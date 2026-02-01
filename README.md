# react-native-use-app-state

npm install @rushant11/react-native-use-app-state
# or
yarn add @rushant11/react-native-use-app-state

```typescript
import { useAppState } from '@rushant11/react-native-use-app-state';

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

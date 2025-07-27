import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';

import Navigator from './navigator';
import queryClient from './state/queryClient';
import './theme';

/**
 * Root app component that sets up providers for React Query and React Navigation.
 *
 * @returns {JSX.Element} The app wrapped with navigation and query clients.
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

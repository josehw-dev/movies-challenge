import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';

import Navigator from './navigator';
import queryClient from './state/queryClient';

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

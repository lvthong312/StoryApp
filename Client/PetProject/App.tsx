import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import BestStories from './src/screens/BestStories';
import NewStories from './src/screens/NewStories';
import TopStories from './src/screens/TopStories';
import {
  BEST_STORY_SCREEN,
  HOME_SCREEN,
  NEW_STORY_SCREEN,
  STORY_DETAIL_SCREEN,
  TOP_STORY_SCREEN,
} from './src/constants/ScreenKey';
import StoryDetail from './src/screens/StoryDetail';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name={HOME_SCREEN} options={{ title: 'Home' }} component={Home} />
          <Stack.Screen
            name={BEST_STORY_SCREEN}
            options={{ title: 'Best Story' }}
            component={BestStories}
          />
          <Stack.Screen
            name={NEW_STORY_SCREEN}
            options={{ title: 'New Story' }}
            component={NewStories}
          />
          <Stack.Screen
            name={TOP_STORY_SCREEN}
            options={{ title: 'Top Story' }}
            component={TopStories}
          />
          <Stack.Screen
            name={STORY_DETAIL_SCREEN}
            options={{ title: 'Story Detail' }}
            component={StoryDetail}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;

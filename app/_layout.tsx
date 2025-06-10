
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BookmarkProvider } from './context/BookmarkContext';

export default function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <BookmarkProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Drawer>
         
            <Drawer.Screen
              name="tabs"
              options={{
                drawerLabel: 'Home',
                title: 'Home',
              }}
            />
            <Drawer.Screen
              name="tech"
              options={{
                drawerLabel: 'technology',
                title: 'technology',
              }}
            />
             <Drawer.Screen
              name="cricket"
              options={{
                drawerLabel: 'cricket',
                title: 'cricket',
              }}
            />
          </Drawer>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </GestureHandlerRootView>
    </BookmarkProvider>
  );
}

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Latest',
          //  tabBarIcon: ({ color }) => <IconSymbol size={28} name="newspaper" color={color} />,
           tabBarIcon: ({ color }) => <FontAwesome size={28} name="newspaper-o" color={color} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Older',
           tabBarIcon: ({ color }) => <FontAwesome size={28} name="archive" color={color} />
          
          //  tabBarIcon: ({ color }) => <IconSymbol size={28} name="archivebox" color={color} />,
        }}
      />
      <Tabs.Screen
  name="bookmark"
  options={{
    title: 'Bookmarks',
    tabBarIcon: ({ color }) => (
      <FontAwesome size={28} name="list" color={color} />
    ),
  }}
/>
    </Tabs>
  );
}

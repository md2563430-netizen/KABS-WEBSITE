import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = focused ? "home" : "home-outline"

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Radio") {
              iconName = focused ? "radio" : "radio-outline"
            } else if (route.name === "Chat") {
              iconName = focused ? "chatbubbles" : "chatbubbles-outline"
            } else if (route.name === "Tv Hub") {
              iconName = focused ? "tv" : "tv-outline"
            } else if (route.name === "Shop") {
              iconName = focused ? "cart" : "cart-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          initialRouteName: "Home",
          tabBarActiveTintColor: "#FFD700",
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarStyle: {
            backgroundColor: "#8B0000",
            borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: "#8B0000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Tabs.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Radio"
          options={{
            title: "Radio",
          }}
        />
        <Tabs.Screen
          name="Chat"
          options={{
            title: "Chat",
          }}
        />
        <Tabs.Screen
          name="Tv Hub"
          options={{
            title: "TV",
          }}
        />
        <Tabs.Screen
          name="Shop"
          options={{
            title: "Shop",
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Kabs Play",
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  )
}


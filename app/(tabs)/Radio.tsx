"use client"

import { useState, useEffect } from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Audio } from "expo-av"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"

const RadioScreen = () => {
  const params = useLocalSearchParams()
  const { stationId } = params

  const [sound, setSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState(null)
  const [loading, setLoading] = useState(false)

  // Sample radio stations
  const radioStations = [
    {
      id: "1",
      name: "Kabs FM",
      genre: "Variety",
      frequency: "98.5",
      streamUrl: "https://stream.example.com/kabsfm",
      logo: "https://img.icons8.com/color/96/000000/radio.png",
    },
    {
      id: "2",
      name: "Kabs Hits",
      genre: "Pop",
      frequency: "101.3",
      streamUrl: "https://stream.example.com/kabshits",
      logo: "https://img.icons8.com/color/96/000000/musical-notes.png",
    },
    {
      id: "3",
      name: "Kabs Jazz",
      genre: "Jazz",
      frequency: "103.7",
      streamUrl: "https://stream.example.com/kabsjazz",
      logo: "https://img.icons8.com/color/96/000000/saxophone.png",
    },
    {
      id: "4",
      name: "Kabs Talk",
      genre: "Talk Show",
      frequency: "95.2",
      streamUrl: "https://stream.example.com/kabstalk",
      logo: "https://img.icons8.com/color/96/000000/microphone.png",
    },
    {
      id: "5",
      name: "Kabs Classic",
      genre: "Classical",
      frequency: "106.9",
      streamUrl: "https://stream.example.com/kabsclassic",
      logo: "https://img.icons8.com/color/96/000000/orchestra.png",
    },
    {
      id: "6",
      name: "Kabs Urban",
      genre: "Hip Hop & R&B",
      frequency: "99.1",
      streamUrl: "https://stream.example.com/kabsurban",
      logo: "https://img.icons8.com/color/96/000000/rap.png",
    },
  ]

  useEffect(() => {
    // If stationId is provided, play that station
    if (stationId) {
      const station = radioStations.find((s) => s.id === stationId)
      if (station) {
        playSound(station)
      }
    }

    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [stationId])

  const playSound = async (station) => {
    if (sound) {
      await sound.unloadAsync()
      setSound(null)
    }

    setLoading(true)
    setCurrentStation(station)

    try {
      // In a real app, you would use the actual stream URL
      // For this example, we'll use a sample MP3
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { shouldPlay: true },
      )

      setSound(newSound)
      setIsPlaying(true)
      setLoading(false)
    } catch (error) {
      console.error("Error playing sound:", error)
      setLoading(false)
    }
  }

  const stopSound = async () => {
    if (sound) {
      await sound.pauseAsync()
      setIsPlaying(false)
    }
  }

  const resumeSound = async () => {
    if (sound) {
      await sound.playAsync()
      setIsPlaying(true)
    }
  }

  const renderRadioStation = ({ item }) => (
    <TouchableOpacity style={styles.stationCard} onPress={() => playSound(item)}>
      <Image source={{ uri: item.logo }} style={styles.stationLogo} />
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{item.name}</Text>
        <Text style={styles.stationDetails}>
          {item.genre} • {item.frequency} FM
        </Text>
      </View>
      {currentStation && currentStation.id === item.id && (
        <View style={styles.playingIndicator}>
          {loading ? (
            <ActivityIndicator color="#FFD700" />
          ) : (
            <Ionicons name={isPlaying ? "radio" : "radio-outline"} size={24} color="#FFD700" />
          )}
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <LinearGradient colors={["#8B0000", "#800080"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kabs Radio</Text>
        <Text style={styles.headerSubtitle}>Tune in to your favorite stations</Text>
      </View>

      <FlatList
        data={radioStations}
        renderItem={renderRadioStation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.stationList}
      />

      {currentStation && (
        <View style={styles.playerBar}>
          <Image source={{ uri: currentStation.logo }} style={styles.playerLogo} />
          <View style={styles.playerInfo}>
            <Text style={styles.playerStationName}>{currentStation.name}</Text>
            <Text style={styles.playerStationDetails}>
              {currentStation.genre} • {currentStation.frequency} FM
            </Text>
          </View>
          <TouchableOpacity
            style={styles.playerButton}
            onPress={isPlaying ? stopSound : resumeSound}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#8B0000" />
            ) : (
              <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#8B0000" />
            )}
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  stationList: {
    padding: 15,
  },
  stationCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  stationLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  stationDetails: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  playingIndicator: {
    marginLeft: 10,
  },
  playerBar: {
    flexDirection: "row",
    backgroundColor: "#FFD700",
    padding: 15,
    alignItems: "center",
  },
  playerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  playerInfo: {
    flex: 1,
  },
  playerStationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B0000",
  },
  playerStationDetails: {
    fontSize: 12,
    color: "#8B0000",
    opacity: 0.8,
  },
  playerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(139, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default RadioScreen


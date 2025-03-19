"use client"

import { useState } from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { Video } from "expo-av"

const { width } = Dimensions.get("window")

const TvScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentVideo, setCurrentVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const categories = ["All", "Entertainment", "News", "Sports", "Music", "Lifestyle", "Documentary"]

  // Sample TV channels
  const tvChannels = [
    {
      id: "1",
      name: "Kabs Entertainment",
      category: "Entertainment",
      logo: "https://img.icons8.com/color/96/000000/tv-show.png",
      thumbnail: "https://img.icons8.com/color/96/000000/tv-show.png",
      videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: "2",
      name: "Kabs News",
      category: "News",
      logo: "https://img.icons8.com/color/96/000000/news.png",
      thumbnail: "https://img.icons8.com/color/96/000000/news.png",
      videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: "3",
      name: "Kabs Sports",
      category: "Sports",
      logo: "https://img.icons8.com/color/96/000000/basketball.png",
      thumbnail: "https://img.icons8.com/color/96/000000/basketball.png",
      videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: "4",
      name: "Kabs Music",
      category: "Music",
      logo: "https://img.icons8.com/color/96/000000/music.png",
      thumbnail: "https://img.icons8.com/color/96/000000/music.png",
      videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: "5",
      name: "Kabs Lifestyle",
      category: "Lifestyle",
      logo: "https://img.icons8.com/color/96/000000/lifestyle.png",
      thumbnail: "https://img.icons8.com/color/96/000000/lifestyle.png",
      videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: "6",
      name: "Kabs Documentary",
      category: "Documentary",
      logo: "https://img.icons8.com/color/96/000000/documentary.png",
      thumbnail: "https://img.icons8.com/color/96/000000/documentary.png",
      videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
  ]

  const filteredChannels =
    selectedCategory === "All" ? tvChannels : tvChannels.filter((channel) => channel.category === selectedCategory)

  const playChannel = (channel) => {
    setCurrentVideo(channel)
    setIsPlaying(true)
  }

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryTab, selectedCategory === item && styles.activeCategoryTab]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[styles.categoryName, selectedCategory === item && styles.activeCategoryName]}>{item}</Text>
    </TouchableOpacity>
  )

  const renderChannel = ({ item }) => (
    <TouchableOpacity style={styles.channelCard} onPress={() => playChannel(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.channelThumbnail} />
      <View style={styles.channelInfo}>
        <Image source={{ uri: item.logo }} style={styles.channelLogo} />
        <Text style={styles.channelName}>{item.name}</Text>
        <Text style={styles.channelCategory}>{item.category}</Text>
      </View>
      <View style={styles.playButton}>
        <Ionicons name="play-circle" size={30} color="#FFD700" />
      </View>
    </TouchableOpacity>
  )

  return (
    <LinearGradient colors={["#8B0000", "#800080"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kabs TV</Text>
        <Text style={styles.headerSubtitle}>Watch your favorite channels</Text>
      </View>

      {currentVideo && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: currentVideo.videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={isPlaying}
            style={styles.video}
            useNativeControls
          />
          <View style={styles.videoInfo}>
            <Image source={{ uri: currentVideo.logo }} style={styles.videoLogo} />
            <View style={styles.videoTextInfo}>
              <Text style={styles.videoTitle}>{currentVideo.name}</Text>
              <Text style={styles.videoCategory}>{currentVideo.category}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setCurrentVideo(null)
                setIsPlaying(false)
              }}
            >
              <Ionicons name="close-circle" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.categoryTabs}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredChannels}
        renderItem={renderChannel}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.channelsList}
        numColumns={2}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
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
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  videoLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  videoTextInfo: {
    flex: 1,
  },
  videoTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  videoCategory: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 12,
  },
  closeButton: {
    padding: 5,
  },
  categoryTabs: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingVertical: 10,
  },
  categoryTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  activeCategoryTab: {
    backgroundColor: "#FFD700",
  },
  categoryName: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  activeCategoryName: {
    color: "#8B0000",
  },
  channelsList: {
    padding: 10,
  },
  channelCard: {
    width: (width - 30) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
  },
  channelThumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },
  channelInfo: {
    padding: 10,
    alignItems: "center",
  },
  channelLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  channelName: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
  },
  channelCategory: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 12,
    textAlign: "center",
  },
  playButton: {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
})

export default TvScreen


"use client"

import { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"

// Define types for our data
interface ChatMessage {
  id: string
  text: string
  sender: string
  timestamp: string
}

interface ChatRoom {
  id: string
  name: string
  active: boolean
}

interface User {
  id: string
  name: string
  avatar: string
}

const ChatScreen = () => {
  const params = useLocalSearchParams()
  const { roomId } = params

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    { id: "1", name: "General Chat", active: true },
    { id: "2", name: "Music Lovers", active: false },
    { id: "3", name: "Events & Promotions", active: false },
    { id: "4", name: "Gaming", active: false },
  ])

  const flatListRef = useRef<FlatList | null>(null)

  // Sample user data
  const users: User[] = [
    { id: "1", name: "You", avatar: "https://img.icons8.com/color/96/000000/user.png" },
    { id: "2", name: "John", avatar: "https://img.icons8.com/color/96/000000/user-male.png" },
    { id: "3", name: "Sarah", avatar: "https://img.icons8.com/color/96/000000/user-female.png" },
    { id: "4", name: "Mike", avatar: "https://img.icons8.com/color/96/000000/businessman.png" },
    { id: "5", name: "Lisa", avatar: "https://img.icons8.com/color/96/000000/businesswoman.png" },
  ]

  // Sample initial messages
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: "1",
        text: "Welcome to Kabs Live Chat!",
        sender: "2",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "2",
        text: "Hi everyone! Excited to be here.",
        sender: "3",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: "3",
        text: "Did anyone catch the live show yesterday?",
        sender: "4",
        timestamp: new Date(Date.now() - 900000).toISOString(),
      },
      {
        id: "4",
        text: "Yes, it was amazing!",
        sender: "5",
        timestamp: new Date(Date.now() - 600000).toISOString(),
      },
    ]

    // If roomId is provided, switch to that room
    if (roomId) {
      setChatRooms(
        chatRooms.map((room) => ({
          ...room,
          active: room.id === (roomId as string),
        })),
      )

      // Simulate loading messages for the selected room
      setTimeout(() => {
        const newRoomMessages: ChatMessage[] = [
          {
            id: "101",
            text: `Welcome to the ${chatRooms.find((r) => r.id === (roomId as string))?.name || "Chat Room"}!`,
            sender: "2",
            timestamp: new Date().toISOString(),
          },
        ]

        setMessages(newRoomMessages)
      }, 500)
    } else {
      setMessages(initialMessages)
    }
  }, [roomId])

  const sendMessage = () => {
    if (message.trim() === "") return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "1", // Current user
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! The team will respond shortly.",
        sender: "2", // John
        timestamp: new Date().toISOString(),
      }

      setMessages((prevMessages) => [...prevMessages, responseMessage])
    }, 1000)
  }

  const switchChatRoom = (roomId: string) => {
    setChatRooms(
      chatRooms.map((room) => ({
        ...room,
        active: room.id === roomId,
      })),
    )

    // In a real app, you would fetch messages for the selected room
    setMessages([])

    // Simulate loading messages for the new room
    setTimeout(() => {
      const foundRoom = chatRooms.find((r) => r.id === roomId)
      const roomName = foundRoom ? foundRoom.name : "Chat Room"

      const newRoomMessages: ChatMessage[] = [
        {
          id: "101",
          text: `Welcome to the ${roomName}!`,
          sender: "2",
          timestamp: new Date().toISOString(),
        },
      ]

      setMessages(newRoomMessages)
    }, 500)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const user = users.find((u) => u.id === item.sender)
    const isCurrentUser = item.sender === "1"

    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
        {!isCurrentUser && user && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
        <View style={[styles.messageBubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
          {!isCurrentUser && user && <Text style={styles.senderName}>{user.name}</Text>}
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    )
  }

  const renderChatRoom = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity
      style={[styles.roomTab, item.active && styles.activeRoomTab]}
      onPress={() => switchChatRoom(item.id)}
    >
      <Text style={[styles.roomName, item.active && styles.activeRoomName]}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <LinearGradient colors={["#8B0000", "#800080"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Chat</Text>
        <Text style={styles.headerSubtitle}>Connect with the community</Text>
      </View>

      <View style={styles.roomTabs}>
        <FlatList
          data={chatRooms}
          renderItem={renderChatRoom}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#8B0000" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  roomTabs: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingVertical: 10,
  },
  roomTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  activeRoomTab: {
    backgroundColor: "#FFD700",
  },
  roomName: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  activeRoomName: {
    color: "#8B0000",
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    maxWidth: "80%",
  },
  currentUserMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  otherUserMessage: {
    alignSelf: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: "100%",
  },
  currentUserBubble: {
    backgroundColor: "#FFD700",
    borderBottomRightRadius: 0,
  },
  otherUserBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderBottomLeftRadius: 0,
  },
  senderName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 3,
  },
  messageText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  timestamp: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.6)",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#FFFFFF",
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ChatScreen


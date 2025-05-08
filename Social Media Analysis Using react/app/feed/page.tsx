"use client"

import { useState, useEffect } from "react"
import { type Post, type User, getPostsWithComments, fetchUsers, getRandomImage } from "@/lib/api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Share2, RefreshCw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    try {
      setRefreshing(true)
      const [postsData, usersData] = await Promise.all([getPostsWithComments(), fetchUsers()])

      // Sort posts by ID in descending order (assuming higher ID = newer)
      const sortedPosts = postsData.sort((a, b) => b.id - a.id)

      setPosts(sortedPosts)
      setUsers(usersData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchData()
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getUserById = (userId: number) => {
    return users.find((user) => user.id === userId)
  }

  // Function to format relative time
  const getRelativeTime = (postId: number) => {
    // Using postId to generate random time for demo purposes
    const minutes = (postId % 60) + 1
    if (minutes < 5) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    return `${Math.floor(minutes / 60)}h ago`
  }

  if (loading) {
    return (
      <div className="container py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Live Feed</h1>
            <p className="text-muted-foreground">Real-time posts from users</p>
          </div>

          <div className="grid gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-64 w-full bg-gray-200 animate-pulse" />
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Skeleton className="h-4 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Live Feed</h1>
            <p className="text-muted-foreground">Real-time posts from users</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid gap-6">
          {posts.map((post, index) => {
            const user = getUserById(post.userId)
            const isNew = index < 2 // First two posts are "new"

            return (
              <Card key={post.id} className={`overflow-hidden card-hover ${isNew ? "animate-slide-up" : ""}`}>
                <div className="relative h-64 w-full">
                  {isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                        New
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="h-3 w-3" />
                    {getRelativeTime(post.id)}
                  </div>
                  <Image
                    src={getRandomImage(post.id, "post") || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1200px) 100vw, 50vw"
                    priority={index < 2} // Prioritize loading the first two images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardHeader className="-mt-14 relative z-10">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage
                        src={getRandomImage(post.userId, "user") || "/placeholder.svg"}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                        {user?.name?.substring(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-white">{user?.name || "Unknown User"}</CardTitle>
                      <CardDescription className="text-gray-200">@{user?.username || "user"}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.body}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
                  <div className="flex items-center gap-1 text-rose-500 hover:scale-110 transition-transform cursor-pointer">
                    <MessageSquare className="h-5 w-5" />
                    <span className="font-medium">{post.comments?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 hover:text-rose-500 hover:scale-110 transition-all cursor-pointer">
                    <Heart className="h-5 w-5" />
                    <span>{Math.floor(Math.random() * 100)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 hover:text-cyan-500 hover:scale-110 transition-all cursor-pointer">
                    <Share2 className="h-5 w-5" />
                    <span>{Math.floor(Math.random() * 50)}</span>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

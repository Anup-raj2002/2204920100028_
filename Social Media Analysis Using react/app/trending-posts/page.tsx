import { getTrendingPosts, fetchUsers } from "@/lib/api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Share2, TrendingUp } from "lucide-react"
import Image from "next/image"
import { getRandomImage } from "@/lib/api"

export default async function TrendingPostsPage() {
  const trendingPosts = await getTrendingPosts()
  const users = await fetchUsers()

  return (
    <div className="container py-10 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Trending Posts</h1>
          <p className="text-muted-foreground">Posts with the highest number of comments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {trendingPosts.map((post, index) => {
            const user = users.find((u) => u.id === post.userId)

            return (
              <Card key={post.id} className="overflow-hidden card-hover">
                <div className="relative h-48 w-full">
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Trending
                  </div>
                  <Image
                    src={getRandomImage(post.id, "post") || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
                  <div className="flex items-center gap-1 text-rose-500">
                    <MessageSquare className="h-5 w-5" />
                    <span className="font-medium">{post.comments?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="h-5 w-5" />
                    <span>{Math.floor(Math.random() * 100)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
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

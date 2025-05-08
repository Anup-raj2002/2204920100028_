import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Activity, Users } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getRandomImage } from "@/lib/utils"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold gradient-text">Social Analytics Dashboard</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Real-time <span className="gradient-text">Social Media</span> Analytics
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Monitor user engagement, track trending posts, and view real-time content updates.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 w-full max-w-4xl animate-slide-up">
                <Link href="/top-users" className="w-full">
                  <div className="flex flex-col items-center space-y-4 rounded-xl border p-6 transition-all hover:bg-gray-50 card-hover bg-white shadow-sm h-full">
                    <div className="rounded-full bg-indigo-100 p-3">
                      <Users className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold">Top Users</h3>
                    <p className="text-sm text-gray-500 text-center">
                      View the top 5 users with the most commented posts
                    </p>
                  </div>
                </Link>
                <Link href="/trending-posts" className="w-full">
                  <div className="flex flex-col items-center space-y-4 rounded-xl border p-6 transition-all hover:bg-gray-50 card-hover bg-white shadow-sm h-full">
                    <div className="rounded-full bg-rose-100 p-3">
                      <TrendingUp className="h-8 w-8 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-bold">Trending Posts</h3>
                    <p className="text-sm text-gray-500 text-center">Discover posts with the highest engagement</p>
                  </div>
                </Link>
                <Link href="/feed" className="w-full">
                  <div className="flex flex-col items-center space-y-4 rounded-xl border p-6 transition-all hover:bg-gray-50 card-hover bg-white shadow-sm h-full">
                    <div className="rounded-full bg-cyan-100 p-3">
                      <Activity className="h-8 w-8 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold">Live Feed</h3>
                    <p className="text-sm text-gray-500 text-center">See the latest posts in real-time</p>
                  </div>
                </Link>
              </div>

              <div className="space-y-8 w-full max-w-4xl mt-12">
                <h3 className="text-2xl font-bold">Platform Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="stat-card rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">2.4M+</div>
                    <div className="text-sm text-gray-500">Active Users</div>
                  </div>
                  <div className="stat-card rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-rose-600 mb-2">8.7M+</div>
                    <div className="text-sm text-gray-500">Posts Created</div>
                  </div>
                  <div className="stat-card rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-cyan-600 mb-2">42M+</div>
                    <div className="text-sm text-gray-500">Comments</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 w-full max-w-4xl mt-12">
                <h3 className="text-2xl font-bold">Featured Creators</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <div key={id} className="text-center">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-md mx-auto mb-2">
                        <AvatarImage
                          src={getRandomImage(id, "user") || "/placeholder.svg"}
                          alt={`Featured Creator ${id}`}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                          FC
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">Creator {id}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg"
                >
                  <Link href="/feed">
                    <Activity className="mr-2 h-5 w-5" />
                    View Live Feed
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-sm text-gray-500">© 2025 Social Analytics Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

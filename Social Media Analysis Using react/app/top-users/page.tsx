import { getTopUsers } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { getRandomImage } from "@/lib/api"
import { Trophy, Medal, Award } from "lucide-react"

export default async function TopUsersPage() {
  const topUsers = await getTopUsers(5)

  return (
    <div className="container py-10 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Top Users</h1>
          <p className="text-muted-foreground">Users with the most commented posts</p>
        </div>

        <div className="grid gap-6">
          {topUsers.map(({ user, commentCount }, index) => {
            // Define badge based on ranking
            let Badge = Award
            let badgeColor = "text-gray-400"
            let bgColor = "bg-gray-50"

            if (index === 0) {
              Badge = Trophy
              badgeColor = "text-yellow-500"
              bgColor = "bg-yellow-50"
            } else if (index === 1) {
              Badge = Medal
              badgeColor = "text-gray-400"
              bgColor = "bg-gray-50"
            } else if (index === 2) {
              Badge = Medal
              badgeColor = "text-amber-600"
              bgColor = "bg-amber-50"
            }

            return (
              <Card key={user.id} className={`card-hover overflow-hidden ${index === 0 ? "gradient-border" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${bgColor} text-xl font-bold ${badgeColor}`}
                    >
                      <Badge className="h-6 w-6" />
                    </div>
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage
                        src={getRandomImage(user.id, "user") || "/placeholder.svg"}
                        alt={user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold gradient-text">{commentCount}</div>
                      <p className="text-sm text-muted-foreground">Comments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

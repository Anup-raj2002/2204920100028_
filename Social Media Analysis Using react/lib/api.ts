// Types for our data
export interface User {
  id: number
  name: string
  username: string
  email: string
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
  comments?: Comment[]
}

// API functions
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  return response.json()
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

export async function fetchComments(): Promise<Comment[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments")
  if (!response.ok) {
    throw new Error("Failed to fetch comments")
  }
  return response.json()
}

// Helper function to get posts with comments
export async function getPostsWithComments(): Promise<Post[]> {
  const [posts, comments] = await Promise.all([fetchPosts(), fetchComments()])

  // Group comments by postId
  const commentsByPostId = comments.reduce(
    (acc, comment) => {
      if (!acc[comment.postId]) {
        acc[comment.postId] = []
      }
      acc[comment.postId].push(comment)
      return acc
    },
    {} as Record<number, Comment[]>,
  )

  // Add comments to each post
  return posts.map((post) => ({
    ...post,
    comments: commentsByPostId[post.id] || [],
  }))
}

// Get top users with most commented posts
export async function getTopUsers(limit = 5): Promise<{ user: User; commentCount: number }[]> {
  const [users, postsWithComments] = await Promise.all([fetchUsers(), getPostsWithComments()])

  // Calculate comment counts per user
  const userCommentCounts = users.map((user) => {
    const userPosts = postsWithComments.filter((post) => post.userId === user.id)
    const totalComments = userPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0)

    return {
      user,
      commentCount: totalComments,
    }
  })

  // Sort by comment count and take top N
  return userCommentCounts.sort((a, b) => b.commentCount - a.commentCount).slice(0, limit)
}

// Get trending posts (posts with most comments)
export async function getTrendingPosts(): Promise<Post[]> {
  const postsWithComments = await getPostsWithComments()

  // Find the maximum comment count
  const maxComments = Math.max(...postsWithComments.map((post) => post.comments?.length || 0))

  // Return all posts that have the maximum comment count
  return postsWithComments.filter((post) => (post.comments?.length || 0) === maxComments).sort((a, b) => b.id - a.id) // Sort by newest (assuming higher id = newer)
}

// Get random image for a user or post
export function getRandomImage(id: number, type: "user" | "post"): string {
  // Use the id as a seed to get consistent images for the same user/post
  const seed = (id * 13) % 1000 // Create some randomness but keep it consistent

  if (type === "user") {
    // Use realistic profile pictures for users
    const profileCategories = ["people", "face", "portrait"]
    const category = profileCategories[id % profileCategories.length]
    return `https://source.unsplash.com/random/200x200/?${category}&sig=${seed}`
  } else {
    // For posts, use a variety of content-appropriate images
    const postCategories = [
      "social",
      "technology",
      "business",
      "nature",
      "travel",
      "food",
      "architecture",
      "art",
      "fashion",
      "sports",
    ]
    const category = postCategories[id % postCategories.length]
    return `https://source.unsplash.com/random/800x600/?${category}&sig=${seed}`
  }
}

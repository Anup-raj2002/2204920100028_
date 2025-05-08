export function getRandomImage(id: number, type: "user" | "post"): string | undefined {
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

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}

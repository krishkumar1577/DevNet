import { Post2Compact } from '@/components/post'
import { getAllPosts } from '@/content'

export default function PostsPage() {
  const posts = getAllPosts()
  
  return (
    <div className="container mx-auto px-5 py-8">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-16">
        All Posts
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(post => (
          <Post2Compact key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
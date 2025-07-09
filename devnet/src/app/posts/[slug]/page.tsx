import Post from '@/components/post'
import { getPostBySlug, getAllPosts } from '@/Content'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post._slug
  }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-5 py-8">
      <Post post={post} />
    </div>
  )
}
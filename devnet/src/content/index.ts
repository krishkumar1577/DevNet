import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post2Fragment } from '@/components/post'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export function getAllPosts(): Post2Fragment[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      return {
        _id: slug,
        _slug: slug,
        _title: matterResult.data.title,
        author: {
          _title: "Krish",
          avatar: {
            url: "/image.png",
            alt: "Krish Avatar"
          }
        },
        coverImage: {
          url: matterResult.data.coverImage || "https://images.unsplash.com/photo-1629467201248-e625add6dd57?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: matterResult.data.coverImageAlt || "Cover Image"
        },
        date: matterResult.data.date,
        excerpt: matterResult.data.summary || matterResult.data.excerpt,
        content: matterResult.content
      } as Post2Fragment
    })

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post2Fragment | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      _id: slug,
      _slug: slug,
      _title: matterResult.data.title,
      author: {
        _title: "Krish",
        avatar: {
          url: "/image.png",
          alt: "Krish Avatar"
        }
      },
      coverImage: {
        url: matterResult.data.coverImage || "https://images.unsplash.com/photo-1629467201248-e625add6dd57?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: matterResult.data.coverImageAlt || "Cover Image"
      },
      date: matterResult.data.date,
      excerpt: matterResult.data.summary || matterResult.data.excerpt,
      content: matterResult.content
    } as Post2Fragment
  } catch (error) {
    return undefined
  }
}
import { Post2Fragment } from '@/components/post'

export const posts: Post2Fragment[] = [
  {
    _id: "1",
    _slug: "my-first-post",
    _title: "My First Blog Post",
    author: {
      _title: "Krish",
      avatar: {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", // Example avatar
        alt: "Krish Avatar"
      }
    },
    coverImage: {
      url: "https://assets.basehub.com/17c993ed/eef3e09488df08e94c2129fbc59e9474/image.png",
      alt: "My First Post Cover"
    },
    date: "2024-12-09",
    excerpt: "Welcome to my first blog post! Learning MDX and Next.js.",
    content: `# My First Blog Post

Welcome to my **first** blog post! This is written in MDX.

## What I'm Learning

I'm learning how to build a blog with:
- Next.js
- MDX
- TypeScript
- Tailwind CSS

## Code Example

\`\`\`javascript
const greeting = "Hello World!";
console.log(greeting);
\`\`\`

## My Thoughts

This is pretty cool! I can write markdown and it becomes a beautiful blog post.

*More content coming soon...*`
  },
  // You can add more posts here
  {
    _id: "2",
    _slug: "second-post",
    _title: "Learning React Components",
    author: {
      _title: "Krish",
      avatar: {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        alt: "Krish Avatar"
      }
    },
    coverImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
      alt: "React Code Cover"
    },
    date: "2024-12-10",
    excerpt: "Diving deeper into React components and state management.",
    content: `# Learning React Components

Today I'm exploring React components and how they work.

## Key Concepts

- **Props**: Data passed to components
- **State**: Internal component data
- **Hooks**: React's way of managing state and effects

## Example Component

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

This is getting exciting!`
  }
]

export function getPostBySlug(slug: string): Post2Fragment | undefined {
  return posts.find(post => post._slug === slug)
}

export function getAllPosts(): Post2Fragment[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
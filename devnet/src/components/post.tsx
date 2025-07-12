
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'

// Simple Post Interface (no BaseHub)
export interface Post2Fragment {
  _id: string
  _slug: string
  _title: string
  author: {
    _title: string
    avatar: {
      url: string
      alt: string
    }
  }
  coverImage: {
    url: string
    alt: string
  }
  date: string
  excerpt: string
  content: string // MDX content as string
}

// Date Component
function PostDate({ dateString }: { dateString: string }) {
  const date = new Date(dateString)
  return (
    <time dateTime={dateString} className="text-base dark:text-white/60 text-black/60">
      {date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    </time>
  )
}

// Avatar Component
function PostAvatar({ title, url }: { title: string; url: string }) {
  return (
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12">
        <Image 
          alt={title} 
          className="object-cover h-full rounded-full" 
          height={96} 
          width={96} 
          src={url} 
        />
      </div>
      <div className="text-xl font-bold">{title}</div>
    </div>
  )
}

// Cover Image Component
function PostCoverImage({
  title,
  url,
  width = 1500,
  height = 1000,
  priority = false,
  className = "",
}: {
  title: string
  url: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}) {
  return (
    <div className="sm:mx-0">
      <Image
        alt={`Cover Image for ${title}`}
        width={width}
        height={height}
        priority={priority}
        className={`shadow-sm rounded-lg object-cover ${className}`}
        src={url}
      />
    </div>
  )
}

// Custom MDX Components
const mdxComponents = {
  // Custom image component
  img: ({ src, alt, ...props }: any) => (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt || "Image"}
        className="rounded-lg"
        width={700}
        height={400}
        {...props}
      />
      {alt && <figcaption className="text-center text-sm text-gray-600 mt-2">{alt}</figcaption>}
    </figure>
  ),
  
  // Custom code blocks
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6" {...props}>
      {children}
    </pre>
  ),
  
  // Custom headings
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-bold mt-4 mb-2" {...props}>{children}</h3>
  ),
  
  // Custom links
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href} 
      className="text-blue-500 hover:text-blue-700 underline" 
      {...props}
    >
      {children}
    </a>
  ),
}

// Main Post Component
export default function Post({
  post,
  showCoverImage = true,
  showAuthor = true,
  showDate = true,
  className = "",
}: {
  post: Post2Fragment
  showCoverImage?: boolean
  showAuthor?: boolean
  showDate?: boolean
  className?: string
}) {
  const { _title, author, date, coverImage, content } = post

  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      {/* Title */}
      <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
        {_title}
      </h1>

      {/* Author and Date - Desktop */}
      <div className="hidden md:block mb-6">
        {showAuthor && author && <PostAvatar title={author._title} url={author.avatar.url} />}
      </div>
      <div className="hidden md:block mb-12">{showDate && <PostDate dateString={date} />}</div>

      {/* Cover Image */}
      {showCoverImage && coverImage && (
        <div className="mb-8 sm:mx-0 md:mb-16">
          <PostCoverImage title={_title} url={coverImage.url} width={1500} height={1000} priority />
        </div>
      )}

      {/* Author and Date - Mobile */}
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {showAuthor && author && <PostAvatar title={author._title} url={author.avatar.url} />}
        </div>
        <div className="mb-12 block md:hidden">{showDate && <PostDate dateString={date} />}</div>
      </div>

      {/* MDX Content */}
      <div className="mx-auto max-w-2xl">
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <MDXRemote 
            source={content} 
            components={mdxComponents}
          />
        </div>
      </div>
    </article>
  )
}

// Compact version for previews
export function Post2Compact({
  post,
  className = "",
}: {
  post: Post2Fragment
  className?: string
}) {
  const { _title, author, date, coverImage, excerpt } = post

  return (
    <div className={className}>
      {/* Cover Image */}
      {coverImage && (
        <div className="mb-5">
          <div className="sm:mx-0">
            <a href={`/posts/${post._slug}`} aria-label={_title}>
              <img 
                alt={`Cover Image for ${_title}`} 
                loading="lazy" 
                width="700" 
                height="700" 
                decoding="async" 
                data-nimg="1" 
                className="shadow-sm rounded-lg object-cover aspect-video hover:shadow-md transition-shadow duration-200" 
                src={coverImage.url}
                style={{color: "transparent"}} 
              />
            </a>
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-3xl mb-3 leading-snug">
        <a href={`/posts/${post._slug}`} className="hover:underline">
          {_title}
        </a>
      </h3>

      {/* Date */}
      <div className="text-base dark:text-white/60 text-black/60 mb-4">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
      </div>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-lg leading-relaxed mb-4">
          {excerpt}
        </p>
      )}

      {/* Author */}
      {author && (
        <div className="flex items-center">
          <div className="mr-4 w-12 h-12">
            <img
              alt={author._title}
              loading="lazy"
              width="96"
              height="96"
              decoding="async"
              data-nimg="1"
              className="object-cover h-full rounded-full"
              src={author.avatar.url}
              style={{ color: "transparent" }}
            />{" "}
          </div>
          <div className="text-xl font-bold">{author._title}</div>
        </div>
      )}
    </div>
  )
}

// Hero version for featured posts
export function Post2Hero({
  post,
  className = "",
}: {
  post: Post2Fragment
  className?: string
}) {
  const { _title, author, date, coverImage, excerpt } = post

  return (
    <section className={className}>
      {/* Cover Image */}
      {coverImage && (
        <div className="mb-8 md:mb-16">
          <a href={`/posts/${post._slug}`} aria-label={_title}>
            <PostCoverImage
              title={_title}
              url={coverImage.url}
              width={1500}
              height={1000}
              className="max-h-[50vh] min-h-[300px]"
              priority
            />
          </a>
        </div>
      )}

      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h1 className="mb-4 text-4xl lg:text-6xl leading-tight text-bold"><a href={`/posts/${post._slug}`} className="hover:underline">
          {_title}
          </a></h1>
          <div className="mb-4 md:mb-0">
            <PostDate dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && <p className="text-lg leading-relaxed mb-4">{excerpt}</p>}
          {author && <PostAvatar title={author._title} url={author.avatar.url} />}
        </div>
      </div>
    </section>
  )
}
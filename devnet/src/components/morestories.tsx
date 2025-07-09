// src/components/morestories.tsx
import Link from "next/link";

interface MoreStoriesProps {
  morePosts: Array<{
    _title: string;
    _slug: string;
    excerpt: string;
    coverImage: {
      url: string;
    };
    date: string;
    author: {
      name: string;
      picture: {
        url: string;
      };
    };
  }>;
  title: string;
}

export function MoreStories({ morePosts, title }: MoreStoriesProps) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {morePosts.map((post) => (
          <div key={post._slug}>
            <div className="mb-5">
              <div className="sm:mx-0">
                <Link href={`/posts/${post._slug}`} aria-label={post._title}>
                  <img 
                    alt={`Cover Image for ${post._title}`}
                    loading="lazy" 
                    width="700" 
                    height="700" 
                    className="shadow-sm rounded-lg object-cover aspect-video hover:shadow-md transition-shadow duration-200" 
                    src={post.coverImage.url}
                  />
                </Link>
              </div>
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
              <Link href={`/posts/${post._slug}`} className="hover:underline">
                {post._title}
              </Link>
            </h3>
            <div className="text-base dark:text-white/60 text-black/60 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString()}
              </time>
            </div>
            <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex items-center">
              <div className="mr-4 w-12 h-12">
                <img
                  alt={post.author.name}
                  loading="lazy"
                  width="96"
                  height="96"
                  className="object-cover h-full rounded-full"
                  src={post.author.picture.url}
                />
              </div>
              <div className="text-xl font-bold">{post.author.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
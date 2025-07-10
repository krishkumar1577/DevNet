// import TextExplosion from "@/components/animations/TextExplosion";

import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Timeline from "@/components/TimeLine";
import { getAllPosts } from '@/content'
import { Post2Hero, Post2Compact } from '@/components/post'
import Link from "next/link"


export default function Home() {
  const posts = getAllPosts()
  const featuredPost = posts[0] // First post as featured

  return (
    <div>
      <div className="container mx-auto px-5">
        {/* Hero Section */}
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-2">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            Blog
          </h1>
          {/* <TextExplosion 
            text="By Krish" 
            className="w-96 h-96"
          /> */}
          <h2 className="text-center md:text-left text-lg mt-5 md:pl-8 hover:underline ">
            <Link href="/posts" >By Krish.</Link>
          </h2>
        </section>

        {/* Featured Post Section do this is hardcoded part for future refrence */}
        {/* <section className="mt-16">
          <div className=" mb-8 md:md-16">
            <div className="sm:mx-0">
              <a
                href="/posts/a-post-about-mountains"
                aria-label="A Post about Mountains"
              >
                <img
                  alt="Cover Image for A Post about Mountains"
                  width="1500"
                  height="1000"
                  decoding="async"
                  data-nimg="1"
                  className="shadow-sm rounded-lg object-cover max-h-[50vh] min-h-[300px] hover:shadow-md transition-shadow duration-200"
                  src="https://assets.basehub.com/17c993ed/eef3e09488df08e94c2129fbc59e9474/image.png"
                  style={{ color: "transparent" }}
                />
              </a>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
              <div>
                <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                  <a
                    href="/posts/a-post-about-mountains"
                    className="hover:underline"
                  >
                    A Post about Mountains
                  </a>
                </h3>
                <div className="mb-4 md:mb-0 text-base dark:text-white/60 text-black/60">
                  <time dateTime="2025-06-24T00:00:00.000Z">June 24, 2025</time>
                </div>
              </div>
              <div>
                <p className="text-lg leading-relaxed mb-4">lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex items-center">
                  <div className="mr-4 w-12 h-12">
                    <img
                      alt="Julian Benegas"
                      loading="lazy"
                      width="96"
                      height="96"
                      decoding="async"
                      data-nimg="1"
                      className="object-cover h-full rounded-full"
                      src="https://assets.basehub.com/17c993ed/dSeM1e6GE_mlzmUUjVe2w/julian-benegas.jpg"
                      style={{ color: "transparent" }}
                    />{" "}
                  </div>
                  <div className="text-xl font-bold">Krish</div>
                </div>
              </div>
          </div>
        </section> */}
        {/* Featured Post using Post2Hero */}
        {featuredPost && <Post2Hero post={featuredPost} className="mt-16" />}



        {/* More Posts Section */}
        {/* <section>
          <h2 className="mb-8 text-6xl md:text-7xl text-bold tracking-tighter leading-tight">More Post</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
            <div>
              <div className="mb-5">
                <div className="sm:mx-0">
                  <a href="/posts/the-power-of-the-dark-side-embracing-your-ambition" aria-label="The Power of the Dark Side: Embracing Your Ambition">
                  <img alt="Cover Image for The Power of the Dark Side: Embracing Your Ambition" loading="lazy" width="700" height="700" decoding="async" data-nimg="1" className="shadow-sm rounded-lg object-cover aspect-video hover:shadow-md transition-shadow duration-200" src="https://assets.basehub.com/17c993ed/e68aaae573c4dab3ba9ffe75734145b1/jedi-temple.jpg" style={{color: "transparent"}} /></a></div>
              </div>
              <h3 className="text-3xl mb-3 leading-snug"><a href="/posts/the-power-of-the-dark-side-embracing-your-ambition" className="hover:underline">The Power of the Dark Side: Embracing Your Ambition</a></h3>
              <div className="text-base dark:text-white/60 text-black/60 mb-4"><time dateTime="2025-06-16">June	16, 2025</time></div>

              <p className="text-lg leading-relaxed mb-4">Discover how embracing your ambition and harnessing your emotions can lead to unprecedented power and success in your career and personal endeavors.</p>
            <div className="flex items-center">
                  <div className="mr-4 w-12 h-12">
                    <img
                      alt="Julian Benegas"
                      loading="lazy"
                      width="96"
                      height="96"
                      decoding="async"
                      data-nimg="1"
                      className="object-cover h-full rounded-full"
                      src="https://assets.basehub.com/17c993ed/dSeM1e6GE_mlzmUUjVe2w/julian-benegas.jpg"
                      style={{ color: "transparent" }}
                    />{" "}
                  </div>
                  <div className="text-xl font-bold">Krish</div>
                </div>
            </div>
            <div>
              <div className="mb-5">
                <div className="sm:mx-0">
                  <a href="/posts/the-power-of-the-dark-side-embracing-your-ambition" aria-label="The Power of the Dark Side: Embracing Your Ambition">
                  <img alt="Cover Image for The Power of the Dark Side: Embracing Your Ambition" loading="lazy" width="700" height="700" decoding="async" data-nimg="1" className="shadow-sm rounded-lg object-cover aspect-video hover:shadow-md transition-shadow duration-200" src="https://assets.basehub.com/17c993ed/e68aaae573c4dab3ba9ffe75734145b1/jedi-temple.jpg" style={{color: "transparent"}} /></a></div>
              </div>
              <h3 className="text-3xl mb-3 leading-snug"><a href="/posts/the-power-of-the-dark-side-embracing-your-ambition" className="hover:underline">The Power of the Dark Side: Embracing Your Ambition</a></h3>
              <div className="text-base dark:text-white/60 text-black/60 mb-4"><time dateTime="2025-06-16">June	16, 2025</time></div>

              <p className="text-lg leading-relaxed mb-4">Discover how embracing your ambition and harnessing your emotions can lead to unprecedented power and success in your career and personal endeavors.</p>
            <div className="flex items-center">
                  <div className="mr-4 w-12 h-12">
                    <img
                      alt="Julian Benegas"
                      loading="lazy"
                      width="96"
                      height="96"
                      decoding="async"
                      data-nimg="1"
                      className="object-cover h-full rounded-full"
                      src="https://assets.basehub.com/17c993ed/dSeM1e6GE_mlzmUUjVe2w/julian-benegas.jpg"
                      style={{ color: "transparent" }}
                    />{" "}
                  </div>
                  <div className="text-xl font-bold">Krish</div>
                </div>
            </div>
          </div>
        </section> */}
        
        <section>
          <h2 className="mb-8 text-6xl md:text-7xl text-bold tracking-tighter leading-tight">More Post</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
            {posts.slice(1).map(post => (
                <Post2Compact post={post} />
            ))}
          </div>
        </section>
      </div>

      
      <div className="mb-16">
        <Newsletter />
      </div>
              {/* Timeline Section */}
        <section >
          <div className="rounded-2xl pb-8 md:pb-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
                Timeline
              </h2>
            </div>
            
            <div className="flex justify-center">
              <Timeline />
            </div>
          </div>
        </section>
      <Footer />
    </div>
  );
}
import TextExplosion from '@/components/animations/TextExplosion';


export default function Home(){
  return (
    <div className="container mx-auto px-5">
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-2">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 ">Blog</h1>
        <TextExplosion 
          text="By Krish" 
          className="w-96 h-96"
        />
      </section>
    </div>
  );
}
"use client";

import type React from "react";
import BeamLight from "./animations/Beamlight";

import {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Simple utility function to replace cn
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Simple icons as SVG components
const ChevronLeft = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronUp = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

// Types and Interfaces
interface TimelineItem {
  id: number; 
  date: string; // Fix typo: was "ate" should be "date"
  title: string;
  content: string;
  hasTable?: boolean;
  slug?: string;
  isBlogPost?: boolean;
  isProjectMilestone?: boolean;
}

interface VisibleRange {
  start: number;
  end: number;
}

// Utility Hooks
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    return undefined;
  }, [query, handleChange]);

  return matches;
}

function useAnimationVariants() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
        mass: 1,
        delayChildren: 0.1,
        staggerChildren: 0.07,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.96,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const contentChildrenVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      y: 5,
      transition: {
        duration: 0.15,
      },
    },
  };

  return {
    containerVariants,
    itemVariants,
    contentVariants,
    contentChildrenVariants,
  };
}

// Timeline Hook
function useTimeline(isMobile: boolean, isTablet: boolean) {
  const initialTimelineData: TimelineItem[] = [
    {
      id: 1,
      date: "Jul 12, 2025",
      title: "Who I Am",
      content: "This is not just a blog post — it's a footprint of who I am, where I'm headed, and what I stand for. A declaration, a trailer, and a bit of a challenge.",
      slug: "Who-I-am",
      isBlogPost: true,
    },
    {
      id: 2,
      date: "Jul 10, 2025",
      title: "Building My First Next.js App",
      content: "My journey building this blog with Next.js 14, the mistakes I made, and what I learned along the way. From routing confusion to deployment success.",
      slug: "building-my-first-nextjs-app",
      isBlogPost: true,
    },
    {
      id: 3,
      date: "Jul 8, 2025",
      title: "My Developer Routine",
      content: "How I structure my days to maximize coding productivity, learning, and still have a life. From 6 AM workouts to 1 AM wind-down.",
      slug: "Daily-Routine",
      isBlogPost: true,
    },
    {
      id: 4,
      date: "Dec 9, 2024",
      title: "My First Blog Post",
      content: "Welcome to my first blog post! Learning MDX and Next.js. This marks the beginning of my journey into web development and content creation.",
      slug: "my-first-post",
      isBlogPost: true,
    },
    {
      id: 5,
      date: "Jun 15, 2025",
      title: "DevNet Blog Launched ",
      content: "Built and launched my personal blog using Next.js, MDX, and Tailwind CSS. This marks the beginning of my journey building in public.",
      isProjectMilestone: true,
    },
    {
      id: 6,
      date: "Jul 1, 2025",
      title: "Started PulseStack ",
      content: "Beginning work on PulseStack - a full-stack project to showcase my development skills and learn new technologies.",
      isProjectMilestone: true,
      hasTable: true,
    },{
      id: 7,
      date: "Aug 31, 2025",
      title: "Building SponZilla",
      content: "A Campus sponsorship platform: student clubs list events, brands see analytics, auto-pitch deck gen via AI",
      slug: "sponzilla-campus-sponsorship",
      isBlogPost: true,
    },
  ];

  const [timelineData] = useState<TimelineItem[]>(initialTimelineData);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleRange, setVisibleRange] = useState<VisibleRange>({
    start: 0,
    end: 4,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<React.RefObject<HTMLButtonElement | null>>>(
    Array(10)
      .fill(null)
      .map(() => createRef<HTMLButtonElement | null>())
  );

  useEffect(() => {
    if (stepRefs.current.length < timelineData.length) {
      const additionalRefs = Array(
        timelineData.length - stepRefs.current.length
      )
        .fill(null)
        .map(() => createRef<HTMLButtonElement | null>());
      stepRefs.current = [...stepRefs.current, ...additionalRefs];
    }
  }, [timelineData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setVisibleRange({ start: 0, end: 1 });
    } else if (isTablet) {
      setVisibleRange({ start: 0, end: 2 });
    } else {
      setVisibleRange({ start: 0, end: 4 });
    }
  }, [isMobile, isTablet]);

  const handleStepClick = (id: number) => {
    setActiveStep(activeStep === id ? null : id);
  };

  const navigateTimeline = (direction: "prev" | "next") => {
    if (direction === "prev" && visibleRange.start > 0) {
      setVisibleRange((prev) => ({
        start: prev.start - 1,
        end: prev.end - 1,
      }));
    } else if (direction === "next" && visibleRange.end < timelineData.length) {
      setVisibleRange((prev) => ({
        start: prev.start + 1,
        end: prev.end + 1,
      }));
    }
  };

  const visibleTimelineData = timelineData.slice(
    visibleRange.start,
    visibleRange.end
  );
  const showPrevButton = visibleRange.start > 0;
  const showNextButton = visibleRange.end < timelineData.length;

  return {
    timelineData,
    visibleTimelineData,
    activeStep,
    isLoaded,
    containerRef,
    stepRefs,
    showPrevButton,
    showNextButton,
    visibleRange,
    handleStepClick,
    navigateTimeline,
    setActiveStep,
  };
}

// Components
function SimpleTable() {
  const data = [
    { name: "Wireframes", thoughts:"The Goals of the Wireframes" },
    { name: "Mockups", thoughts:"The Goals of the Mockups" },
    { name: "Prototypes", thoughts:"The Goals of the Prototypes" },
  ];

  return (
    <div className="border border-gray-800 rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black border-b border-gray-800">
              <th className="text-gray-300 h-10 text-left p-3 text-sm">Name</th>
              <th className="text-gray-300 h-10 text-left p-3 text-sm">
                Thoughts-spot
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-800 transition-colors hover:bg-gray-900"
              >
                <td className="text-gray-300 p-3 text-sm font-medium">
                  {item.name}
                </td>
                <td className="text-gray-300 p-3 text-sm font-medium">
                  {item.thoughts}
                </td>
                {/* <td className="text-gray-300 p-3 text-sm">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "Active"
                        ? "bg-gray-800 text-green-400"
                        : item.status === "Pending"
                        ? "bg-gray-800 text-yellow-400"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-gray-300 p-3 text-sm">{item.location}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TimelineStep({
  step,
  isActive,
  stepRef,
  itemVariants,
  onStepClick,
}: {
  step: TimelineItem;
  isActive: boolean;
  stepRef: React.RefObject<HTMLButtonElement | null>;
  itemVariants: any;
  onStepClick: (id: number) => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center z-20 relative mr-8"
      variants={itemVariants}
    >
      <div className="relative group min-w-[100px] text-center mb-4">
        <span className="text-gray-400 text-sm">{step.date}</span>
      </div>

      <motion.button
        ref={stepRef}
        onClick={() => onStepClick(step.id)}
        className={cn(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center relative",
          isActive
            ? "border-white text-black"
            : "border-white text-white hover:bg-white/10"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          backgroundColor: isActive
            ? "rgba(255, 255, 255, 1)"
            : "rgba(30, 30, 30, 1)",
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.2,
          },
        }}
      >
        {step.id}
      </motion.button>

      <div className="relative group mt-4 min-w-[100px] text-center">
        <motion.span
          className="text-white font-medium whitespace-nowrap"
          animate={{
            scale: isActive ? 1.05 : 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          {step.title}
        </motion.span>
      </div>
    </motion.div>
  );
}

// Update TimelineContent component around line 447
function TimelineContent({
  step,
  contentVariants,
  contentChildrenVariants,
  onClose,
}: {
  step: TimelineItem;
  contentVariants: any;
  contentChildrenVariants: any;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={`content-${step.id}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={contentVariants}
      className="mt-6"
      layout
    >
      <motion.div
        className="bg-black border border-gray-800 rounded-lg p-4 md:p-5 shadow-lg overflow-hidden"
        layout
      >
        <motion.div
          className="flex justify-between items-center mb-4"
          variants={contentChildrenVariants}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg md:text-xl font-medium text-white">
              {step.title}
            </h3>
            {step.isBlogPost && (
              <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                📝 Blog Post
              </span>
            )}
            {step.isProjectMilestone && (
              <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full">
                🎯 Milestone
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step.slug && (
              <motion.a
                href={`/posts/${step.slug}`}
                className="px-3 py-1 text-sm bg-white text-black rounded-md hover:bg-gray-200 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Post →
              </motion.a>
            )}
            <motion.button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp size={20} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 text-gray-300"
          variants={contentChildrenVariants}
        >
          <motion.div
            className="bg-black border border-gray-800 p-3 md:p-4 rounded-md relative group"
            variants={contentChildrenVariants}
            layout
          >
            <p className="text-sm md:text-base">{step.content}</p>
            
            {step.isBlogPost && (
              <div className="mt-3 pt-3 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  Click "Read Post" to see the complete article with code examples and detailed insights.
                </p>
              </div>
            )}
          </motion.div>

          {step.hasTable && (
            <motion.div
              className="mt-4 overflow-x-auto"
              variants={contentChildrenVariants}
              layout
            >
              <SimpleTable />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");

  const {
    timelineData,
    visibleTimelineData,
    activeStep,
    isLoaded,
    containerRef,
    stepRefs,
    showPrevButton,
    showNextButton,
    handleStepClick,
    navigateTimeline,
    setActiveStep,
  } = useTimeline(isMobile, isTablet);

  const {
    containerVariants,
    itemVariants,
    contentVariants,
    contentChildrenVariants,
  } = useAnimationVariants();

  const activeStepData = activeStep
    ? timelineData.find((step) => step.id === activeStep)
    : null;

  return (
    <div className="w-full max-w-5xl">
      <div className="relative" ref={containerRef}>
        {/* Navigation Buttons */}
        {showPrevButton && (
          <button
            onClick={() => navigateTimeline("prev")}
            className="absolute left-0 -translate-x-4 md:translate-x-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
            style={{
              opacity: 1,
              transform: "translateX(-1rem) translateY(-50%)",
            }}
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {showNextButton && (
          <button
            onClick={() => navigateTimeline("next")}
            className="absolute right-0 translate-x-4 md:translate-x-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
            style={{
              opacity: 1,
              transform: "translateX(1rem) translateY(-50%)",
            }}
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* Timeline Container - NO SCROLLBAR */}
        <motion.div
          className="pb-6 px-8"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div
            className={cn(
              "flex",
              isMobile ? "justify-center" : "justify-center"
            )}
          >
            {visibleTimelineData.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <TimelineStep
                  step={step}
                  isActive={activeStep === step.id}
                  stepRef={stepRefs.current[step.id - 1]}
                  itemVariants={itemVariants}
                  onStepClick={handleStepClick}
                />
                {index < visibleTimelineData.length - 1 && (
                  <BeamLight
                    containerRef={containerRef}
                    fromRef={stepRefs.current[step.id - 1]}
                    toRef={
                      stepRefs.current[visibleTimelineData[index + 1].id - 1]
                    }
                    animated={true}
                    glowEffect={true}
                    pulseEffect={false}
                    curvature={20}
                    gradientStartColor="#00ff88"
                    gradientStopColor="#0088ff"
                    duration={3}
                    delay={0.5}
                    pathColor="#374151"
                    pathWidth={2}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative min-h-[100px]">
        <AnimatePresence mode="wait">
          {activeStepData && (
            <TimelineContent
              key={`content-${activeStepData.id}`}
              step={activeStepData}
              contentVariants={contentVariants}
              contentChildrenVariants={contentChildrenVariants}
              onClose={() => setActiveStep(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

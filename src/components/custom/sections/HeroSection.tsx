import React, { useEffect, useRef, useState } from 'react';

import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import Container from '@/components/custom/Container';
import { Button } from '@/components/ui/button';

// Media carousel data
const mediaItems = [
  {
    src: 'media/live.interview.assistant.mp4',
    type: 'video',
    title: 'Live Interview Assistant & Smart Export',
    description:
      'Real-time AI-powered interview assistance with instant suggestions and smart export of interview summaries and insights',
  },
  {
    src: 'media/code.test.mp4',
    type: 'video',
    title: 'Code Test Assistance',
    description: 'AI-powered code suggestions and solutions for technical interviews',
  },
  {
    src: 'media/face.henrry.mp4',
    type: 'video',
    title: 'Face Swap - Henry',
    description: 'Real-time face swap technology for enhanced privacy during interviews',
  },
  {
    src: 'media/face.tonny.mp4',
    type: 'video',
    title: 'Face Swap - Tonny',
    description: 'Seamless face replacement with natural expressions and movements',
  },
  {
    src: 'media/face.victor.mp4',
    type: 'video',
    title: 'Face Swap - Victor',
    description: 'Advanced AI face transformation maintaining professional appearance',
  },
  {
    src: 'media/meeting.henry.mp4',
    type: 'video',
    title: 'Meeting Demo - Henry',
    description: 'Full meeting demonstration with AI assistance and face swap features',
  },
  {
    src: 'media/meeting.tonny.mp4',
    type: 'video',
    title: 'Meeting Demo - Tonny',
    description: 'Complete interview scenario with real-time AI coaching and suggestions',
  },

  {
    src: 'media/meeting.tonny.face.liveassist.png',
    type: 'image',
    title: 'Live Assist Interface',
    description: 'Clean and intuitive interface showing face swap and live assistance features',
  },
];

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carousel navigation functions with fade effect
  const goToNextMedia = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
      setIsFading(false);
    }, 300);
  };

  const goToPrevMedia = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      setIsFading(false);
    }, 300);
  };

  const goToMedia = (index: number) => {
    if (index !== currentMediaIndex) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMediaIndex(index);
        setIsFading(false);
      }, 300);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Handle video ended event - auto advance to next media
  const handleVideoEnded = () => {
    goToNextMedia();
  };

  // Handle image timer - show for 5 seconds then advance
  useEffect(() => {
    const currentMedia = mediaItems[currentMediaIndex];

    if (currentMedia.type === 'image' && isPlaying) {
      imageTimerRef.current = setTimeout(() => {
        goToNextMedia();
      }, 5000); // 5 seconds for images
    }

    return () => {
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }
    };
  }, [currentMediaIndex, isPlaying]);

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((e) => console.log('Video play error:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentMediaIndex]);
  return (
    <section id="home" className="pb-16 pt-20 md:pb-24 md:pt-32" aria-labelledby="hero-heading">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-2 text-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></span>
            <span className="font-medium">Privacy-First AI Interview Assistant</span>
          </div>
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Personal AI-Powered
            <span className="block text-primary">Interview Coach</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Ace technical and behavioral interviews with real-time transcription, intelligent
            suggestions, and cutting-edge face swap technology—all while maintaining your privacy.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2" asChild>
              <a
                href="https://github.com/PowerInterviewAI/client/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('features')}
              className="gap-2"
            >
              Learn More
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            🎁 Start with <span className="font-semibold text-foreground">30 free credits</span> -
            Pay with coins only (No credit card, PayPal, or bank required)
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 rounded-lg border bg-background/50 px-3 py-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z" />
              </svg>
              <span>Windows Only (MacOS & Linux Coming Soon)</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-amber-500/10 px-3 py-1.5 text-amber-700 dark:text-amber-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="font-medium">For Legal Use Only</span>
            </div>
          </div>

          {/* Product Demo Carousel */}
          <div className="mt-12 rounded-lg border bg-muted/30 p-2">
            <div className="relative overflow-hidden rounded bg-black">
              <div
                className={`relative aspect-video transition-opacity duration-300 ${
                  isFading ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {mediaItems[currentMediaIndex].type === 'video' ? (
                  <video
                    ref={videoRef}
                    key={mediaItems[currentMediaIndex].src}
                    className="h-full w-full object-contain"
                    src={`${import.meta.env.BASE_URL}${mediaItems[currentMediaIndex].src}`}
                    autoPlay={isPlaying}
                    onEnded={handleVideoEnded}
                    playsInline
                    muted
                  />
                ) : (
                  <img
                    key={mediaItems[currentMediaIndex].src}
                    src={`${import.meta.env.BASE_URL}${mediaItems[currentMediaIndex].src}`}
                    alt={mediaItems[currentMediaIndex].title}
                    className="h-full w-full object-contain"
                  />
                )}

                <button
                  onClick={goToPrevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                  aria-label="Next media"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent px-6 py-6">
                  <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
                    {mediaItems[currentMediaIndex].title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-100 drop-shadow-md md:text-lg">
                    {mediaItems[currentMediaIndex].description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 bg-black/30 py-3">
                {mediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToMedia(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentMediaIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

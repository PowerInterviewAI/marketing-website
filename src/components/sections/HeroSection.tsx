import React, { useEffect, useRef, useState } from 'react';

import { Check, ChevronLeft, ChevronRight, Copy, Pause, Play } from 'lucide-react';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';

import { InterviewCountBanner } from './InterviewCountBanner';

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
    src: 'media/meeting.tonny.face.liveassist.png',
    type: 'image',
    title: 'Live Assist Interface',
    description: 'Clean and intuitive interface for live interview assistance',
  },
];

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const fetchActiveSessionsCount = async (): Promise<number | null> => {
  try {
    const response = await fetch(
      'https://api.powerinterviewai.com/api/health-check/active-sessions',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const parsedCount = parseInt(text.trim(), 10);

    if (Number.isFinite(parsedCount) && parsedCount >= 0) {
      return parsedCount;
    }
  } catch (error) {
    console.warn('Failed to fetch active session count:', error);
  }

  return null;
};

type InstallPlatform = 'windows' | 'macos';

// Generate install command by platform
const getInstallCommand = (version: string | null, platform: InstallPlatform): string => {
  if (platform === 'windows') {
    if (!version) {
      return '$release = Invoke-RestMethod -Uri "https://api.github.com/repos/PowerInterviewAI/client/releases/latest"; $asset = $release.assets | Where-Object { $_.name -like "*Setup*.exe" } | Select-Object -First 1; Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $asset.name; Start-Process ".\\$($asset.name)"';
    }
    return `curl -L -o PowerInterview-Setup-${version}.exe https://github.com/PowerInterviewAI/client/releases/latest/download/PowerInterview-Setup-${version}.exe && start "" "PowerInterview-Setup-${version}.exe"`;
  }

  if (version) {
    return `curl -L -o Power.Interview-${version}-arm64.dmg https://github.com/PowerInterviewAI/client/releases/latest/download/Power.Interview-${version}-arm64.dmg && open "Power.Interview-${version}-arm64.dmg"`;
  }
  return 'DMG_URL=$(curl -s https://api.github.com/repos/PowerInterviewAI/client/releases/latest | grep -Eo \'https://[^"]+\\.dmg\' | head -n 1) && curl -L "$DMG_URL" -o PowerInterview.dmg && open "PowerInterview.dmg"';
};

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [version, setVersion] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeInstallTab, setActiveInstallTab] = useState<'cli' | 'binary' | 'source'>('cli');
  const [installPlatform, setInstallPlatform] = useState<InstallPlatform>('windows');
  const [interviewCount, setInterviewCount] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interviewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const scheduleNextUpdate = async () => {
      const delay = 5000; // poll every 5 seconds

      const count = await fetchActiveSessionsCount();
      if (isMounted && count !== null) {
        setInterviewCount(count);
      }

      if (!isMounted) return;
      interviewTimerRef.current = setTimeout(() => {
        scheduleNextUpdate();
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      isMounted = false;
      if (interviewTimerRef.current) {
        clearTimeout(interviewTimerRef.current);
      }
    };
  }, []);

  // Fetch latest version from GitHub releases API
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/PowerInterviewAI/client/releases/latest'
        );
        if (response.ok) {
          const data = await response.json();
          const version = data.tag_name?.replace(/^v/, '') || null;
          setVersion(version);
        }
      } catch (error) {
        console.error('Failed to fetch version:', error);
      }
    };

    fetchVersion();
  }, []);

  // Copy install command to clipboard
  const copyInstallCommand = async () => {
    const command = getInstallCommand(version, installPlatform);

    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
    <section id="home" className="md:pt-22 pb-16 pt-10 md:pb-24" aria-labelledby="hero-heading">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <InterviewCountBanner count={interviewCount} />
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Personal AI-Powered
            <span className="block text-primary">Interview Coach</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Ace any type of interviews with our{' '}
            <span className="font-bold uppercase text-foreground">live suggestions, </span>
            <span className="font-bold uppercase text-foreground">
              coding challenge assistant,{' '}
            </span>
            plus plan-based included models and support for{' '}
            <span className="font-bold uppercase text-foreground">your own LLM provider</span> - all
            while keeping your data private with our{' '}
            <span className="font-bold uppercase text-primary">privacy-first</span> design.
          </p>

          <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-2 text-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></span>
            <span className="font-medium">Privacy-First AI Interview Assistant</span>
          </div>

          {/* Installation Options */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="mb-3 text-center">
              <h3 className="text-md text-muted-foreground">Install on Windows or macOS using:</h3>
            </div>

            {/* Tab buttons */}
            <div className="mb-3 flex rounded-lg border bg-muted/30 p-1">
              <button
                onClick={() => setActiveInstallTab('cli')}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  activeInstallTab === 'cli'
                    ? 'bg-background text-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Command Line{' '}
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                  Recommended
                </span>
              </button>
              <button
                onClick={() => setActiveInstallTab('binary')}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  activeInstallTab === 'binary'
                    ? 'bg-background text-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Prebuilt Installer
              </button>
              <button
                onClick={() => setActiveInstallTab('source')}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  activeInstallTab === 'source'
                    ? 'bg-background text-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Build from Source
              </button>
            </div>

            {/* Tab: Command Line */}
            {activeInstallTab === 'cli' && (
              <div className="group relative rounded-lg border bg-muted/50 p-4">
                <div className="mb-3 flex justify-center gap-2">
                  <button
                    onClick={() => setInstallPlatform('windows')}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                      installPlatform === 'windows'
                        ? 'bg-background text-foreground shadow'
                        : 'bg-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Windows
                  </button>
                  <button
                    onClick={() => setInstallPlatform('macos')}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                      installPlatform === 'macos'
                        ? 'bg-background text-foreground shadow'
                        : 'bg-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    macOS
                  </button>
                </div>
                <pre className="mr-8 overflow-x-auto">
                  <code className="text-md font-mono text-foreground">
                    {version
                      ? getInstallCommand(version, installPlatform)
                      : 'Loading installation command...'}
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-4 h-8 w-8 p-0 opacity-70 transition-opacity hover:opacity-100"
                  onClick={copyInstallCommand}
                  disabled={!version}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}

            {/* Tab: Prebuilt Installer */}
            {activeInstallTab === 'binary' && (
              <div className="rounded-lg border bg-muted/50 p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Download the installer for your OS and run it. No additional setup required.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href={
                      version
                        ? `https://github.com/PowerInterviewAI/client/releases/latest/download/PowerInterview-Setup-${version}.exe`
                        : 'https://github.com/PowerInterviewAI/client/releases/latest'
                    }
                    download
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    {version
                      ? `Download PowerInterview-Setup-${version}.exe`
                      : 'Download Latest Installer'}
                  </a>
                  <a
                    href={
                      version
                        ? `https://github.com/PowerInterviewAI/client/releases/latest/download/Power.Interview-${version}-arm64.dmg`
                        : 'https://github.com/PowerInterviewAI/client/releases/latest'
                    }
                    className="inline-flex items-center gap-2 rounded-md border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    {version
                      ? `Download Power.Interview-${version}-arm64.dmg`
                      : 'Open Latest Release Assets (macOS)'}
                  </a>
                  <a
                    href="https://github.com/PowerInterviewAI/client/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground underline hover:text-foreground"
                  >
                    View all releases on GitHub
                  </a>
                </div>
              </div>
            )}

            {/* Tab: Build from Source */}
            {activeInstallTab === 'source' && (
              <div className="rounded-lg border bg-muted/50 p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Clone the repository and run from source. Requires Node.js&nbsp;18+.
                </p>
                <a
                  href="/docs/installation#option-c---build-from-source"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Build Instructions
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 rounded-lg border bg-background/50 px-3 py-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            🎁 Start for Free to try all features - Pay with coins only (No credit card, PayPal, or
            bank required)
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
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

export default HeroSection;

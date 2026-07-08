'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Play, ChevronLeft, ChevronRight, Image as ImageIcon, Film, ArrowDown } from 'lucide-react';

// ─── GALLERY MEDIA ──────────────────────────────────────────────────────
type MediaItem = {
  type: 'image' | 'video';
  src: string;
  caption: string;
};

const STATIC_PHOTOS: MediaItem[] = [
  { type: 'image', src: '/images/gallery/IMG_1839.jpg', caption: 'Training Floor' },
  { type: 'image', src: '/images/gallery/IMG_2550.jpg', caption: 'Gym Equipment' },
  { type: 'image', src: '/images/gallery/IMG_2839.jpg', caption: 'Workout Zone' },
  { type: 'image', src: '/images/gallery/IMG_2964.jpg', caption: 'Members in Action' },
  { type: 'image', src: '/images/gallery/2856cb84-d15d-49aa-86cb-91d65221795c.jpg', caption: "Khan's Fitness" },
  { type: 'image', src: '/images/gallery/9a3bbff1-14ab-43df-bfa1-d2515a796ed5.jpg', caption: 'Gym Interior' },
  { type: 'image', src: '/images/gallery/bafedcc6-d298-476d-9dc0-3d077f177fe9.jpg', caption: 'Training Session' },
  { type: 'image', src: '/images/gallery/c1239eed-c72f-4c1d-b175-4f94a3cfd887.jpg', caption: 'Fitness Zone' },
  { type: 'image', src: '/images/gallery/ddfa470a-51c8-44de-bf0f-cf56100f9322.jpg', caption: 'Gym Atmosphere' },
];

const STATIC_VIDEOS: MediaItem[] = [
  { type: 'video', src: '/videos/gallery/1.mp4', caption: 'Video 1' },
  { type: 'video', src: '/videos/gallery/2.mp4', caption: 'Video 2' },
  { type: 'video', src: '/videos/gallery/3.mp4', caption: 'Video 3' },
  { type: 'video', src: '/videos/gallery/4.mp4', caption: 'Video 4' },
  { type: 'video', src: '/videos/gallery/5.mp4', caption: 'Video 5' },
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxList, setLightboxList] = useState<MediaItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Dynamic admin-uploaded media
  const [blobPhotos, setBlobPhotos] = useState<MediaItem[]>([]);
  const [blobVideos, setBlobVideos] = useState<MediaItem[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Fetch dynamic items from Blob
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const fetchedPhotos = data.items
            .filter((item: any) => item.type === 'image')
            .map((item: any) => ({ type: 'image', src: item.url, caption: 'Admin Upload' }));
            
          const fetchedVideos = data.items
            .filter((item: any) => item.type === 'video')
            .map((item: any) => ({ type: 'video', src: item.url, caption: 'Admin Upload' }));
            
          setBlobPhotos(fetchedPhotos);
          setBlobVideos(fetchedVideos);
        }
      })
      .catch(() => console.log('Failed to fetch dynamic gallery items'));
  }, []);

  const openLightbox = (list: MediaItem[], index: number) => {
    setLightboxList(list);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (videoRef.current) videoRef.current.pause();
  };

  const goNext = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % lightboxList.length);
  };

  const goPrev = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + lightboxList.length) % lightboxList.length);
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  // Combine static and dynamic items
  const ALL_PHOTOS = [...blobPhotos, ...STATIC_PHOTOS];
  const ALL_VIDEOS = [...blobVideos, ...STATIC_VIDEOS];

  return (
    <main className="min-h-screen bg-[var(--bg)]">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Full Viewport
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[100svh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/gallery_hero.png"
            alt="Khan's Fitness Gallery"
            className="w-full h-full object-cover scale-105"
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.85) 100%)',
          }} />
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between pt-[72px]">

          {/* Top: Metadata bar */}
          <div className="px-6 sm:px-8 lg:px-14 2xl:px-24 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase">
                <span className="text-[var(--acid)] font-semibold">03</span>
                <span className="w-8 h-px bg-[var(--acid)]" />
                <span>MEDIA ARCHIVE</span>
              </div>
              <div className="flex items-center gap-6 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase">
                <span>{ALL_PHOTOS.length} PHOTOS</span>
                <span className="w-px h-3 bg-white/20" />
                <span>{ALL_VIDEOS.length} VIDEOS</span>
              </div>
            </div>
          </div>

          {/* Center: Main heading */}
          <div className="flex-1 flex items-center px-6 sm:px-8 lg:px-14 2xl:px-24">
            <div className="w-full">
              <h1
                className="font-bebas text-[clamp(72px,18vw,200px)] text-white leading-[0.85] tracking-tight"
                style={{ letterSpacing: '-0.04em' }}
              >
                GALLERY
              </h1>
              <p className="mt-4 md:mt-6 font-inter font-light text-[14px] md:text-[18px] text-white/60 leading-relaxed max-w-[500px]">
                Step inside Khan&apos;s Fitness. Our world through photos and videos.
              </p>
            </div>
          </div>

          {/* Bottom: Stats + scroll CTA */}
          <div className="px-6 sm:px-8 lg:px-14 2xl:px-24 pb-10 md:pb-14">
            <div className="flex items-end justify-between">
              {/* Stats */}
              <div className="flex gap-10">
                <div className="flex flex-col">
                  <span className="font-bebas text-[40px] md:text-[56px] text-[var(--acid)] leading-none">{ALL_PHOTOS.length}</span>
                  <span className="font-mono text-[8px] md:text-[9px] text-white/35 uppercase tracking-[0.2em] mt-1">PHOTOS</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bebas text-[40px] md:text-[56px] text-[var(--acid)] leading-none">{ALL_VIDEOS.length}</span>
                  <span className="font-mono text-[8px] md:text-[9px] text-white/35 uppercase tracking-[0.2em] mt-1">VIDEOS</span>
                </div>
              </div>

              {/* Scroll down indicator */}
              <button
                onClick={scrollToContent}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors">
                  EXPLORE
                </span>
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-[var(--acid)] group-hover:bg-[var(--acid)]/10 transition-all duration-300">
                  <ArrowDown className="w-4 h-4 text-white/40 group-hover:text-[var(--acid)] transition-colors animate-bounce" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PHOTOS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={contentRef} className="px-4 sm:px-6 lg:px-10 2xl:px-20 pt-16 md:pt-24 pb-16 md:pb-24">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 md:mb-14 px-1">
          <ImageIcon className="w-5 h-5 text-[var(--acid)]" />
          <h2 className="font-bebas text-[36px] md:text-[48px] text-[var(--text-primary)] leading-none tracking-wide">
            PHOTOGRAPHY
          </h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em]">
            {ALL_PHOTOS.length} ITEMS
          </span>
        </div>

        {/* Photo Grid */}
        {ALL_PHOTOS.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {ALL_PHOTOS.map((item, i) => (
                <div
                  key={i}
                  onClick={() => openLightbox(ALL_PHOTOS, i)}
                  className={`group relative overflow-hidden cursor-pointer border border-[var(--border)] hover:border-[var(--acid)] transition-all duration-500 aspect-square bg-[var(--surface)] ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${(i % 10) * 50}ms` }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle border glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 30px rgba(255,59,48,0.08)' }}
                  />
                </div>
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-10 2xl:px-20">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          VIDEOS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-10 2xl:px-20 pt-10 md:pt-16 pb-16 md:pb-24">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 md:mb-14 px-1">
          <Film className="w-5 h-5 text-[var(--acid)]" />
          <h2 className="font-bebas text-[36px] md:text-[48px] text-[var(--text-primary)] leading-none tracking-wide">
            VIDEOS
          </h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em]">
            {ALL_VIDEOS.length} ITEMS
          </span>
        </div>

        {/* Video Grid */}
        {ALL_VIDEOS.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {ALL_VIDEOS.map((item, i) => (
                <div
                  key={i}
                  onClick={() => openLightbox(ALL_VIDEOS, i)}
                  className={`group relative overflow-hidden cursor-pointer border border-[var(--border)] hover:border-[var(--acid)] transition-all duration-500 aspect-[3/4] bg-[var(--surface)] ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${(i % 10) * 80}ms` }}
                >
                  <video
                    src={item.src}
                    muted
                    preload="metadata"
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onMouseEnter={(e) => {
                      const v = e.currentTarget;
                      v.currentTime = 0;
                      v.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-[var(--acid)] group-hover:border-[var(--acid)] group-hover:scale-110 transition-all duration-400 shadow-2xl">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════════════════════════════════ */}
      {lightboxIndex !== null && lightboxList[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-[110] w-10 h-10 flex items-center justify-center text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {lightboxList.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 flex items-center justify-center text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 flex items-center justify-center text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxList[lightboxIndex].type === 'image' ? (
              <img
                src={lightboxList[lightboxIndex].src}
                alt={lightboxList[lightboxIndex].caption}
                className="max-w-full max-h-[85vh] object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                src={lightboxList[lightboxIndex].src}
                controls
                autoPlay
                className="max-w-full max-h-[85vh]"
              />
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
              {lightboxIndex + 1} / {lightboxList.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

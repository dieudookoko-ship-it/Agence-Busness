import React, { useEffect, useState } from 'react';
import { Expand, Plane, X } from 'lucide-react';
import { AIR_CORRIDOR_BANNER, FIELD_GALLERY_IMAGES } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';
import { SafeImage } from './SafeImage';

type ActivePhoto = {
  src: string;
  title: string;
  caption: string;
};

export const OperationsGallerySection: React.FC = () => {
  const { t } = useLogistics();
  const [activePhoto, setActivePhoto] = useState<ActivePhoto | null>(null);

  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  return (
    <section id="galerie" className="py-16 md:py-24 bg-white border-b border-[#D9E8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Section Header matching ServicesSection rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#168ACB] mb-2">
              {t.gallery.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102E49] leading-tight">
              {t.gallery.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#102E49]/75 leading-relaxed">
              {t.gallery.subtitle}
            </p>
          </div>
        </div>

        {/* 6-Photo Field Operations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FIELD_GALLERY_IMAGES.map((photo, index) => {
            const meta = t.gallery.items[photo.id];
            return (
              <figure
                key={photo.id}
                className="group bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActivePhoto({
                      src: photo.src,
                      title: meta.title,
                      caption: meta.caption,
                    })
                  }
                  aria-label={`${t.gallery.zoomLabel} : ${meta.title}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#102E49]/5 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB]"
                >
                  <SafeImage
                    src={photo.src}
                    alt={meta.title}
                    className="w-full h-full object-cover scale-[1.06] transition-transform duration-300 group-hover:scale-[1.1]"
                    fallbackTitle={meta.title}
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[11px] font-mono font-semibold bg-[#102E49]/85 text-white rounded">
                    0{index + 1}
                  </span>
                  <span
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-md bg-white/90 text-[#102E49] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                    aria-hidden="true"
                  >
                    <Expand className="w-4 h-4" />
                  </span>
                </button>

                <figcaption className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#102E49]">
                      {meta.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#102E49]/75 leading-relaxed">
                      {meta.caption}
                    </p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Full-Width Panoramic Air Freight Carriers Showcase */}
        <figure className="mt-8 group bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md">
          <button
            type="button"
            onClick={() =>
              setActivePhoto({
                src: AIR_CORRIDOR_BANNER.src,
                title: t.gallery.airBanner.title,
                caption: t.gallery.airBanner.caption,
              })
            }
            aria-label={`${t.gallery.zoomLabel} : ${t.gallery.airBanner.title}`}
            className="relative w-full bg-white overflow-hidden cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB]"
          >
            <SafeImage
              src={AIR_CORRIDOR_BANNER.src}
              alt={t.gallery.airBanner.title}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              fallbackTitle={t.gallery.airBanner.title}
            />
            <span className="hidden sm:inline-flex items-center gap-1.5 absolute top-3 left-3 px-2.5 py-1 text-[11px] font-mono font-semibold bg-[#102E49]/90 text-white rounded">
              <Plane className="w-3 h-3 text-[#D9E8F1]" aria-hidden="true" />
              <span>{t.gallery.airBanner.badge}</span>
            </span>
            <span
              className="absolute bottom-3 right-3 w-8 h-8 rounded-md bg-white/90 text-[#102E49] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
              aria-hidden="true"
            >
              <Expand className="w-4 h-4" />
            </span>
          </button>

          <figcaption className="p-5 sm:p-6 border-t border-[#D9E8F1] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#102E49]">
                {t.gallery.airBanner.title}
              </h3>
              <p className="mt-1 text-sm text-[#102E49]/75 leading-relaxed max-w-4xl">
                {t.gallery.airBanner.caption}
              </p>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 bg-[#0B2238]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-[#D9E8F1]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#D9E8F1]">
              <div>
                <h3 className="font-display text-base font-bold text-[#102E49]">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-[#102E49]/70">
                  {activePhoto.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label={t.gallery.closeLabel}
                className="w-9 h-9 rounded-md border border-[#D9E8F1] text-[#102E49] hover:bg-[#D9E8F1]/50 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-[#F8FBFD] flex items-center justify-center p-4 max-h-[75vh]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

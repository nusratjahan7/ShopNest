"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerSectionData, HeroSlide, PromoCard as PromoCardType } from "@/lib/BannerData";

const AUTO_ADVANCE_MS = 6000;

function PromoCard({
  card,
  imageSizes,
  className = "",
}: {
  card: PromoCardType;
  imageSizes: string;
  className?: string;
}) {
  const isLight = card.textTheme === "light";

  return (
    <div
      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-5 ${
        card.bgClassName ?? "bg-gray-800"
      } ${className}`}
    >
      {/* Background image, full width/height */}
      <div className="absolute inset-0">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes={imageSizes}
          className="object-cover"
          priority={false}
        />
        {/* Overlay so text stays readable over any image */}
        <div
          className={`absolute inset-0 ${
            isLight ? "bg-black/50" : "bg-white/70"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-[75%]">
        {card.eyebrow && (
          <p
            className={`text-[10px] font-semibold tracking-widest ${
              isLight ? "text-gray-200" : "text-gray-600"
            }`}
          >
            {card.eyebrow}
          </p>
        )}
        <h3
          className={`mt-1 text-base font-bold leading-snug ${
            isLight ? "text-white" : "text-gray-900"
          }`}
        >
          {card.title}
          {card.highlight && (
            <>
              {" "}
              <span
                className={isLight ? "text-yellow-400" : "text-green-600"}
              >
                {card.highlight}
              </span>
            </>
          )}
        </h3>

        {card.description && (
          <p
            className={`mt-1 text-xs ${
              isLight ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {card.description}
          </p>
        )}

        {card.price && (
          <p
            className={`mt-1 text-xs ${
              isLight ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {card.title.toLowerCase().includes("from") ? "" : "FROM "}
            <span
              className={`text-base font-bold ${
                isLight ? "text-green-400" : "text-green-600"
              }`}
            >
              {card.price}
            </span>
          </p>
        )}

        {card.buttonText && card.buttonLink && (
          <Link
            href={card.buttonLink}
            className={`mt-3 inline-block rounded-md px-4 py-2 text-[11px] font-bold tracking-wide transition-colors ${
              isLight
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {card.buttonText}
          </Link>
        )}

        {!card.buttonText && card.buttonLink && (
          <Link
            href={card.buttonLink}
            className={`mt-2 inline-block text-xs font-semibold underline ${
              isLight ? "text-white" : "text-gray-900"
            }`}
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}

function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const total = slides.length;

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [total]);

  if (total === 0) return null;

  const slide = slides[active];
  const isLight = slide.textTheme !== "dark";

  const goTo = (index: number) => setActive((index + total) % total);

  return (
    <div
      className={`relative h-full min-h-[320px] overflow-hidden rounded-xl ${
        slide.bgClassName ?? "bg-gray-400"
      }`}
    >
      {/* Background image, full width/height */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
        {/* Overlay so text stays readable over any image */}
        <div
          className={`absolute inset-0 ${
            isLight ? "bg-black/50" : "bg-white/70"
          }`}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center gap-3 p-8 max-w-[55%]">
        <h2
          className={`text-3xl font-extrabold leading-tight ${
            isLight ? "text-white" : "text-gray-900"
          }`}
        >
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p
            className={`text-2xl font-extrabold leading-tight ${
              isLight ? "text-white" : "text-gray-900"
            }`}
          >
            {slide.subtitle}
          </p>
        )}
        {slide.description && (
          <p
            className={`mt-1 text-sm leading-relaxed ${
              isLight ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {slide.description}
          </p>
        )}

        <Link
          href={slide.buttonLink}
          className={`mt-4 inline-block w-fit rounded-md px-6 py-3 text-sm font-bold tracking-wide transition-colors ${
            isLight
              ? "bg-white text-gray-900 hover:bg-gray-100"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {slide.buttonText}
        </Link>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-gray-800 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-gray-800 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-4 right-4 z-20 rounded-md bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow">
            {active + 1} / {total}
          </div>
        </>
      )}
    </div>
  );
}

export default function BannerSection({ data }: { data: BannerSectionData }) {
  const { saleLabel, categories, heroSlides, sideCards, bottomCards } = data;

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-12 lg:px-8">
      {/* Categories sidebar */}
      <aside className="rounded-xl border border-gray-100 bg-white p-5 lg:col-span-2">
        {saleLabel && (
          <p className="mb-3 text-sm font-bold text-red-500">{saleLabel}</p>
        )}
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={cat.href}
                className="text-sm font-medium text-gray-800 hover:text-green-600"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Hero + bottom cards */}
      <div className="flex flex-col gap-4 lg:col-span-7">
        <div className="group flex-1">
          <HeroCarousel slides={heroSlides} />
        </div>

        {bottomCards.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {bottomCards.map((card) => (
              <PromoCard
                key={card.id}
                card={card}
                imageSizes="(max-width: 1024px) 50vw, 25vw"
                className="min-h-[140px]"
              />
            ))}
          </div>
        )}
      </div>

      {/* Right rail */}
      {sideCards.length > 0 && (
        <div className="flex flex-col gap-4 lg:col-span-3">
          {sideCards.map((card) => (
            <PromoCard
              key={card.id}
              card={card}
              imageSizes="(max-width: 1024px) 100vw, 25vw"
              className="min-h-[190px] flex-1"
            />
          ))}
        </div>
      )}
    </section>
  );
}
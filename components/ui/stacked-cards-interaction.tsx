"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CardProps {
  className?: string;
  image?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
}

const Card = ({
  className,
  image,
  children,
  onClick,
  width = "350px",
  height = "400px",
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      style={{ width, height }}
      className={cn(
        "cursor-pointer overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 transition-shadow hover:shadow-2xl",
        className
      )}
    >
      {image && (
        <div className="relative h-full rounded-xl shadow-lg overflow-hidden w-full">
          <Image
            src={image}
            alt="card"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}
      {children && (
        <div className="px-4 p-2 flex flex-col gap-y-1">{children}</div>
      )}
    </div>
  );
};

interface CardData {
  image: string;
  title: string;
  description: string;
}

interface StackedCardsInteractionProps {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
  animationDelay?: number;
  width?: string;
  height?: string;
}

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 5,
  animationDelay = 0.1,
  width = "350px",
  height = "400px",
}: StackedCardsInteractionProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  // Get 3 cards starting from currentStartIndex, wrapping around if necessary
  const getDisplayCards = () => {
    if (cards.length <= 3) return cards;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(cards[(currentStartIndex + i) % cards.length]);
    }
    return result;
  };

  const displayCards = getDisplayCards();

  const handleNextStack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentStartIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevStack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentStartIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % cards.length);
    }
  };

  const handlePrevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + cards.length) % cards.length);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center group/stack">
      {/* Navigation Arrows for Stack */}
      {cards.length > 3 && (
        <>
          <button
            onClick={handlePrevStack}
            className="absolute left-0 z-30 p-2 rounded-full bg-black/5 text-black hover:bg-black/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all opacity-0 group-hover/stack:opacity-100 -translate-x-full"
            aria-label="Previous images"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextStack}
            className="absolute right-0 z-30 p-2 rounded-full bg-black/5 text-black hover:bg-black/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all opacity-0 group-hover/stack:opacity-100 translate-x-full"
            aria-label="Next images"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="relative" style={{ width, height }}>
        {displayCards.map((card, index) => {
          const isFirst = index === 0;

          let xOffset = 0;
          let rotation = 0;

          if (displayCards.length > 1) {
            if (index === 1) {
              xOffset = -spreadDistance;
              rotation = -rotationAngle;
            } else if (index === 2) {
              xOffset = spreadDistance;
              rotation = rotationAngle;
            }
          }

          return (
            <motion.div
              key={`${currentStartIndex}-${index}`}
              className={cn("absolute inset-0", isFirst ? "z-10" : "z-0")}
              initial={{ x: 0, rotate: 0, opacity: 0, scale: 0.9 }}
              animate={{
                x: isHovering ? xOffset : 0,
                rotate: isHovering ? rotation : 0,
                zIndex: isFirst ? 10 : 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: index * animationDelay,
                type: "spring",
              }}
              {...(isFirst && {
                onHoverStart: () => setIsHovering(true),
                onHoverEnd: () => setIsHovering(false),
              })}
            >
              <Card
                className={isFirst ? "z-10 cursor-pointer" : "z-0"}
                image={card.image}
                onClick={() => setSelectedImageIndex((currentStartIndex + index) % cards.length)}
                width={width}
                height={height}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Image Viewer */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center px-20" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrevLightbox}
                className="absolute left-6 z-10 p-4 rounded-full bg-white/10 text-white hover:bg-white/25 transition-all shadow-xl backdrop-blur-md border border-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft size={40} />
              </button>

              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl w-full h-full flex items-center justify-center"
              >
                <Image
                  src={cards[selectedImageIndex].image}
                  alt="Full screen view"
                  fill
                  className="object-contain rounded-lg shadow-2xl"
                />
              </motion.div>

              <button
                onClick={handleNextLightbox}
                className="absolute right-6 z-10 p-4 rounded-full bg-white/10 text-white hover:bg-white/25 transition-all shadow-xl backdrop-blur-md border border-white/20"
                aria-label="Next image"
              >
                <ChevronRight size={40} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { StackedCardsInteraction, Card };

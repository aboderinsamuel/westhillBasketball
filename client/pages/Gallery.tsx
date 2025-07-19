import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Eye, Users, Trophy, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

// Replace galleryCategories with actual images from public/gallery/
const galleryCategories = [
  {
    id: "games",
    title: "Game Highlights",
    description: "Action shots from our competitive games",
    images: [
      {
        id: 1,
        src: "/gallery/WhatsApp Image 2025-07-19 at 18.25.42.jpeg",
        alt: "Game highlight 1",
        category: "games",
        date: "2025-07-19",
        description: "Exciting moment from a recent game.",
      },
      {
        id: 2,
        src: "/gallery/WhatsApp Image 2025-07-19 at 18.25.42(1).jpeg",
        alt: "Game highlight 2",
        category: "games",
        date: "2025-07-19",
        description: "Team in action on the court.",
      },
      {
        id: 3,
        src: "/gallery/WhatsApp Image 2025-07-19 at 18.25.42(2).jpeg",
        alt: "Game highlight 3",
        category: "games",
        date: "2025-07-19",
        description: "Celebration after a big win.",
      },
    ],
  },
  {
    id: "training",
    title: "Training Sessions",
    description: "Behind the scenes of our skill development",
    images: [
      {
        id: 4,
        src: "/gallery/WhatsApp Image 2025-07-19 at 18.25.42(3).jpeg",
        alt: "Training session 1",
        category: "training",
        date: "2025-07-19",
        description: "Focused training session.",
      },
      {
        id: 5,
        src: "/gallery/WhatsApp Image 2025-07-19 at 18.25.42(4).jpeg",
        alt: "Training session 2",
        category: "training",
        date: "2025-07-19",
        description: "Skill development drills.",
      },
    ],
  },
  // You can add more categories or images as needed
];

// Duplicate images to simulate a larger gallery
const allImages = Array(6)
  .fill(null)
  .flatMap(() => galleryCategories.flatMap((category) => category.images).map((img, i) => ({ ...img, id: img.id + Math.random() })));

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const selectedImageData = selectedImage
    ? allImages.find((img) => img.id === selectedImage)
    : null;

  // Add navigation for lightbox
  const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
  const goToPrev = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();
    if (filteredImages.length === 0) return;
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };
  const goToNext = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();
    if (filteredImages.length === 0) return;
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };
  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex, filteredImages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.jpg" alt="West Hill Basketball Club Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-slate-200 shadow" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                  West Hill Basketball Club
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">Photo Gallery</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-4 sm:space-x-6 mt-2 sm:mt-0">
              <Link
                to="/"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                Home
              </Link>
              <a
                href="/#about"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                About
              </a>
              <a
                href="/#programs"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                Programs
              </a>
              <a
                href="/#contact"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                Contact
              </a>
            </nav>
            {/* Mobile nav button (hamburger) - not implemented, but placeholder for future */}
          </div>
        </div>
      </header>

      {/* Back to Home Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Gallery Header */}
      <section className="py-8 sm:py-12 px-2 sm:px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-4">
            Photo Gallery
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-orange mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-xl text-slate-600 max-w-md sm:max-w-3xl mx-auto">
            Capturing the spirit, energy, and excellence of West Hill Basketball
            Club. From intense game moments to community celebrations - see our
            journey in photos.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-2 sm:px-4 mb-6 sm:mb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all" ? "bg-orange hover:bg-orange/90" : ""
              }
            >
              All Photos
            </Button>
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-orange hover:bg-orange/90"
                    : ""
                }
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="px-2 sm:px-4 mb-8 sm:mb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <Card className="text-center py-4">
              <CardContent className="pt-0">
                <Trophy className="w-8 h-8 text-orange mx-auto mb-2" />
                <h3 className="font-bold text-2xl text-slate-900">
                  {allImages.length}
                </h3>
                <p className="text-slate-600 text-sm">Total Photos</p>
              </CardContent>
            </Card>
            <Card className="text-center py-4">
              <CardContent className="pt-0">
                <Users className="w-8 h-8 text-orange mx-auto mb-2" />
                <h3 className="font-bold text-2xl text-slate-900">
                  {galleryCategories.length}
                </h3>
                <p className="text-slate-600 text-sm">Categories</p>
              </CardContent>
            </Card>
            <Card className="text-center py-4">
              <CardContent className="pt-0">
                <MapPin className="w-8 h-8 text-orange mx-auto mb-2" />
                <h3 className="font-bold text-2xl text-slate-900">5+</h3>
                <p className="text-slate-600 text-sm">Venues</p>
              </CardContent>
            </Card>
            <Card className="text-center py-4">
              <CardContent className="pt-0">
                <Camera className="w-8 h-8 text-orange mx-auto mb-2" />
                <h3 className="font-bold text-2xl text-slate-900">2025</h3>
                <p className="text-slate-600 text-sm">Season</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-1 sm:px-2 mb-8 sm:mb-10">
        <div className="container mx-auto max-w-7xl">
          {filteredImages.length === 0 ? (
            <Card className="text-center py-8 sm:py-12">
              <CardContent>
                <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">
                  No photos in this category yet
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Check back soon for more amazing photos from our basketball
                  activities!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white hover:shadow-lg transition-all duration-200 aspect-[1/1]"
                  onClick={() => openLightbox(image.id)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && selectedImageData && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-full sm:max-w-4xl max-h-[80vh] sm:max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            {/* Left Arrow */}
            {filteredImages.length > 1 && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <span style={{fontSize: 24}} className="sm:text-3xl">&larr;</span>
              </Button>
            )}
            {/* Right Arrow */}
            {filteredImages.length > 1 && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                onClick={goToNext}
                aria-label="Next image"
              >
                <span style={{fontSize: 32}}>&rarr;</span>
              </Button>
            )}
            <img
              src={selectedImageData.src}
              alt={selectedImageData.alt}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={closeLightbox}
            >
              ✕
            </Button>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <h3 className="font-semibold mb-1">{selectedImageData.alt}</h3>
              <p className="text-sm text-slate-300 mb-2">
                {selectedImageData.description}
              </p>
              <p className="text-xs text-slate-400">
                {new Date(selectedImageData.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-sm font-bold">
                🏀
              </div>
              <span className="font-semibold">West Hill Basketball Club</span>
            </div>
            <p className="text-sm">
              © 2025 West Hill Basketball Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

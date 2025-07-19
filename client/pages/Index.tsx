import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Users,
  Trophy,
  Target,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { useState, useEffect } from "react";

// Gallery preview images for slideshow
const galleryPreviewImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/30555530/pexels-photo-30555530.jpeg",
    alt: "Exciting basketball game moment with crowd",
    title: "Game Highlights",
    description: "Intense moments from competitive games",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3425993/pexels-photo-3425993.jpeg",
    alt: "Basketball team in action on indoor court",
    title: "Team Action",
    description: "Players showcasing their skills",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/8336955/pexels-photo-8336955.jpeg",
    alt: "Basketball training session",
    title: "Training Sessions",
    description: "Developing skills and teamwork",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/69773/uss-nimitz-basketball-silhouettes-sea-69773.jpeg",
    alt: "Basketball silhouettes at sunset",
    title: "Community Spirit",
    description: "Building bonds through basketball",
  },
];

// Photo Gallery Slideshow Component
function PhotoGallerySlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryPreviewImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryPreviewImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? galleryPreviewImages.length - 1 : prev - 1,
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Touch/swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 50) nextSlide(); // swipe left
      if (diff < -50) prevSlide(); // swipe right
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section className="py-8 sm:py-16 px-2 sm:px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4">
            Photo Gallery
          </h3>
          <div className="w-16 sm:w-24 h-1 bg-orange mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-xl text-slate-600 max-w-md sm:max-w-2xl mx-auto">
            Capturing the spirit, energy, and excellence of West Hill Basketball Club
          </p>
        </div>
        {/* Slideshow Container */}
        <div className="relative z-0 flex flex-col items-center">
          <Card className="overflow-hidden w-full max-w-2xl mx-auto rounded-2xl shadow-lg">
            <div
              className="relative h-48 sm:h-60 md:h-96 z-0 pb-0"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image Slideshow */}
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryPreviewImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="w-full h-full flex-shrink-0 relative"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                    {/* Content Overlay */}
                    <div className="absolute bottom-2 sm:bottom-8 left-2 sm:left-8 right-2 sm:right-8 text-white z-10 p-2 sm:p-0">
                      <h4 className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                        {image.title}
                      </h4>
                      <p className="text-sm sm:text-lg md:text-xl opacity-90 mb-2 sm:mb-4">
                        {image.description}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Badge
                          variant="secondary"
                          className="bg-orange text-white text-xs sm:text-base"
                        >
                          📸 Gallery Preview
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Navigation Arrows */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 z-20 w-8 h-8 sm:w-10 sm:h-10"
                onClick={prevSlide}
                tabIndex={0}
                aria-label="Previous slide"
                asChild
              >
                <span><ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" /></span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 z-20 w-8 h-8 sm:w-10 sm:h-10"
                onClick={nextSlide}
                tabIndex={0}
                aria-label="Next slide"
                asChild
              >
                <span><ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" /></span>
              </Button>
              {/* Play/Pause Button */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 z-20"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                tabIndex={0}
                aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                asChild
              >
                <span>
                  <Play className={`w-4 h-4 text-white ${isAutoPlaying ? "rotate-0" : ""}`} />
                  <span className="ml-1 sm:ml-2 text-white text-xs sm:text-sm">
                    {isAutoPlaying ? "Auto" : "Manual"}
                  </span>
                </span>
              </Button>
            </div>
          </Card>
          {/* Slide Indicators: below image on mobile, overlay on desktop */}
          <div className="flex justify-center mt-2 sm:mt-0 sm:absolute sm:bottom-8 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto">
            {galleryPreviewImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 mx-1 ${
                  index === currentSlide
                    ? "bg-orange scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Call to Action */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-slate-600 mb-2 sm:mb-4 text-sm sm:text-base">
              This is just a preview! Explore our complete collection of photos.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-orange hover:bg-orange/90 text-orange-foreground px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold shadow-lg"
            >
              <Link to="/gallery">
                View Full Gallery
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
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
                <p className="text-xs sm:text-sm text-slate-600">
                  Scarborough Basketball Excellence
                </p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-4 sm:space-x-6 mt-2 sm:mt-0">
              <a
                href="#about"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                About
              </a>
              <a
                href="#programs"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                Programs
              </a>
              <a
                href="#games"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                Games
              </a>
              <Link
                to="/gallery"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                Gallery
              </Link>
              <a
                href="#contact"
                className="text-slate-600 hover:text-orange transition-colors"
              >
                Contact
              </a>
            </nav>
            {/* Mobile nav button (hamburger) - not implemented, but placeholder for future */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] sm:min-h-screen flex items-center justify-center px-2 sm:px-4 text-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/30555530/pexels-photo-30555530.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Orange Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange/30 via-transparent to-black/40"></div>

        {/* Animated Circles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-orange/20 rounded-full animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-48 h-48 border border-orange/10 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-orange/5 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>

        <div className="relative container mx-auto max-w-5xl z-10 px-2 sm:px-0">
          {/* Main Basketball Icon */}
          {/* In the hero section, make the bouncing logo larger and more visible */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative">
              <img src="/logo.jpg" alt="West Hill Basketball Club Logo" className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover animate-bounce shadow-2xl shadow-orange/50 border-4 sm:border-8 border-white" />
              <div className="absolute -inset-4 sm:-inset-8 bg-orange/20 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Animated Title */}
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in drop-shadow-2xl">
            <span className="inline-block animate-slide-up text-shadow-lg">
              Welcome to
            </span>
            <br />
            <span
              className="inline-block animate-slide-up bg-gradient-to-r from-white via-orange-200 to-orange bg-clip-text text-transparent drop-shadow-2xl"
              style={{ animationDelay: "0.2s" }}
            >
              West Hill Basketball Club
            </span>
          </h2>

          <p
            className="text-lg sm:text-2xl md:text-3xl text-white mb-8 sm:mb-12 max-w-2xl sm:max-w-4xl mx-auto animate-fade-in drop-shadow-xl font-medium"
            style={{ animationDelay: "0.5s" }}
          >
            The home of year-round basketball excellence in Scarborough!
            <span
              className="inline-block text-2xl sm:text-3xl animate-bounce ml-2"
              style={{ animationDelay: "1s" }}
            >
              🌟
            </span>
          </p>

          {/* Enhanced Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange text-orange-foreground px-12 py-8 text-xl font-bold shadow-2xl shadow-orange/30 transform hover:scale-105 transition-all duration-300 border-2 border-orange/50"
            >
              <a href="#register" className="flex items-center gap-2">
                🏀 REGISTER NOW
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-slate-900 px-12 py-8 text-xl font-semibold backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              <a href="#about" className="flex items-center gap-2">
                📖 Learn More
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              About Us
            </h3>
            <div className="w-24 h-1 bg-orange mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                West Hill Basketball Club is a vibrant and community-rooted
                youth basketball organization based in Scarborough. Founded and
                led by Coach John Emore, who also serves as the West Hill
                Community Association President, the club offers a year-round
                schedule of programming for both boys and girls.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our goal is to nurture future athletes, promote character
                development, and build a positive culture through sport.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Community-Rooted
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Trophy className="w-4 h-4 mr-2" />
                  Year-Round Programs
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Heart className="w-4 h-4 mr-2" />
                  Character Building
                </Badge>
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Coach John Emore</h4>
              <p className="text-slate-300 mb-4">Founder & Head Coach</p>
              <p className="text-slate-300 mb-4">
                Also serving as West Hill Community Association President
              </p>
              <div className="bg-orange/20 rounded-lg p-4">
                <p className="text-orange-foreground font-semibold">
                  "Building champions on and off the court"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Programs Offered
            </h3>
            <div className="w-24 h-1 bg-orange mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Whether you're new to the sport or looking to level up, we have a
              program for you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Trophy className="w-5 h-5 mr-2" />
                  Competitive Rep Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Elite competitive teams for serious players
                </p>
                <Badge variant="outline">U10–U17</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Calendar className="w-5 h-5 mr-2" />
                  March Break Camp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Intensive basketball training during March break
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Target className="w-5 h-5 mr-2" />
                  Summer Training Camp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Build skills and make friends during summer
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Users className="w-5 h-5 mr-2" />
                  Fall & Winter House League
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Recreational leagues for all skill levels
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Trophy className="w-5 h-5 mr-2" />
                  All-Year Training & Skill Development Clinics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continuous skill development opportunities throughout the year
                  for players at every level
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Games Section */}
      <section id="games" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Upcoming Games
            </h3>
            <div className="w-24 h-1 bg-orange mx-auto mb-6"></div>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-orange">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center text-slate-600 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Saturday, July 19 @ 4:30 PM
                    </div>
                    <h4 className="font-semibold text-lg text-slate-900 mb-2">
                      vs 17 Ignite
                    </h4>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      GTA Sportsplex (8301 Keele St, Vaughan)
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-orange border-orange"
                  >
                    Away
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center text-slate-600 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Sunday, July 20 @ 3:15 PM
                    </div>
                    <h4 className="font-semibold text-lg text-slate-900 mb-2">
                      vs Roman Jets
                    </h4>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      GTA Sportsplex
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-orange border-orange"
                  >
                    Away
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center text-slate-600 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Sunday, July 20 @ 7:00 PM
                    </div>
                    <h4 className="font-semibold text-lg text-slate-900 mb-2">
                      vs Finesse Basketball
                    </h4>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      GTA Sportsplex
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-orange border-orange"
                  >
                    Away
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section with Slideshow */}
      <PhotoGallerySlideshow />

      {/* Registration Section */}
      <section
        id="register"
        className="py-16 px-4 bg-gradient-to-r from-orange to-orange/90 text-white"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Registration</h3>
          <p className="text-xl mb-8 text-orange-foreground/90">
            Interested in joining West Hill Basketball?
          </p>
          <p className="text-lg mb-8 text-orange-foreground/90">
            Click below to register:
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-12 py-6 text-lg font-semibold bg-white text-orange hover:bg-slate-100"
          >
            REGISTER NOW
          </Button>
        </div>
      </section>

      {/* Why Choose West Hill Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose West Hill?
            </h3>
            <div className="w-24 h-1 bg-orange mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">
                    Inclusive, athlete-first environment
                  </h4>
                  <p className="text-slate-600">
                    We prioritize every player's development and well-being in a
                    supportive community.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">
                    Certified coaching staff
                  </h4>
                  <p className="text-slate-600">
                    Strong basketball and mentorship experience to guide your
                    development.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">
                    Programs across Scarborough schools
                  </h4>
                  <p className="text-slate-600">
                    Convenient locations throughout the Scarborough community.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">
                    Strong track record
                  </h4>
                  <p className="text-slate-600">
                    Participation in tournaments and leagues including Coalition
                    League, CYBL, OBL, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h3>
            <div className="w-24 h-1 bg-orange mx-auto mb-6"></div>
            <p className="text-xl text-slate-300">
              Join our basketball family today and be part of something great!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">[Insert email here]</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">@WestHillBasketball</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">[Insert number here]</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-2 sm:px-4 bg-slate-950 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 md:mb-0">
              <img src="/logo.jpg" alt="West Hill Basketball Club Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full border-2 border-slate-200 shadow" />
              <span className="font-semibold text-sm sm:text-base">West Hill Basketball Club</span>
            </div>
            <p className="text-xs sm:text-sm">
              © 2025 West Hill Basketball Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

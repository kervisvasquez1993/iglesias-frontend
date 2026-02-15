"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Heart,
  ChevronLeft,
  ChevronRight,
  Expand,
  Play,
  Video,
} from "lucide-react";
import { IMisioneroFile } from "@/insfractucture/interfaces/misiones/misiones.interfaces";

interface MisioneroGaleriaProps {
  files: IMisioneroFile[];
  title: string;
}

export const MisioneroGaleria = ({ files, title }: MisioneroGaleriaProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);
  const [visibleVideos, setVisibleVideos] = useState(2);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Separar archivos en imágenes y videos
  const images = files.filter((f) => f.mime.startsWith("image/"));
  const videos = files.filter((f) => f.mime.startsWith("video/"));

  const hasImages = images.length > 0;
  const hasVideos = videos.length > 0;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-seleccionar tab según contenido disponible
  useEffect(() => {
    if (!hasImages && hasVideos) {
      setActiveTab("videos");
    } else {
      setActiveTab("images");
    }
  }, [hasImages, hasVideos]);

  // Responsive: cantidad visible según viewport
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleImages(1);
        setVisibleVideos(1);
      } else if (window.innerWidth < 1024) {
        setVisibleImages(2);
        setVisibleVideos(1);
      } else {
        setVisibleImages(3);
        setVisibleVideos(2);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Navegación de imágenes
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev + 1 < images.length - (visibleImages - 1) ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : images.length - visibleImages
    );
  };

  // Navegación de videos
  const nextVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev + 1 < videos.length - (visibleVideos - 1) ? prev + 1 : 0
    );
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : videos.length - visibleVideos
    );
  };

  // Si no hay archivos multimedia, no renderizar nada
  if (!hasImages && !hasVideos) return null;

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-gold-400 rounded-full" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-blue-400 rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-xl">
              {activeTab === "images" ? (
                <Camera className="w-8 h-8 text-white" />
              ) : (
                <Video className="w-8 h-8 text-white" />
              )}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-church-blue-900 mb-2">
            {activeTab === "images" ? "Galeria" : "Vídeos"}
            <br />
            <span className="text-church-gold-500">{title}</span>
          </h2>

          <p className="text-church-blue-600 text-sm">
            {images.length + videos.length}{" "}
            {images.length + videos.length === 1 ? "arquivo" : "arquivos"} de
            mídia
          </p>
        </div>

        {/* Tabs Fotos / Vídeos */}
        {hasImages && hasVideos && (
          <div
            className={`flex justify-center mb-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-8 opacity-0"
            }`}
          >
            <div className="flex rounded-lg bg-white/80 backdrop-blur-sm p-1 shadow-lg border border-church-sky-200">
              <Button
                variant={activeTab === "images" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("images")}
                className={`flex items-center space-x-2 ${
                  activeTab === "images"
                    ? "bg-church-gold-500 text-white shadow-md"
                    : "text-church-blue-600 hover:bg-church-gold-500/10"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Fotos ({images.length})</span>
              </Button>

              <Button
                variant={activeTab === "videos" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("videos")}
                className={`flex items-center space-x-2 ${
                  activeTab === "videos"
                    ? "bg-church-gold-500 text-white shadow-md"
                    : "text-church-blue-600 hover:bg-church-gold-500/10"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Vídeos ({videos.length})</span>
              </Button>
            </div>
          </div>
        )}

        {/* ======== CARRUSEL DE IMÁGENES ======== */}
        {activeTab === "images" && hasImages && (
          <div
            className={`transition-all duration-1000 ease-out delay-500 ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-12 opacity-0"
            }`}
          >
            <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentImageIndex * (100 / visibleImages)
                  }%)`,
                }}
              >
                {images.map((imagen, index) => (
                  <div
                    key={imagen.id}
                    className="px-4 flex-shrink-0"
                    style={{ width: `${100 / visibleImages}%` }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative h-80 md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl shadow-2xl group">
                      <Image
                        src={imagen.url}
                        alt={imagen.alternativeText || `${title} - Foto ${index + 1}`}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        priority={index < 3}
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Heart icon */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-church-gold-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        <Heart className="w-6 h-6 text-white" />
                      </div>

                      {/* Expand button */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="icon"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white"
                          variant="outline"
                        >
                          <Expand className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Nombre del archivo */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-white font-medium text-sm truncate">
                            {imagen.name}
                          </p>
                        </div>
                      </div>

                      {/* Border hover */}
                      <div
                        className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                          hoveredIndex === index
                            ? "border-church-gold-400 shadow-lg shadow-church-gold-400/25"
                            : "border-transparent"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de navegación */}
              {images.length > visibleImages && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 shadow-xl bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 shadow-xl bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Indicadores */}
              {images.length > visibleImages && (
                <div className="flex justify-center space-x-3 mt-6">
                  {Array.from({
                    length: images.length - (visibleImages - 1),
                  }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
                        index === currentImageIndex
                          ? "bg-church-gold-500 scale-125 shadow-church-gold-500/50"
                          : "bg-church-sky-300 hover:bg-church-gold-400"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======== CARRUSEL DE VIDEOS ======== */}
        {activeTab === "videos" && hasVideos && (
          <div
            className={`transition-all duration-1000 ease-out delay-500 ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-12 opacity-0"
            }`}
          >
            <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentVideoIndex * (100 / visibleVideos)
                  }%)`,
                }}
              >
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="px-4 flex-shrink-0"
                    style={{ width: `${100 / visibleVideos}%` }}
                  >
                    <div className="relative h-[28rem] md:h-[550px] lg:h-[700px] overflow-hidden rounded-2xl shadow-2xl group bg-black">
                      <video
                        src={video.url}
                        controls
                        className="w-full h-full object-contain rounded-2xl"
                        preload="metadata"
                        onPlay={() => setPlayingVideo(video.id)}
                        onPause={() => setPlayingVideo(null)}
                      >
                        Seu navegador não suporta o elemento de vídeo.
                      </video>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Play overlay (visible cuando no está reproduciendo) */}
                      {playingVideo !== video.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none">
                          <div className="w-20 h-20 bg-church-gold-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Badge de video */}
                      <div className="absolute top-4 right-4 pointer-events-none">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-church-gold-500 text-white shadow-lg backdrop-blur-sm">
                          <Video className="w-3 h-3 mr-1" />
                          Vídeo
                        </span>
                      </div>

                      {/* Info del video */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-white font-medium text-sm truncate">
                            {video.name}
                          </p>
                          <p className="text-white/70 text-xs mt-1">
                            {(video.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de navegación */}
              {videos.length > visibleVideos && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 shadow-xl bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm"
                    onClick={prevVideo}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 shadow-xl bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm"
                    onClick={nextVideo}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Indicadores */}
              {videos.length > visibleVideos && (
                <div className="flex justify-center space-x-3 mt-6">
                  {Array.from({
                    length: videos.length - (visibleVideos - 1),
                  }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
                        index === currentVideoIndex
                          ? "bg-church-gold-500 scale-125 shadow-church-gold-500/50"
                          : "bg-church-sky-300 hover:bg-church-gold-400"
                      }`}
                      onClick={() => setCurrentVideoIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Contador */}
              <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-church-blue-700 shadow-lg">
                <span className="text-sm font-medium">
                  {currentVideoIndex + 1} de {videos.length}{" "}
                  {videos.length === 1 ? "vídeo" : "vídeos"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje vacío por tab */}
        {((activeTab === "images" && !hasImages) ||
          (activeTab === "videos" && !hasVideos)) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-church-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === "images" ? (
                <Camera className="w-8 h-8 text-church-blue-600" />
              ) : (
                <Video className="w-8 h-8 text-church-blue-600" />
              )}
            </div>
            <p className="text-church-blue-600 text-lg">
              Não há {activeTab === "images" ? "imagens" : "vídeos"} disponíveis.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
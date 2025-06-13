"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronDown,
  User,
  Calendar,
  MessageSquare,
  HelpCircle,
  Linkedin,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const navigationCards = [
  {
    title: "Mon profil",
    href: "/profil",
    icon: User,
    color: "bg-gradient-to-br from-orange-400 to-orange-500",
    description: "Gérez vos informations personnelles",
  },
  {
    title: "Mes entretiens",
    href: "/entretiens",
    icon: Calendar,
    color: "bg-gradient-to-br from-green-400 to-green-500",
    description: "Suivez vos entretiens programmés",
  },
  {
    title: "Les témoignages",
    href: "/temoignages",
    icon: MessageSquare,
    color: "bg-gradient-to-br from-blue-400 to-blue-500",
    description: "Découvrez les success stories",
  },
  {
    title: "FAQ",
    href: "/faq",
    icon: HelpCircle,
    color: "bg-gradient-to-br from-purple-400 to-purple-500",
    description: "Trouvez les réponses à vos questions",
  },
]

const certifications = [
  {
    name: "Ecovadis Platinum",
    description:
      "Nous accordons une importance particulière aux problématiques environnementales, éthiques, et sociales.",
    logo: "/images/ecovadis-logo.png",
  },
  {
    name: "B-Corp",
    description: "AptiSkills intègre dans son modèle économique des objectifs sociaux, sociétaux et environnementaux.",
    logo: "/images/bcorp-logo.png",
  },
  {
    name: "MASE",
    description: "Nous sommes dans une démarche d'amélioration continue pour réduire les risques au travail.",
    logo: "/images/mase-logo.png",
  },
]

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/aptiskills",
    icon: Linkedin,
    color: "hover:bg-blue-600",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@aptiskills",
    icon: () => (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    color: "hover:bg-black",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aptiskills",
    icon: Instagram,
    color: "hover:bg-pink-600",
  },
]

export default function AccueilPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTitle, setShowTitle] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Effet de disparition du titre après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false)
      setShowScrollIndicator(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen()
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen()
        } else if ((containerRef.current as any).msRequestFullscreen) {
          await (containerRef.current as any).msRequestFullscreen()
        }
        setIsFullscreen(true)
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("Erreur lors du passage en plein écran:", error)
    }
  }

  // Écouter les changements de plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
    }
  }, [])

  const scrollToContent = () => {
    const element = document.getElementById("content-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Section Vidéo Hero */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay
        >
          <source
            src="https://steekstorage.blob.core.windows.net/steekcontainer/10%20ans.mp4?sp=racwdli&st=2024-11-22T14:27:33Z&se=2025-11-22T22:27:33Z&sv=2022-11-02&sr=c&sig=smRTTjHBpqQ0wTd6Kk2V4Ul3QPVpN88j30AhNo5ebxc%3D"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />

        {/* Réseaux sociaux à droite */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:scale-110 hover:bg-opacity-90`}
                title={social.name}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Content avec effet de disparition */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 transition-all duration-1000 ${
            showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Bienvenue chez <span className="text-[#ff7201]">Aptiskills</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl leading-relaxed">
            Votre partenaire conseil pour développer vos compétences et accélérer votre carrière
          </p>
        </div>

        {/* Indicateur de scroll */}
        <div
          className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000 ${
            showScrollIndicator ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={scrollToContent}
            className="flex flex-col items-center text-white hover:text-[#ff7201] transition-colors group"
          >
            <span className="text-sm mb-2">Découvrir</span>
            <ChevronDown className="h-6 w-6 animate-bounce group-hover:text-[#ff7201]" />
          </button>
        </div>

        {/* Contrôles vidéo */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
            {/* Play/Pause */}
            <Button
              onClick={toggleVideo}
              size="sm"
              className="bg-[#ff7201] hover:bg-[#e6650a] text-white rounded-full w-12 h-12 p-0"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>

            {/* Son */}
            <Button
              onClick={toggleMute}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            {/* Plein écran */}
            <Button
              onClick={toggleFullscreen}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Bouton pour réafficher le titre */}
        <div
          className={`absolute top-24 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000 ${
            !showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <Button
            onClick={() => setShowTitle(true)}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/20 text-sm"
          >
            Afficher le titre
          </Button>
        </div>
      </div>

      {/* Section Navigation Cards */}
      <section id="content-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {navigationCards.map((card, index) => (
              <Link key={index} href={card.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden h-64">
                  <CardContent
                    className={`${card.color} h-full p-8 flex flex-col items-center justify-center text-white text-center relative`}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                    <card.icon className="h-16 w-16 mb-4 relative z-10" />
                    <h3 className="text-2xl font-bold mb-2 relative z-10">{card.title}</h3>
                    <p className="text-sm opacity-90 relative z-10">{card.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Entreprise Engagée */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              UNE ENTREPRISE <span className="text-[#ff7201]">ENGAGÉE</span>
              <br />
              ET <span className="text-[#ff7201]">RESPONSABLE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image
                      src={cert.logo || "/placeholder.svg"}
                      alt={cert.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{cert.name}</h3>
                <p className="text-gray-600 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#ff7201] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Image
              src="/images/aptiskills-logo.png"
              alt="Aptiskills"
              width={200}
              height={60}
              className="h-12 w-auto filter brightness-0 invert"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Navigation */}
            <div>
              <h3 className="text-xl font-bold mb-6">Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="hover:text-orange-200 transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/profil" className="hover:text-orange-200 transition-colors">
                    Mon profil
                  </Link>
                </li>
                <li>
                  <Link href="/entretiens" className="hover:text-orange-200 transition-colors">
                    Mes entretiens
                  </Link>
                </li>
                <li>
                  <Link href="/temoignages" className="hover:text-orange-200 transition-colors">
                    Les témoignages
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-orange-200 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold mb-6">Nos certifications</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">ECO</span>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">B</span>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">Q</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold mb-6">Nous contacter</h3>
              <div className="space-y-3">
                <p>recrutement.france@aptiskills.fr</p>
                <p>06 37 28 60 15</p>
                <p>
                  28 rue Edouard Vaillant,
                  <br />
                  92300 Levallois-Perret
                </p>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-xl font-bold mb-6">Nos réseaux sociaux</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/aptiskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@aptiskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/aptiskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy;2025 APTISKILLS</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="https://aptiskills.fr/mentions-legales/" className="hover:text-orange-200 transition-colors">
                Mentions légales
              </Link>
              <Link href="https://aptiskills.fr/mentions-legales/" className="hover:text-orange-200 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

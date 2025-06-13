"use client"

import { useState, useEffect } from "react"
import { Quote, Award, MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const temoignages = [
  {
    id: 1,
    nom: "Antoine",
    poste: "Ingénieur conception mécanique",
    duree: "Chez Aptis depuis 1,5 an",
    photo: "/placeholder.svg?height=120&width=120",
    commentaire:
      "Aujourd'hui, mes compétences en termes de conception touchent et ont touché à plein de domaines différents. Chez AptiSkills, j'ai travaillé dans le BTP, dans la conception de machines spéciales pour des centres de traitement de déchets, et actuellement je travaille dans le domaine de l'énergie avec des projets hydrogène mais aussi sur des projets défense !",
    domaines: ["BTP", "Machines spéciales", "Énergie", "Défense"],
  },
  {
    id: 2,
    nom: "Pierre-Raymond",
    poste: "Ingénieur d'Etudes Calculs Aéronautique",
    duree: "Chez Aptis depuis 2 ans",
    photo: "/placeholder.svg?height=120&width=120",
    commentaire:
      "L'entreprise dans laquelle je suis en mission actuellement a une activité à flux tendu, on ne s'ennuie pas. Les sujets peuvent être variés et nécessiter des approches différentes qui mettent à profit toute l'expérience que j'ai accumulée jusqu'à présent. Le client me fait confiance et n'hésite pas à me mettre à contribution pour orienter d'un point de vue technique les membres les moins expérimentés de l'équipe.",
    domaines: ["Aéronautique", "Calculs", "Expertise technique"],
  },
  {
    id: 3,
    nom: "Chloé",
    poste: "Ingénieur HSE",
    duree: "Chez Aptis depuis un an",
    photo: "/placeholder.svg?height=120&width=120",
    commentaire:
      "Pouvoir intégrer une entreprise d'une certaine renommée en tant qu'ingénieure HSE en première expérience chez APTISKILLS sur une mission telle que celle-ci, est très formateur ! La clé dans ce milieu est l'adaptation. Il faut savoir être multitâche, curieux, présent, et intégrer un maximum d'informations. C'est donc comme cela que je perçois le métier de consultante : être un bon 4x4 tout terrain.",
    domaines: ["HSE", "Adaptation", "Multitâche"],
  },
  {
    id: 4,
    nom: "Alexandra",
    poste: "Conductrice travaux",
    duree: "Chez Aptis depuis 5 ans",
    photo: "/placeholder.svg?height=120&width=120",
    commentaire:
      "En tant qu'ingénieur consultante, j'ai évolué au fil des missions: j'ai commencé comme chargée de mission chez un bailleur social, jusqu'à devenir directrice de projet adjointe sur le projet EOLE du Grand Paris Express, en passant par un poste de responsable technique, le tout en seulement 3 ans. J'ai pu voir ma carrière évoluer très rapidement pour atteindre le poste que je convoitais, et ce, grâce aux missions que l'on m'a proposées !",
    domaines: ["Grand Paris Express", "Direction de projet", "Évolution rapide"],
  },
]

const certifications = [
  {
    nom: "Ecovadis Platinum",
    icon: Award,
  },
  {
    nom: "B-Corp",
    icon: Award,
  },
  {
    nom: "ISO 14001",
    icon: Award,
  },
]

export default function TemoignagesPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % temoignages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ff7201] via-[#ff8533] to-[#ff9966]">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Leur carrière les a menés
              <br />
              tout droit chez AptiSkills
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90 mb-12">
              Découvrez les parcours inspirants de nos consultants et leurs expériences chez AptiSkills
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Featured Testimonial */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-[200px] font-serif text-[#ff7201]/10 pointer-events-none">
              "
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ff7201] to-[#ff9966] blur-xl opacity-20 transform -rotate-6"></div>
                  <div className="relative aspect-square overflow-hidden rounded-3xl border-8 border-white shadow-xl">
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={temoignages[activeIndex].photo || "/placeholder.svg"}
                        alt={temoignages[activeIndex].nom}
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      <AvatarFallback className="text-5xl bg-gradient-to-br from-[#ff7201] to-[#ff8533] text-white">
                        {temoignages[activeIndex].nom.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">{temoignages[activeIndex].nom}</h2>
                  <p className="text-xl text-[#ff7201] font-medium mb-1">{temoignages[activeIndex].poste}</p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{temoignages[activeIndex].duree}</span>
                  </div>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{temoignages[activeIndex].commentaire}"
                </p>

                <div className="flex flex-wrap gap-2">
                  {temoignages[activeIndex].domaines.map((domaine, index) => (
                    <Badge
                      key={index}
                      className="bg-[#ff7201]/10 hover:bg-[#ff7201]/20 text-[#ff7201] border border-[#ff7201]/20 px-3 py-1"
                    >
                      {domaine}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-2">
              {temoignages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? "bg-[#ff7201] w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Voir le témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tous nos témoignages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences variées de nos consultants dans différents secteurs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {temoignages.map((temoignage, index) => (
              <Card
                key={temoignage.id}
                className={`group hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#ff7201]/20 ${
                  activeIndex === index ? "ring-2 ring-[#ff7201]" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 rounded-xl">
                      <AvatarImage src={temoignage.photo || "/placeholder.svg"} alt={temoignage.nom} />
                      <AvatarFallback className="bg-[#ff7201]/10 text-[#ff7201] font-bold">
                        {temoignage.nom.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{temoignage.nom}</h3>
                      <p className="text-[#ff7201] font-medium text-sm">{temoignage.poste}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {temoignage.duree}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 line-clamp-3 text-gray-700">
                    <Quote className="inline h-4 w-4 text-[#ff7201] mr-1 mb-1" />
                    {temoignage.commentaire}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {temoignage.domaines.slice(0, 2).map((domaine, i) => (
                      <span
                        key={i}
                        className="inline-flex text-xs bg-[#ff7201]/5 text-[#ff7201]/80 px-2 py-1 rounded-md"
                      >
                        {domaine}
                      </span>
                    ))}
                    {temoignage.domaines.length > 2 && (
                      <span className="inline-flex text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                        +{temoignage.domaines.length - 2}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nos certifications</h2>
            <p className="text-gray-600">Nous sommes fiers de nos engagements et reconnaissances</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <cert.icon className="h-12 w-12 text-[#ff7201]" />
                </div>
                <p className="font-medium">{cert.nom}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-[#ff7201] to-[#ff9966] p-12 text-white">
                <h3 className="text-2xl font-bold mb-6">Nous contacter</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    recrutement.france@aptiskills.fr
                  </p>
                  <p className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    06 37 28 60 15
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                    <span>
                      28 rue Edouard Vaillant,
                      <br />
                      92300 Levallois-Perret
                    </span>
                  </p>
                </div>

                <div className="mt-12">
                  <h4 className="font-medium mb-4">Nos réseaux sociaux</h4>
                  <div className="flex gap-4">
                    <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M19 3a2 2 0 00-2-2H7a2 2 0 00-2 2v18l7-3 7 3V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Rejoignez l'aventure</h3>
                <p className="text-gray-600 mb-8">
                  Vous souhaitez faire partie de l'équipe AptiSkills ? Contactez-nous pour discuter de votre projet
                  professionnel.
                </p>
                <button className="w-full bg-[#ff7201] hover:bg-[#e6650a] text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Nous contacter
                </button>

                <div className="mt-8 text-sm text-gray-500">
                  <p className="mb-2">@2025 APTISKILLS</p>
                  <div className="flex gap-4">
                    <a href="#" className="hover:text-[#ff7201]">
                      Mentions légales
                    </a>
                    <a href="#" className="hover:text-[#ff7201]">
                      Politique de confidentialité
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Simulation d'un candidat avec son état de progression
const candidatProgression = {
  currentStep: 1, // Étape actuelle (1, 2, ou 3)
  completedSteps: [], // Étapes terminées [1] par exemple
  poste: "Développeur Full Stack Senior",
}

const roadmapSteps = [
  {
    id: 1,
    title: "Faisons connaissance !",
    description: "L'occasion pour toi d'apprendre à connaître AptiSkills, et pour nous de cibler tes attentes !",
  },
  {
    id: 2,
    title: "Parlons projets !",
    description:
      "Davantage technique, cet échange te permettra d'en savoir plus sur les projets en adéquation avec ton domaine d'expertise. Parcourons ensemble également tes aspirations et répondons à tes interrogations. Statuons sur les éléments financiers.",
  },
  {
    id: 3,
    title: "Dernière ligne droite !",
    description:
      "Félicitations ! Nous te présenterons ton contrat de travail et préparerons ensemble ton arrivée parmi nous.",
  },
]

// Informations de contact pour les entretiens
const contactInfo = {
  nom: "Deborah BRUZZESE",
  telephone: "07 88 80 99 84",
  email: "deborah.bruzzese@aptiskills.fr",
  poste: "Responsable Recrutement",
  teamsLink: "https://teams.microsoft.com/l/meetup-join/...", // Lien Teams fictif
}

// Entretiens basés sur la progression
const getEntretiensForStep = (step: number, poste: string) => {
  const baseEntretien = {
    poste: poste,
    entreprise: "AptiSkills",
  }

  switch (step) {
    case 1:
      return {
        ...baseEntretien,
        id: 1,
        date: "2024-01-15",
        heure: "14:00",
        lieu: "Visioconférence",
        recruteur: "Deborah BRUZZESE",
        statut: "Confirmé",
        type: "Distanciel",
      }
    case 2:
      return {
        ...baseEntretien,
        id: 2,
        date: "À définir",
        heure: "À définir",
        lieu: "28 rue Edouard Vaillant, 92300 Levallois-Perret",
        recruteur: "À définir",
        statut: "En attente",
        type: "Présentiel",
      }
    case 3:
      return {
        ...baseEntretien,
        id: 3,
        date: "À définir",
        heure: "À définir",
        lieu: "28 rue Edouard Vaillant, 92300 Levallois-Perret",
        recruteur: "À définir",
        statut: "En attente",
        type: "Présentiel",
      }
    default:
      return null
  }
}

const feedbackQuestions = [
  {
    id: 1,
    question: "Comment as-tu trouvé l'échange ?",
    type: "rating",
  },
  {
    id: 2,
    question: "Comment as-tu trouvé la présentation d'AptiSkills ?",
    type: "rating",
  },
  {
    id: 3,
    question: "T'es-tu senti écouté ?",
    type: "rating",
  },
  {
    id: 4,
    question: "Qu'aimerais tu rajouter ?",
    type: "text",
  },
]

const emojiRatings = [
  { value: 1, emoji: "😞", label: "Très mécontent" },
  { value: 2, emoji: "😕", label: "Mécontent" },
  { value: 3, emoji: "😐", label: "Neutre" },
  { value: 4, emoji: "🙂", label: "Content" },
  { value: 5, emoji: "😄", label: "Très content" },
]

export default function EntretiensPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTitle, setShowTitle] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [feedbackAnswers, setFeedbackAnswers] = useState<{ [key: number]: any }>({})
  const [feedbackComments, setFeedbackComments] = useState<{ [key: number]: string }>({})
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedEntretien, setSelectedEntretien] = useState<any>(null)
  const [visibleStepDescription, setVisibleStepDescription] = useState<number | null>(candidatProgression.currentStep)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Effet de disparition du titre après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false)
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

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Confirmé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Terminé":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isStepCompleted = (stepId: number) => {
    return candidatProgression.completedSteps.includes(stepId)
  }

  const isStepCurrent = (stepId: number) => {
    return candidatProgression.currentStep === stepId
  }

  const getStepStatus = (stepId: number) => {
    if (isStepCompleted(stepId)) return "completed"
    if (isStepCurrent(stepId)) return "current"
    return "upcoming"
  }

  const handleRatingSelect = (questionId: number, rating: number) => {
    setFeedbackAnswers((prev) => ({ ...prev, [questionId]: rating }))
  }

  const handleCommentChange = (questionId: number, comment: string) => {
    setFeedbackComments((prev) => ({ ...prev, [questionId]: comment }))
  }

  const nextQuestion = () => {
    if (currentQuestion < feedbackQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitFeedback = () => {
    console.log("Feedback soumis:", { answers: feedbackAnswers, comments: feedbackComments })
    alert("Merci pour votre feedback !")
  }

  const handleShowDetails = (entretien: any) => {
    setSelectedEntretien(entretien)
    setShowContactModal(true)
  }

  const toggleStepDescription = (stepId: number) => {
    if (visibleStepDescription === stepId) {
      setVisibleStepDescription(null)
    } else {
      setVisibleStepDescription(stepId)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Video Hero Section - Plus grande */}
      <div ref={containerRef} className="relative h-[70vh] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay
        >
          <source
            src="https://steekstorage.blob.core.windows.net/steekcontainer/Paris.mp4?sp=racwdli&st=2024-11-22T14:27:33Z&se=2025-11-22T22:27:33Z&sv=2022-11-02&sr=c&sig=smRTTjHBpqQ0wTd6Kk2V4Ul3QPVpN88j30AhNo5ebxc%3D"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 transition-all duration-1000 ${
            showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MES <span className="text-[#ff7201]">ENTRETIENS</span>
          </h1>
          <p className="text-xl mb-6 max-w-2xl">
            Suivez vos entretiens et préparez-vous au mieux pour vos opportunités
          </p>
        </div>

        {/* Contrôles vidéo */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
            <Button
              onClick={toggleVideo}
              size="sm"
              className="bg-[#ff7201] hover:bg-[#e6650a] text-white rounded-full w-12 h-12 p-0"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>

            <Button
              onClick={toggleMute}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

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

      {/* Roadmap Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Votre parcours chez AptiSkills</h2>
            <p className="text-gray-600">Suivez votre progression à travers les étapes de recrutement</p>
          </div>

          {/* Roadmap horizontale */}
          <div className="relative mb-16">
            {/* Ligne de progression */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-[#ff7201] rounded-full transition-all duration-500"
                style={{
                  width: `${(candidatProgression.completedSteps.length / roadmapSteps.length) * 100}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-8 relative">
              {roadmapSteps.map((step, index) => {
                const status = getStepStatus(step.id)
                return (
                  <div key={step.id} className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10 transition-all duration-300 cursor-pointer ${
                        status === "completed" ? "bg-[#ff7201]" : status === "current" ? "bg-[#ff7201]" : "bg-gray-300"
                      }`}
                      onClick={() => toggleStepDescription(step.id)}
                    >
                      {status === "completed" ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : status === "current" ? (
                        step.id
                      ) : (
                        step.id
                      )}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-3 ${status === "current" ? "text-[#ff7201]" : "text-gray-400"}`}
                    >
                      {step.title}
                    </h3>
                    {/* Description visible pour l'étape sélectionnée */}
                    {visibleStepDescription === step.id && (
                      <div className="mt-4 p-4 bg-[#ff7201]/10 rounded-lg border-l-4 border-[#ff7201]">
                        <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cartes d'entretiens sous chaque étape */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roadmapSteps.map((step) => {
              const entretien = getEntretiensForStep(step.id, candidatProgression.poste)
              const status = getStepStatus(step.id)

              if (!entretien) return null

              return (
                <div key={step.id} className="space-y-4">
                  <Card
                    className={`transition-all duration-300 ${
                      status === "current"
                        ? "ring-2 ring-[#ff7201] shadow-lg"
                        : status === "completed"
                          ? "bg-green-50 border-green-200"
                          : "opacity-60"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getStatusColor(entretien.statut)}>{entretien.statut}</Badge>
                        <Badge variant="outline">{entretien.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{entretien.poste}</CardTitle>
                      <CardDescription className="font-medium text-[#ff7201]">{entretien.entreprise}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {entretien.date === "À définir" ? (
                          <span className="text-gray-400">À définir</span>
                        ) : (
                          new Date(entretien.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className={entretien.heure === "À définir" ? "text-gray-400" : ""}>
                          {entretien.heure}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs">{entretien.lieu}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span className={entretien.recruteur === "À définir" ? "text-gray-400" : ""}>
                          {entretien.recruteur}
                        </span>
                      </div>

                      <div className="pt-4">
                        <Button
                          className={`w-full ${
                            status === "current" ? "bg-[#ff7201] hover:bg-[#e6650a]" : "bg-gray-400 cursor-not-allowed"
                          }`}
                          disabled={status !== "current"}
                          onClick={() => status === "current" && handleShowDetails(entretien)}
                        >
                          {status === "completed"
                            ? "Entretien terminé"
                            : status === "current"
                              ? "Voir les détails"
                              : "En attente"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal de contact */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-md w-[95%] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-center text-lg font-bold text-gray-900">Je vais rencontrer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Photo et nom */}
            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Deborah BRUZZESE" />
                <AvatarFallback className="bg-[#ff7201] text-white text-lg font-bold">DB</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-gray-900">{contactInfo.nom}</h3>
              <p className="text-[#ff7201] font-medium text-sm">{contactInfo.poste}</p>
            </div>

            {/* Informations de contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-[#ff7201]" />
                <div>
                  <p className="text-xs text-gray-600">Téléphone</p>
                  <p className="font-medium text-sm">{contactInfo.telephone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <Mail className="h-4 w-4 text-[#ff7201]" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-medium text-xs">{contactInfo.email}</p>
                </div>
              </div>

              {/* Lien Teams */}
              {selectedEntretien?.type === "Distanciel" && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="h-4 w-4 text-blue-600" />
                    <p className="font-medium text-blue-900 text-sm">Visioconférence</p>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                    onClick={() => window.open(contactInfo.teamsLink, "_blank")}
                  >
                    Rejoindre Teams
                  </Button>
                  <p className="text-xs text-blue-600 mt-1 text-center">Activé 15 min avant l'entretien</p>
                </div>
              )}
            </div>

            {/* Informations sur l'entretien */}
            {selectedEntretien && (
              <div className="p-3 bg-[#ff7201]/10 rounded-lg border border-[#ff7201]/20">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Détails de l'entretien</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date :</span>
                    <span className="font-medium">
                      {selectedEntretien.date !== "À définir"
                        ? new Date(selectedEntretien.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "À définir"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Heure :</span>
                    <span className="font-medium">{selectedEntretien.heure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type :</span>
                    <span className="font-medium">{selectedEntretien.type}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 text-sm py-2"
                onClick={() => window.open(`tel:${contactInfo.telephone.replace(/\s/g, "")}`)}
              >
                <Phone className="h-3 w-3 mr-1" />
                Appeler
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-sm py-2"
                onClick={() => window.open(`mailto:${contactInfo.email}`)}
              >
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Survey */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Avant de nous revoir</h2>
            <p className="text-gray-600">Votre avis nous aide à améliorer notre processus de recrutement</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">{feedbackQuestions[currentQuestion].question}</h3>
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1}/{feedbackQuestions.length}
                </span>
              </div>

              {feedbackQuestions[currentQuestion].type === "rating" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    {emojiRatings.map((rating) => (
                      <button
                        key={rating.value}
                        onClick={() => handleRatingSelect(feedbackQuestions[currentQuestion].id, rating.value)}
                        className={`p-4 border-2 rounded-lg text-center transition-all hover:border-[#ff7201] ${
                          feedbackAnswers[feedbackQuestions[currentQuestion].id] === rating.value
                            ? "border-[#ff7201] bg-[#ff7201]/10"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="text-3xl mb-2">{rating.emoji}</div>
                        <div className="text-xs text-gray-600">{rating.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Partagez vos commentaires..."
                    value={feedbackAnswers[feedbackQuestions[currentQuestion].id] || ""}
                    onChange={(e) => handleRatingSelect(feedbackQuestions[currentQuestion].id, e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>
              )}

              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Des précisions à nous transmettre ? <span className="text-gray-500">(optionnel)</span>
                </label>
                <Textarea
                  placeholder="Ajoutez des détails si vous le souhaitez..."
                  value={feedbackComments[feedbackQuestions[currentQuestion].id] || ""}
                  onChange={(e) => handleCommentChange(feedbackQuestions[currentQuestion].id, e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>

                {currentQuestion === feedbackQuestions.length - 1 ? (
                  <Button onClick={submitFeedback} className="bg-[#ff7201] hover:bg-[#e6650a] text-white">
                    Envoyer
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className="bg-[#ff7201] hover:bg-[#e6650a] text-white flex items-center gap-2"
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

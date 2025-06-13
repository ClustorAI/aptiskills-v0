import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const temoignages = [
  {
    id: 1,
    nom: "Sarah Martinez",
    poste: "Développeuse Frontend",
    entreprise: "TechStart",
    photo: "/placeholder.svg?height=60&width=60",
    note: 5,
    commentaire:
      "Grâce à Aptiskills, j'ai pu décrocher le poste de mes rêves. L'accompagnement personnalisé et les conseils pratiques m'ont vraiment aidée à me démarquer lors des entretiens.",
    date: "2024-01-10",
  },
  {
    id: 2,
    nom: "Thomas Dubois",
    poste: "Chef de Projet IT",
    entreprise: "Digital Solutions",
    photo: "/placeholder.svg?height=60&width=60",
    note: 5,
    commentaire:
      "Une équipe exceptionnelle qui comprend vraiment les enjeux du marché. Ils m'ont aidé à repositionner mon profil et à négocier une augmentation de 30%.",
    date: "2024-01-05",
  },
  {
    id: 3,
    nom: "Marie Leroy",
    poste: "Data Scientist",
    entreprise: "AI Corp",
    photo: "/placeholder.svg?height=60&width=60",
    note: 5,
    commentaire:
      "Le processus de coaching était parfaitement adapté à mes besoins. J'ai appris à mieux valoriser mes compétences techniques et à communiquer efficacement.",
    date: "2023-12-28",
  },
  {
    id: 4,
    nom: "Antoine Bernard",
    poste: "Architecte Cloud",
    entreprise: "CloudTech",
    photo: "/placeholder.svg?height=60&width=60",
    note: 4,
    commentaire:
      "Très satisfait de l'accompagnement reçu. Les simulations d'entretiens m'ont permis de gagner en confiance et de décrocher plusieurs offres.",
    date: "2023-12-20",
  },
  {
    id: 5,
    nom: "Julie Moreau",
    poste: "Product Manager",
    entreprise: "InnovateLab",
    photo: "/placeholder.svg?height=60&width=60",
    note: 5,
    commentaire:
      "Une approche professionnelle et bienveillante. Aptiskills m'a accompagnée dans ma reconversion avec succès. Je recommande vivement leurs services.",
    date: "2023-12-15",
  },
  {
    id: 6,
    nom: "David Chen",
    poste: "DevOps Engineer",
    entreprise: "ScaleTech",
    photo: "/placeholder.svg?height=60&width=60",
    note: 5,
    commentaire:
      "Excellent suivi et conseils pertinents. L'équipe m'a aidé à identifier mes points forts et à les mettre en avant de manière convaincante.",
    date: "2023-12-10",
  },
]

export default function TemoignagesPage() {
  const renderStars = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < note ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ff7201] to-[#ff8533] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Témoignages</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Découvrez les success stories de nos candidats qui ont fait confiance à Aptiskills
          </p>
          <div className="flex items-center justify-center gap-8 text-lg">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div>Candidats accompagnés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div>Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">85%</div>
              <div>Taux de placement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos candidats</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leurs témoignages authentiques reflètent notre engagement à accompagner chaque candidat vers la réussite
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {temoignages.map((temoignage) => (
              <Card key={temoignage.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={temoignage.photo || "/placeholder.svg"} alt={temoignage.nom} />
                      <AvatarFallback>
                        {temoignage.nom
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{temoignage.nom}</h3>
                      <p className="text-sm text-[#ff7201] font-medium">{temoignage.poste}</p>
                      <p className="text-sm text-gray-600">{temoignage.entreprise}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">{renderStars(temoignage.note)}</div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#ff7201] opacity-20" />
                    <p className="text-gray-700 italic pl-6">{temoignage.commentaire}</p>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    {new Date(temoignage.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à écrire votre success story ?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Rejoignez les centaines de candidats qui ont fait confiance à Aptiskills pour booster leur carrière
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#ff7201] hover:bg-[#e6650a] text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Commencer mon accompagnement
            </button>
            <button className="border border-[#ff7201] text-[#ff7201] hover:bg-[#ff7201] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

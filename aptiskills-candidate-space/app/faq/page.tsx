"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const faqData = [
  {
    id: 1,
    question: "Comment remplir mon profil ?",
    reponse:
      "Pour remplir votre profil suivez ces étapes:\n\n1- Cliquez sur \"Mon Profil\" pour mettre à jour vos informations. Sinon, vous pouvez importer votre CV, un dossier de compétence déjà réalisé pour un autre cabinet de conseil et ceci remplira automatiquement votre dossier de compétences. Vous n'aurez plus qu'à l'affiner.\n\n2- Vérifiez vos informations avant d'enregistrer vos données.",
  },
  {
    id: 2,
    question: "Quels documents dois-je mettre pour ma candidature ?",
    reponse:
      "À partir de l'étape \"Dernière ligne droite\" vous pouvez joindre les documents suivants:\n\n1- Copie de votre carte d'identité (carte de séjour et/ou de travail et passeport si vous êtes de nationalité étrangère)\n\n2- Copie de votre permis de conduire si besoin\n\n3- Copie de votre attestation CPAM\n\n4- Un Relevé d'Identité Bancaire\n\n5- Une copie de vos diplômes",
  },
  {
    id: 3,
    question: "Qui puis-je contacter si j'ai des questions sur ma candidature ?",
    reponse:
      'Vous pouvez joindre votre recruteur par email ou téléphone. Ses coordonnées se trouvent dans la section "Je vais rencontrer" de la page "Mes entretiens", accessible à partir de la page d\'accueil ou de la barre de navigation.',
  },
  {
    id: 4,
    question: "Comment accéder à mes entretiens ?",
    reponse:
      "Vous pouvez y accéder à partir de la page d'accueil ou à partir de la barre de navigation en haut à droite, sur cette page vous pourrez visualiser l'emplacement de l'agence, l'accès, et les personnes que vous allez rencontrer.",
  },
  {
    id: 5,
    question: "Comment envoyer mon feedback ?",
    reponse:
      "Sur la page \"Mes entretiens,\" vous avez la possibilité de nous faire part de votre feedback à chaque étape de votre parcours d'entretien. Nous vous encourageons à nous faire part de vos commentaires, et n'hésitez pas à vous exprimer librement, vos réponses seront anonymes.",
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const formatReponse = (reponse: string) => {
    return reponse.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < reponse.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ff7201] to-[#ff8533] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Foire Aux Questions</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur votre parcours candidat
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqData.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="h-5 w-5 text-[#ff7201] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#ff7201] flex-shrink-0" />
                    )}
                  </button>

                  {openItems.includes(item.id) && (
                    <div className="px-6 pb-6">
                      <div className="border-t pt-4">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {formatReponse(item.reponse)}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vous ne trouvez pas la réponse à votre question ?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-[#ff7201] bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-[#ff7201]" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">recrutement.france@aptiskills.fr</p>
            </div>

            <div className="text-center">
              <div className="bg-[#ff7201] bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-[#ff7201]" />
              </div>
              <h3 className="font-semibold mb-2">Téléphone</h3>
              <p className="text-gray-600">06 37 28 60 15</p>
            </div>

            <div className="text-center">
              <div className="bg-[#ff7201] bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-[#ff7201]" />
              </div>
              <h3 className="font-semibold mb-2">Support candidat</h3>
              <p className="text-gray-600">Disponible 9h-18h</p>
            </div>
          </div>

          <Button className="bg-[#ff7201] hover:bg-[#e6650a] text-white px-8 py-3 text-lg">Nous contacter</Button>
        </div>
      </div>
    </div>
  )
}

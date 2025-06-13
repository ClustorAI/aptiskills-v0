"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    adresse: "Paris, France",
    dateNaissance: "1990-05-15",
    posteActuel: "Développeur Full Stack",
    entreprise: "Tech Solutions",
    formation: "Master en Informatique",
    competences: "React, Node.js, Python, SQL",
    bio: "Développeur passionné avec 5 ans d'expérience dans le développement web.",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Ici on sauvegarderait les données
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-2">Gérez vos informations personnelles et professionnelles</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Informations personnelles */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#ff7201]" />
                  Informations personnelles
                </CardTitle>
                <CardDescription>Vos données personnelles</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Annuler" : "Modifier"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    value={profile.prenom}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    value={profile.nom}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <Input
                    id="telephone"
                    value={profile.telephone}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="adresse">Adresse</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <Input
                    id="adresse"
                    value={profile.adresse}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, adresse: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dateNaissance">Date de naissance</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={profile.dateNaissance}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, dateNaissance: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations professionnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#ff7201]" />
                Informations professionnelles
              </CardTitle>
              <CardDescription>Votre parcours professionnel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="posteActuel">Poste actuel</Label>
                <Input
                  id="posteActuel"
                  value={profile.posteActuel}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, posteActuel: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="entreprise">Entreprise</Label>
                <Input
                  id="entreprise"
                  value={profile.entreprise}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, entreprise: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="formation">Formation</Label>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <Input
                    id="formation"
                    value={profile.formation}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, formation: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="competences">Compétences</Label>
                <Input
                  id="competences"
                  value={profile.competences}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, competences: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="bio">Présentation</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave} className="bg-[#ff7201] hover:bg-[#e6650a]">
              Sauvegarder
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

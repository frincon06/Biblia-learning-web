import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Flame } from "lucide-react"
import { calculateUserLevel } from "@/lib/gamification"

export default async function AppHomePage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Obtener los cursos
  const { data: courses } = await supabase.from("courses").select("*").order("sort_order", { ascending: true })

  // Obtener el progreso del usuario
  const { data: userProgress } = await supabase.from("user_progress").select("*").eq("user_id", session.user.id)

  // Calcular XP total
  const totalXp = userProgress?.reduce((total, progress) => total + (progress.xp_earned || 0), 0) || 0

  // Calcular nivel
  const { level } = calculateUserLevel(totalXp)

  // Calcular racha (simulado)
  const streak = Math.floor(Math.random() * 10) + 1

  // Obtener cursos recientes
  const recentCourses = courses?.slice(0, 3) || []

  return (
    <div className="space-y-6 pb-16">
      {/* Tarjeta de bienvenida */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido a Sagrapp!</h1>
          <p className="opacity-90">Continúa tu viaje de aprendizaje bíblico.</p>

          <div className="mt-4 flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Racha actual</p>
              <p className="text-xl font-bold">{streak} días</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progreso del usuario */}
      <div>
        <h2 className="text-xl font-bold mb-3">Tu progreso</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="bg-purple-100 text-purple-700 rounded-full p-2 mr-3">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nivel actual</p>
                  <p className="text-xl font-bold">{level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">XP Total</p>
                <p className="text-xl font-bold">{totalXp}</p>
              </div>
            </div>
            <Progress value={50} className="h-2 mt-2" />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {totalXp} / {totalXp + 100} XP para el nivel {level + 1}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cursos recientes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Continuar aprendiendo</h2>
          <Link href="/app/courses" className="text-sm text-purple-600 font-medium">
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-32 bg-gray-200 relative">
                {course.image_url ? (
                  <img
                    src={course.image_url || "/placeholder.svg?height=128&width=256"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                <Link href={`/app/courses/${course.id}`}>
                  <Button className="w-full">Continuar</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

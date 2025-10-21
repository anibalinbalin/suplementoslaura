import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Zap,
  Heart,
  CheckCircle,
  Sparkles,
  Target,
  FlaskConical
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50/30">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl font-display">Suplementos+</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/about"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Nosotros
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container px-4 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center space-y-8 fade-in">
            <Badge variant="outline" className="mx-auto">
              <Shield className="mr-1 h-3 w-3" />
              Basado en ciencia
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display">
              Suplementos personalizados
              <span className="block mt-2 text-gradient">
                para tu salud
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Recomendaciones personalizadas basadas en tus objetivos o análisis de sangre.
              Respaldado por evidencia científica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/gender-selection">
                <Button size="lg" className="group">
                  <Target className="mr-2 h-5 w-5" />
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/analisis-sangre">
                <Button size="lg" variant="outline" className="group">
                  <FlaskConical className="mr-2 h-5 w-5" />
                  Análisis de sangre
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Sin registro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>100% privado</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container px-4 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                ¿Cómo funciona?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tres pasos simples para obtener tus recomendaciones personalizadas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  number: "01",
                  title: "Elige tu método",
                  description: "Selecciona entre objetivos de salud o análisis de sangre según tu preferencia.",
                },
                {
                  icon: Zap,
                  number: "02",
                  title: "Responde preguntas",
                  description: "Completa un breve cuestionario sobre tu salud, edad, género y objetivos.",
                },
                {
                  icon: Heart,
                  number: "03",
                  title: "Recibe recomendaciones",
                  description: "Obtén un plan personalizado con dosis, horarios y marcas disponibles en Uruguay.",
                },
              ].map((feature, index) => (
                <Card key={index} className="hover-lift border-border/50">
                  <CardHeader>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-5xl font-bold text-muted-foreground/20 font-display">
                          {feature.number}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Two Methods Section */}
        <section className="container px-4 py-20 md:py-28 bg-gradient-to-b from-stone-50/30 to-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Dos formas de comenzar
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Elige el método que mejor se adapte a tu situación
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Health Goals Method */}
              <Card className="hover-lift">
                <div className="h-2 bg-gradient-to-r from-primary to-accent rounded-t-2xl" />
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Por Objetivos de Salud</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Ideal si tienes metas específicas como mejorar energía, desarrollar músculo o fortalecer tu sistema inmune.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Proceso guiado paso a paso",
                      "Considera tu edad y género",
                      "Múltiples objetivos simultáneos",
                      "Restricciones dietéticas incluidas"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/gender-selection" className="block pt-4">
                    <Button className="w-full" size="lg">
                      Comenzar cuestionario
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Blood Analysis Method */}
              <Card className="hover-lift">
                <div className="h-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-t-2xl" />
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center">
                      <FlaskConical className="h-7 w-7 text-rose-600" />
                    </div>
                    <Badge variant="destructive">Nuevo</Badge>
                  </div>
                  <CardTitle className="text-2xl">Por Análisis de Sangre</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Recomendaciones precisas basadas en tus valores de laboratorio reales.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Detecta deficiencias nutricionales",
                      "Vitaminas: D, B12, A, E, K",
                      "Minerales: Hierro, Calcio, Magnesio",
                      "Análisis de indicadores metabólicos"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/analisis-sangre" className="block pt-4">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700" size="lg">
                      Analizar resultados
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl md:text-4xl font-display">
                  ¿Listo para comenzar?
                </CardTitle>
                <CardDescription className="text-lg mt-4">
                  Obtén tus recomendaciones personalizadas en menos de 5 minutos
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/gender-selection">
                  <Button size="xl" className="min-w-[200px]">
                    <Target className="mr-2 h-5 w-5" />
                    Comenzar ahora
                  </Button>
                </Link>
                <Link href="/privacidad">
                  <Button size="xl" variant="outline" className="min-w-[200px]">
                    Ver política de privacidad
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-stone-50/50">
        <div className="container px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl font-display">Suplementos+</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm">
                Ayudando a los uruguayos a encontrar los suplementos adecuados
                para sus necesidades de salud, basado en evidencia científica.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                {[
                  { href: "/about", label: "Acerca de" },
                  { href: "/contact", label: "Contacto" },
                  { href: "/terms", label: "Términos" },
                  { href: "/privacy", label: "Privacidad" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                {[
                  { href: "#", label: "Blog" },
                  { href: "#", label: "FAQs" },
                  { href: "#", label: "Guías" },
                  { href: "#", label: "Soporte" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Suplementos+. Todos los derechos reservados.
              </p>
              <p className="text-xs text-muted-foreground max-w-md text-center md:text-right">
                Esta información es solo para fines educativos. Consulte con un profesional de salud
                antes de comenzar cualquier suplementación.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

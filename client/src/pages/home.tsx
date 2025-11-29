import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Sprout, Trophy, Users } from "lucide-react";
import heroImage from "@assets/generated_images/vibrant_hero_illustration_of_students_engaging_in_sustainable_activities_like_planting_and_solar_energy..png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-muted/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in slide-in-from-left-10 duration-700">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="mr-2">🌿</span> Start your eco-journey today
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-foreground">
                Learn Sustainable Living, <br />
                <span className="text-primary">One Green Step</span> at a Time
              </h1>
              <p className="text-xl text-muted-foreground md:max-w-lg">
                Interactive lessons, eco-projects, and resources that help you build a sustainable lifestyle and make a real impact.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/auth">
                  <Button size="lg" className="text-lg h-12 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" variant="outline" className="text-lg h-12 px-8 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white">
                    Browse Projects
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right-10 duration-700 delay-100">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl -z-10" />
              <img 
                src={heroImage}
                alt="Students learning about sustainability" 
                className="rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to make a difference</h2>
            <p className="text-muted-foreground text-lg">Our platform provides the tools and knowledge to turn eco-anxiety into eco-action.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6 text-blue-500" />}
              title="Interactive Lessons"
              description="Engaging bite-sized content to help you understand complex environmental topics."
              color="bg-blue-50"
            />
            <FeatureCard 
              icon={<Sprout className="h-6 w-6 text-green-500" />}
              title="Eco Project Ideas"
              description="Real-world activities you can do at home or school to reduce your footprint."
              color="bg-green-50"
            />
            <FeatureCard 
              icon={<Trophy className="h-6 w-6 text-yellow-500" />}
              title="Goal Tracking"
              description="Set personal sustainability goals and earn badges as you progress."
              color="bg-yellow-50"
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6 text-purple-500" />}
              title="Community Impact"
              description="Join a movement of students working together for a greener planet."
              color="bg-purple-50"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />

            <StepCard 
              number="01"
              title="Create Profile"
              description="Sign up and set your baseline eco-score."
            />
            <StepCard 
              number="02"
              title="Learn & Grow"
              description="Complete lessons and unlock new sustainability skills."
            />
            <StepCard 
              number="03"
              title="Take Action"
              description="Apply your knowledge in real life and track your impact."
            />
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Topics</h2>
              <p className="text-muted-foreground">Explore our most popular sustainability categories.</p>
            </div>
            <Link href="/lessons">
              <Button variant="outline" className="hidden md:flex">View All Topics</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Renewable Energy', 'Waste Reduction', 'Eco-Lifestyle', 'Water Conservation'].map((topic, i) => (
              <div key={topic} className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity opacity-80 group-hover:opacity-90`} />
                <img 
                  src={`https://images.unsplash.com/photo-${[
                    '1509391366360-2e959784a276', // Solar
                    '1532996122724-e3c354a0b15b', // Waste
                    '1542601906990-b4d3fb778b09', // Lifestyle
                    '1581081267720-1c53d9698e35'  // Water
                  ][i]}?auto=format&fit=crop&q=80`} 
                  alt={topic}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-xl font-bold mb-1">{topic}</h3>
                  <p className="text-white/80 text-sm translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Start learning →
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 md:hidden">
            <Link href="/lessons">
              <Button variant="outline" className="w-full">View All Topics</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to make a change?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already making their schools and homes more sustainable.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-10 rounded-full shadow-xl">
              Join GreenSteps Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: any) {
  return (
    <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow duration-300">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: any) {
  return (
    <div className="bg-background p-8 rounded-2xl border shadow-sm text-center relative z-10">
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

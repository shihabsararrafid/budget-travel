import { Navigation } from "@/components/navigation"
import { BudgetSearch } from "@/components/budget-search"
import { DestinationCards } from "@/components/destination-cards"
import { ChatBot } from "@/components/chatbot"
import { ExpenseEstimator } from "@/components/expense-estimator"
import { ImageTranslator } from "@/components/image-translator"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Discover Amazing Destinations
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">
                Within Your Budget
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              Stop browsing expensive options you can&apos;t afford. Find tourist places, activities, 
              and complete travel experiences tailored to your financial limits.
            </p>
            
            <BudgetSearch />
          </div>
        </section>

        <section id="destinations" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              Recommended Destinations
            </h2>
            <DestinationCards />
          </div>
        </section>

        <section id="chat" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              AI Travel Assistant
            </h2>
            <ChatBot />
          </div>
        </section>

        <section id="tools" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              Travel Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ExpenseEstimator />
              <ImageTranslator />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

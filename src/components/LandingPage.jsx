import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'

const FAQ_DATA = [
  {
    question: 'Is this free?',
    answer: "Yes! We're currently in beta testing and it's completely free."
  },
  {
    question: 'What features are coming?',
    answer: "We're building a startup directory where startups can post jobs and connect with developers and talent."
  },
  {
    question: 'Do I need to login?',
    answer: "Not for now. Your data is stored in cookies, so if you clear your cookies, your data will be lost. Once we exit beta, you'll be able to create an account and your data will be saved securely."
  }
]

function FAQItem({ question, answer, isOpen, onClick, isDarkMode }) {
  return (
    <div
      className={`rounded-card overflow-hidden transition-all duration-300 ${
        isDarkMode ? 'bg-dark-card' : 'bg-card'
      } ${isOpen ? (isDarkMode ? 'shadow-dark-card-hover' : 'shadow-card-hover') : (isDarkMode ? 'shadow-dark-card' : 'shadow-card')}`}
    >
      <button
        onClick={onClick}
        className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
          isDarkMode ? 'hover:bg-dark-card-hover' : 'hover:bg-gray-50'
        }`}
      >
        <span className={`font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`} />
        ) : (
          <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className={`px-6 pb-4 text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function LandingPage({ onStartTracking, isDarkMode }) {
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-dark-background' : 'bg-background'
    }`}>
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={isDarkMode ? '/logo-dark.png' : '/logo-light.png'}
              alt="Squirrel"
              className="h-20 md:h-24 w-auto"
            />
          </div>

          {/* Brand Name */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
            isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
          }`}>
            Squirrel
          </h1>

          {/* Tagline */}
          <p className={`text-xl md:text-2xl mb-8 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            The easiest job tracker available
          </p>

          {/* CTA Button */}
          <button
            onClick={onStartTracking}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-button text-lg font-medium text-white transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-dark-accent hover:shadow-dark-card-hover'
                : 'bg-accent hover:shadow-card-hover'
            }`}
          >
            Start Tracking Jobs
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>

        {/* Coming Soon Section */}
        <section className="mb-16 md:mb-24">
          <div className={`rounded-modal p-8 text-center transition-colors duration-300 ${
            isDarkMode ? 'bg-dark-card shadow-dark-card' : 'bg-card shadow-card'
          }`}>
            <h2 className={`text-xl font-semibold mb-3 ${
              isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
            }`}>
              New Features Coming Soon
            </h2>
            <p className={`mb-4 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
              Startup directory, investor tools, and more...
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
              Have feedback? Let me know what you think{' '}
              <a
                href="https://x.com/ItsHB17"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium underline transition-colors ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                @ItsHB17
              </a>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className={`text-xl font-semibold mb-6 text-center ${
            isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
          }`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => toggleFAQ(index)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`mt-16 pt-8 border-t text-center text-sm ${
          isDarkMode ? 'border-dark-border text-dark-text-secondary' : 'border-border text-text-secondary'
        }`}>
          <p>Built with care for job seekers everywhere</p>
        </footer>
      </div>
    </div>
  )
}

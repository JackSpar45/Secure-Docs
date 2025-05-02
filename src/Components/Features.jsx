// Features.jsx
import React from 'react'
import CardContainer from './Card'

function Features() {
  return (
    <section className="w-full overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <h1 className='text-3xl md:text-4xl lg:text-[45px] font-bold text-blue-900 text-center mb-8 md:mb-12'>
          Features
        </h1>

        {/* Cards Grid */}
        <CardContainer/>

        {/* Footer */}
        <footer className="mt-16 md:mt-24 bg-gray-100 rounded-lg p-4 md:p-6 text-center">
          <p className="text-sm md:text-base text-gray-600">
            &copy; 2024 Secure-Docs. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Features



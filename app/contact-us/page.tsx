import React from 'react'

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="text-center space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
          NAME: <span className="text-gray-600">M.V.SAKETH</span>
        </h2>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
          PHONE: <span className="text-gray-600">7013230003</span>
        </h2>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
          EMAIL: <span className="text-gray-600">mvsaketh2020@gmail.com</span>
        </h2>
      </div>
    </div>
  )
}

export default Contact

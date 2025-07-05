import React from 'react'


function MessageTemplate({message}: {message: string}) {
    return (
        <div className="message h-[600px] w-[600px] relative">
            {/* Subtle shadow effect */}
            <div className="absolute inset-0 bg-gray-300 rounded-[100px] blur-lg opacity-20"></div>
            
            {/* Main card container */}
            <div className="relative h-full w-full rounded-[100px] shadow-lg border overflow-hidden">
                
                {/* Header section */}
                <div className="flex items-center justify-center h-[150px] rounded-t-[100px] bg-black text-white relative overflow-hidden">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-8 left-8 w-1 h-1 bg-white rounded-full"></div>
                        <div className="absolute top-16 left-20 w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                        <div className="absolute top-12 right-16 w-1 h-1 bg-gray-200 rounded-full"></div>
                        <div className="absolute bottom-12 left-12 w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                        <div className="absolute bottom-8 right-8 w-1 h-1 bg-gray-200 rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-poppins)] tracking-tight">
                            The Secret Jar 
                        </h1>
                        {/* <div className="mt-2 h-0.5 w-16 mx-auto bg-gray-300 rounded-full"></div> */}
                    </div>
                </div>
                
                {/* Message content section */}
                <div className="flex items-center justify-center h-[450px] rounded-b-[100px] bg-white relative overflow-hidden p-8">
                    {/* Subtle background decoration */}
                    <div className="absolute top-8 right-8 w-20 h-20 bg-gray-100 rounded-full opacity-30"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 bg-gray-50 rounded-full opacity-40"></div>
                    
                    <div className="relative z-10 text-center max-w-full">
                        <p className="text-gray-800 text-xl font-semibold leading-relaxed font-[family-name:var(--font-poppins)] tracking-wide break-words hyphens-auto line-clamp-[11] p-1">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default MessageTemplate
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
                    <div className="relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-poppins)] tracking-tight">
                            The Secret Jar 
                        </h1>
                    </div>
                </div>
                
                {/* Message content section */}
                <div className="flex items-center justify-center h-[450px] rounded-b-[100px] bg-white relative overflow-hidden p-4">                    
                    <div className="relative z-10 text-center max-w-full">
                        <p className="text-gray-800 text-2xl font-semibold leading-relaxed font-[family-name:var(--font-poppins)] tracking-wide break-words hyphens-auto line-clamp-[11] p-1">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default MessageTemplate
import { Button } from "./ui/button"

import {
  Brain,
} from "lucide-react"

function Header() {
    return (
        <nav className="border-b border-teal-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-teal-800">SunshineV2</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-teal-700 hover:text-teal-900 transition-colors font-medium">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-teal-700 hover:text-teal-900 transition-colors font-medium">
                            How It Works
                        </a>
                        <a href="#pricing" className="text-teal-700 hover:text-teal-900 transition-colors font-medium">
                            Pricing
                        </a>
                        <Button className="bg-orange-400 hover:bg-orange-500 text-white border-0">Connect Wallet</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Zap, Shield, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white p-6">
      {/* Hero Section */}
      <div className="text-center pt-16 pb-8">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <Wifi className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          DataShare
        </h1>
        <p className="text-gray-300 text-lg mb-2">The UPI for Mobile Data</p>
        <p className="text-gray-400 text-sm px-4">
          Share, gift, and trade mobile data instantly with anyone, anywhere
        </p>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-12">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-semibold">Instant Transfer</h3>
              <p className="text-gray-400 text-sm">Send data in seconds via QR or phone number</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold">Secure & Safe</h3>
              <p className="text-gray-400 text-sm">Bank-grade security for all transactions</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold">Community Rewards</h3>
              <p className="text-gray-400 text-sm">Earn points and benefits for sharing</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/login')}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl text-lg"
        >
          Get Started
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-white/20 text-white hover:bg-white/10 py-4 rounded-2xl"
        >
          Learn More
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>Join 100K+ users sharing data worldwide</p>
      </div>
    </div>
  );
};

export default Index;

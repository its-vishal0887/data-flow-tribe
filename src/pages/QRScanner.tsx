
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, Flashlight, FlashlightOff } from "lucide-react";

const QRScanner = () => {
  const [flashOn, setFlashOn] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-semibold">Scan QR Code</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setFlashOn(!flashOn)}
          className="text-white hover:bg-white/10"
        >
          {flashOn ? <FlashlightOff className="w-4 h-4" /> : <Flashlight className="w-4 h-4" />}
        </Button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative w-80 h-80">
          {/* Scanner Frame */}
          <div className="w-full h-full border-2 border-white/20 rounded-3xl relative overflow-hidden">
            {/* Corner Indicators */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-cyan-400 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-r-4 border-t-4 border-cyan-400 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-4 border-b-4 border-cyan-400 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-cyan-400 rounded-br-lg"></div>
            
            {/* Scanning Line Animation */}
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
            
            {/* Camera Placeholder */}
            <div className="w-full h-full bg-black/50 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-white/30" />
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute -bottom-16 left-0 right-0 text-center">
            <p className="text-white/80">Position the QR code within the frame</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6 space-y-4">
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Scan a QR code to send data instantly or share your QR code for others to send you data.
          </p>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 h-14 text-lg font-semibold"
          onClick={() => navigate('/transfer')}
        >
          <QrCode className="w-5 h-5 mr-2" />
          Show My QR Code
        </Button>

        <Button 
          variant="outline" 
          className="w-full border-white/20 text-white hover:bg-white/10 h-12"
          onClick={() => navigate('/transfer')}
        >
          Enter Details Manually
        </Button>
      </div>
    </div>
  );
};

export default QRScanner;

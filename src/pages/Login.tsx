
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to +91 ${phoneNumber}`
      });
    }, 2000);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome to DataShare!",
        description: "Login successful"
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => step === "otp" ? setStep("phone") : navigate('/')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-semibold">
          {step === "phone" ? "Enter Mobile" : "Verify OTP"}
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Content */}
      <div className="max-w-sm mx-auto">
        {step === "phone" ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-gray-400">Enter your mobile number to continue</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-16 h-14 text-lg"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  +91
                </div>
              </div>

              <Button 
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 h-14 text-lg font-semibold"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
              <p className="text-gray-400">
                We've sent a 6-digit code to<br />
                <span className="text-white">+91 {phoneNumber}</span>
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg text-center tracking-widest"
                maxLength={6}
              />

              <Button 
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-14 text-lg font-semibold"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </Button>

              <Button 
                variant="ghost" 
                className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-white/5"
              >
                Resend OTP in 30s
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-8 text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default Login;

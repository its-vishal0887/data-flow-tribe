
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, QrCode, Phone, User, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Transfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<"MB" | "GB">("MB");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickAmounts: { value: number; unit: "MB" | "GB" }[] = [
    { value: 100, unit: "MB" },
    { value: 500, unit: "MB" },
    { value: 1, unit: "GB" },
    { value: 2, unit: "GB" }
  ];

  const handleQuickAmount = (value: number, selectedUnit: "MB" | "GB") => {
    setAmount(value.toString());
    setUnit(selectedUnit);
  };

  const handleSend = async () => {
    if (!recipient || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter recipient and amount",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Data Sent Successfully!",
        description: `${amount} ${unit} sent to ${recipient}`
      });
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-semibold">Send Data</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/qr-scanner')}
          className="text-white hover:bg-white/10"
        >
          <QrCode className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Recipient Input */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Send To</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Phone number or username"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 h-12"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <User className="w-4 h-4 mr-2" />
                Contacts
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <QrCode className="w-4 h-4 mr-2" />
                Scan QR
              </Button>
            </div>
          </div>
        </Card>

        {/* Amount Input */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Amount</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-16 text-2xl font-bold text-center"
                />
              </div>
              
              <div className="flex bg-white/5 rounded-lg overflow-hidden">
                <Button
                  variant={unit === "MB" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setUnit("MB")}
                  className={`${unit === "MB" ? "bg-cyan-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  MB
                </Button>
                <Button
                  variant={unit === "GB" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setUnit("GB")}
                  className={`${unit === "GB" ? "bg-cyan-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  GB
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((qa, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(qa.value, qa.unit)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {qa.value} {qa.unit}
                </Button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-400">
              ≈ ₹{amount ? (parseFloat(amount) * (unit === "GB" ? 30 : 0.03)).toFixed(2) : "0.00"} value
            </div>
          </div>
        </Card>

        {/* Message (Optional) */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Message (Optional)</h2>
          <Input
            placeholder="Add a note..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12"
          />
        </Card>

        {/* Send Button */}
        <Button 
          onClick={handleSend}
          disabled={loading || !recipient || !amount}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 h-14 text-lg font-semibold"
        >
          {loading ? "Sending..." : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send {amount} {unit}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Transfer;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Edit
} from "lucide-react";

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoShare, setAutoShare] = useState(false);
  const navigate = useNavigate();

  const profileStats = [
    { label: "Total Shared", value: "12.5 GB", color: "text-green-400" },
    { label: "Total Received", value: "8.2 GB", color: "text-blue-400" },
    { label: "Friends Helped", value: "47", color: "text-purple-400" },
    { label: "Reward Points", value: "2,450", color: "text-yellow-400" }
  ];

  const menuItems = [
    { icon: Phone, label: "Phone Number", value: "+91 9876543210", action: () => {} },
    { icon: CreditCard, label: "Payment Methods", action: () => navigate('/payment') },
    { icon: Bell, label: "Notifications", toggle: true, value: notifications, onChange: setNotifications },
    { icon: Shield, label: "Auto Share Limit", toggle: true, value: autoShare, onChange: setAutoShare },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
    { icon: Shield, label: "Privacy Policy", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-semibold">Profile</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-white/10 backdrop-blur-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Alex Thompson</h2>
            <p className="text-gray-300">@alexthompson</p>
            <p className="text-sm text-gray-400">Member since March 2024</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {profileStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item, index) => (
          <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-lg">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-all"
              onClick={item.action}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <p className="font-medium">{item.label}</p>
                  {item.value && <p className="text-sm text-gray-400">{item.value}</p>}
                </div>
              </div>
              
              {item.toggle ? (
                <Switch
                  checked={item.value as boolean}
                  onCheckedChange={item.onChange as (checked: boolean) => void}
                />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* App Info */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg p-4 mb-6">
        <div className="text-center text-sm text-gray-400 space-y-1">
          <p>DataShare v2.1.0</p>
          <p>Build 2024.3.15</p>
        </div>
      </Card>

      {/* Logout Button */}
      <Button 
        variant="outline"
        className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 h-12"
        onClick={() => {
          // Handle logout
          navigate('/');
        }}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>

      <div className="h-20"></div>
    </div>
  );
};

export default Profile;

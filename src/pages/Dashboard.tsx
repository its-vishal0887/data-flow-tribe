
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  QrCode, 
  History, 
  Gift, 
  TrendingUp, 
  Wifi,
  Eye,
  EyeOff,
  Bell,
  User
} from "lucide-react";

const Dashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const navigate = useNavigate();

  const quickActions = [
    { icon: Send, label: "Send Data", action: () => navigate('/transfer'), color: "from-cyan-500 to-blue-500" },
    { icon: QrCode, label: "QR Pay", action: () => navigate('/qr-scanner'), color: "from-purple-500 to-pink-500" },
    { icon: History, label: "History", action: () => navigate('/history'), color: "from-green-500 to-teal-500" },
    { icon: Gift, label: "Rewards", action: () => navigate('/rewards'), color: "from-orange-500 to-red-500" }
  ];

  const recentTransactions = [
    { id: 1, type: "sent", amount: "500 MB", to: "John Doe", time: "2 mins ago", status: "completed" },
    { id: 2, type: "received", amount: "1.2 GB", from: "Sarah Wilson", time: "1 hour ago", status: "completed" },
    { id: 3, type: "sent", amount: "200 MB", to: "Mike Johnson", time: "3 hours ago", status: "completed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Good morning</p>
            <p className="font-semibold">Alex Thompson</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} className="text-white hover:bg-white/10">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-white/10 backdrop-blur-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300">Available Balance</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="text-white hover:bg-white/10"
            >
              {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="text-3xl font-bold mb-2">
            {balanceVisible ? "4.2 GB" : "••••"}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span>₹ 120.50 value</span>
            <span className="flex items-center text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1% this week
            </span>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl"
              variant="ghost"
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-300">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/history')}
            className="text-cyan-400 hover:text-cyan-300 hover:bg-white/5"
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="bg-white/5 border-white/10 backdrop-blur-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'sent' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    <Send className={`w-4 h-4 ${transaction.type === 'sent' ? 'rotate-45' : 'rotate-225'}`} />
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'sent' ? 'Sent to' : 'Received from'} {transaction.to || transaction.from}
                    </p>
                    <p className="text-sm text-gray-400">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {transaction.type === 'sent' ? '-' : '+'}{transaction.amount}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{transaction.status}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Dashboard;

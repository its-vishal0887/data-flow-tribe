
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const History = () => {
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const transactions = [
    { id: 1, type: "sent", amount: "500 MB", to: "John Doe", phone: "+91 9876543210", time: "Today, 2:30 PM", status: "completed" },
    { id: 2, type: "received", amount: "1.2 GB", from: "Sarah Wilson", phone: "+91 9876543211", time: "Today, 1:15 PM", status: "completed" },
    { id: 3, type: "sent", amount: "200 MB", to: "Mike Johnson", phone: "+91 9876543212", time: "Yesterday, 6:45 PM", status: "completed" },
    { id: 4, type: "received", amount: "800 MB", from: "Emma Davis", phone: "+91 9876543213", time: "Yesterday, 4:20 PM", status: "completed" },
    { id: 5, type: "sent", amount: "1.5 GB", to: "David Lee", phone: "+91 9876543214", time: "2 days ago", status: "completed" },
    { id: 6, type: "received", amount: "300 MB", from: "Lisa Zhang", phone: "+91 9876543215", time: "3 days ago", status: "failed" },
    { id: 7, type: "sent", amount: "2 GB", to: "Alex Brown", phone: "+91 9876543216", time: "1 week ago", status: "completed" }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === "all" || transaction.type === filter;
    const matchesSearch = searchTerm === "" || 
      (transaction.to && transaction.to.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.from && transaction.from.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { key: "all", label: "All", count: transactions.length },
    { key: "sent", label: "Sent", count: transactions.filter(t => t.type === "sent").length },
    { key: "received", label: "Received", count: transactions.filter(t => t.type === "received").length }
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
        <h1 className="text-xl font-semibold">Transaction History</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 h-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {filterOptions.map((option) => (
          <Button
            key={option.key}
            variant={filter === option.key ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(option.key as "all" | "sent" | "received")}
            className={`${
              filter === option.key 
                ? "bg-cyan-500 text-white" 
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {option.label} ({option.count})
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="bg-white/5 border-white/10 backdrop-blur-lg p-4 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.type === 'sent' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  <Send className={`w-5 h-5 ${transaction.type === 'sent' ? 'rotate-45' : 'rotate-225'}`} />
                </div>
                <div>
                  <p className="font-medium">
                    {transaction.type === 'sent' ? transaction.to : transaction.from}
                  </p>
                  <p className="text-sm text-gray-400">
                    {transaction.phone}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-lg ${
                  transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {transaction.type === 'sent' ? '-' : '+'}{transaction.amount}
                </p>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <p className={`text-xs capitalize ${
                    transaction.status === 'completed' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-400">No transactions found</p>
        </div>
      )}

      <div className="h-20"></div>
    </div>
  );
};

export default History;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Gift, Star, Trophy, Users, Copy, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Rewards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const referralCode = "ALEX2024";
  const currentPoints = 2450;
  const nextTierPoints = 3000;
  const progress = (currentPoints / nextTierPoints) * 100;

  const achievements = [
    { id: 1, title: "First Share", description: "Send your first data", points: 100, completed: true },
    { id: 2, title: "Data Donor", description: "Share 1GB of data", points: 200, completed: true },
    { id: 3, title: "Community Helper", description: "Help 10 friends", points: 500, completed: false, current: 7, target: 10 },
    { id: 4, title: "Mega Sharer", description: "Share 10GB total", points: 1000, completed: false, current: 6.2, target: 10 }
  ];

  const rewards = [
    { id: 1, title: "500MB Free Data", cost: 1000, available: true },
    { id: 2, title: "1GB Free Data", cost: 2000, available: true },
    { id: 3, title: "Premium Badge", cost: 1500, available: true },
    { id: 4, title: "5GB Super Pack", cost: 5000, available: false }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard"
    });
  };

  const handleRedeemReward = (reward: any) => {
    if (currentPoints >= reward.cost) {
      toast({
        title: "Reward Redeemed!",
        description: `${reward.title} has been added to your account`
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.cost - currentPoints} more points`,
        variant: "destructive"
      });
    }
  };

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
        <h1 className="text-xl font-semibold">Rewards</h1>
        <div className="w-8"></div>
      </div>

      {/* Points Overview */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-white/10 backdrop-blur-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300">Reward Points</span>
          </div>
          <Trophy className="w-5 h-5 text-yellow-400" />
        </div>
        
        <div className="text-3xl font-bold mb-2">{currentPoints.toLocaleString()}</div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Progress to next tier</span>
            <span>{nextTierPoints - currentPoints} points to go</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Referral Section */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-cyan-400" />
          Invite Friends
        </h2>
        
        <p className="text-gray-400 text-sm mb-4">
          Earn 500 points for each friend who joins using your code
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 flex-1 text-center font-mono text-lg">
            {referralCode}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <Share className="w-4 h-4 mr-2" />
          Share Invite Link
        </Button>
      </Card>

      {/* Achievements */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Achievements</h2>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`border-white/10 backdrop-blur-lg p-4 ${
              achievement.completed ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium">{achievement.title}</h3>
                    {achievement.completed && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                  {!achievement.completed && achievement.current !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">
                        {achievement.current}/{achievement.target}
                      </div>
                      <Progress 
                        value={(achievement.current / achievement.target) * 100} 
                        className="h-1"
                      />
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-semibold">+{achievement.points}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Rewards Store */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rewards Store</h2>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward) => (
            <Card key={reward.id} className={`border-white/10 backdrop-blur-lg p-4 ${
              !reward.available ? 'opacity-50' : 'bg-white/5'
            }`}>
              <div className="text-center">
                <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-medium text-sm mb-2">{reward.title}</h3>
                <div className="text-yellow-400 font-semibold mb-3">
                  {reward.cost} pts
                </div>
                <Button
                  size="sm"
                  disabled={!reward.available || currentPoints < reward.cost}
                  onClick={() => handleRedeemReward(reward)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xs"
                >
                  {currentPoints >= reward.cost ? 'Redeem' : 'Not enough'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Rewards;

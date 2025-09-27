import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Gift } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onAdComplete }) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      setCanClose(false);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleAdClick = () => {
    // Simulate ad click - in real implementation, this would track clicks
    window.open('https://example.com/ad-destination', '_blank');
  };

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  const handleContinue = () => {
    onAdComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Advertisement</h3>
              <p className="text-white/60 text-sm">Support our free service</p>
            </div>
          </div>
          
          {canClose && (
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {/* Ad Content */}
        <div 
          onClick={handleAdClick}
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 mb-6 cursor-pointer hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 border border-white/10"
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            
            <h4 className="text-xl font-bold text-white mb-2">
              Premium AI Tools
            </h4>
            
            <p className="text-white/70 text-sm mb-4">
              Discover advanced AI tools for content creation, design, and productivity. 
              Get 50% off your first month!
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium">
              <Gift className="w-4 h-4" />
              Special Offer
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {canClose ? (
            <button
              onClick={handleContinue}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
            >
              Continue to Audio Generation
            </button>
          ) : (
            <div className="w-full py-3 rounded-xl bg-white/10 text-white text-center font-semibold">
              Please wait {countdown} seconds...
            </div>
          )}
          
          <p className="text-white/50 text-xs text-center">
            Ads help us keep this service free for everyone
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdModal;
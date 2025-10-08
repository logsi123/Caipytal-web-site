import React, { useState } from 'react';
import SidebarNavigation from './SidebarNavigation';
import TopbarBalance from './TopbarBalance';
import WireTransferModal from './WireTransferModal';

const AuthenticatedLayout = ({ children, user }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isWireTransferOpen, setIsWireTransferOpen] = useState(false);

  const handleWireTransferOpen = () => {
    setIsWireTransferOpen(true);
  };

  const handleWireTransferClose = () => {
    setIsWireTransferOpen(false);
  };

  const handleWireTransferComplete = (transferData) => {
    console.log('Wire transfer completed:', transferData);
    setIsWireTransferOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <SidebarNavigation 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed 
          ? 'lg:ml-16 ml-0' :'lg:ml-60 ml-0'
      }`}>
        {/* Top Balance Bar */}
        <TopbarBalance 
          user={user}
          onWireTransferClick={handleWireTransferOpen}
        />
        
        {/* Page Content */}
        <main className="pt-16 pb-20 lg:pb-6 px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Overlay */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-200">
        <SidebarNavigation 
          isCollapsed={false}
          isMobile={true}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Wire Transfer Modal */}
      <WireTransferModal
        isOpen={isWireTransferOpen}
        onClose={handleWireTransferClose}
        onComplete={handleWireTransferComplete}
      />
    </div>
  );
};

export default AuthenticatedLayout;
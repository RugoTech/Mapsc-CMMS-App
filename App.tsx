
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { AssetList } from './components/assets/AssetList';
import { AssetDetail } from './components/assets/AssetDetail';
import { AssetLocationManagement } from './components/assets/AssetLocationManagement';
import { AllMetersList } from './components/assets/AllMetersList';
import { AllDocumentsList } from './components/assets/AllDocumentsList';
import { AllHistoryList } from './components/assets/AllHistoryList';
import { WorkRequestList } from './components/maintenance/WorkRequestList';
import { WorkOrderList } from './components/maintenance/WorkOrderList';
import { WorkOrderDetail } from './components/maintenance/WorkOrderDetail';
import { LaborAllocation } from './components/maintenance/LaborAllocation';
import { ProcedureList } from './components/maintenance/ProcedureList';
import { PreventiveMaintenanceList } from './components/maintenance/PreventiveMaintenanceList';
import { ProjectList } from './components/maintenance/ProjectList';
import { Warehousing } from './components/inventory/Warehousing';
import { PartsCatalog } from './components/inventory/InventoryList';
import { InventoryTransactions } from './components/inventory/InventoryTransactions';
import { PurchaseRequisitionList } from './components/inventory/PurchaseRequisitionList';
import { RFQList } from './components/inventory/RFQList';
import { PurchaseOrderList } from './components/inventory/PurchaseOrderList';
import { VendorList } from './components/inventory/VendorList';
import { VendorDetail } from './components/inventory/VendorDetail';
import { InventoryAlerts } from './components/inventory/InventoryAlerts';
import { CycleCountList } from './components/inventory/CycleCountList';
import { InvoiceReconciliationList } from './components/inventory/InvoiceReconciliationList';
import { AdminPanel } from './components/admin/AdminPanel';
import { SystemSettings } from './components/admin/SystemSettings';
import { PersonnelManagement } from './components/personnel/PersonnelManagement';
import { ReportingAnalytics, type ReportType } from './components/reporting/ReportingAnalytics';
import { AssetHealthScoreReport } from './components/reporting/AssetHealthScoreReport';
import { Messages } from './components/messages/Messages';
import { LoginPage } from './components/auth/LoginPage';
import { LandingPage } from './components/landing/LandingPage';
import { mockData } from './data/mockData';
import type { View, User, Settings, AuditLogEntry } from './types';
import { DataContext } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsContext } from './contexts/SettingsContext';
import { AuditTrail } from './components/admin/AuditTrail';
import { UserRightsReport } from './components/admin/UserRightsReport';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import { useSystemNotifications } from './hooks/useSystemNotifications';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

type AppState = 'Login' | 'Landing' | 'MainApp';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('Login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [rfqIdForPoCreation, setRfqIdForPoCreation] = useState<string | null>(null);
  const [activeReport, setActiveReport] = useState<ReportType | null>(null);
  const [customReportKeys, setCustomReportKeys] = useState<string[]>([]);
  const [data, setData] = useState(mockData);
  const [settings, setSettings] = useState<Settings>(data.settings);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);

  // Navigation Guard State
  const [unsavedChanges, setUnsavedChanges] = useState<{ isDirty: boolean; onSave: () => Promise<boolean> }>({ 
      isDirty: false, 
      onSave: async () => true 
  });
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const contextValue = useMemo(() => ({ data, setData }), [data]);
  
  const handleSetSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setData(prev => ({...prev, settings: newSettings}));
  };

  const settingsContextValue = useMemo(() => ({ settings, setSettings: handleSetSettings }), [settings]);

  // System Notifications Hook
  useSystemNotifications(currentUser);

  // Message Cleanup Hook
  useEffect(() => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      setData(prev => {
          const hasOld = prev.messages.some(m => new Date(m.date) < sixMonthsAgo);
          if (!hasOld) return prev;
          
          return {
              ...prev,
              messages: prev.messages.filter(m => new Date(m.date) >= sixMonthsAgo)
          };
      });
  }, []);

  // Persist custom reports whenever they change
  useEffect(() => {
    if (currentUser) {
        localStorage.setItem(`mapsc_custom_reports_${currentUser.id}`, JSON.stringify(customReportKeys));
    }
  }, [customReportKeys, currentUser]);

  // Wrapper to intercept navigation if dirty
  const handleNavigationAttempt = (action: () => void) => {
      if (unsavedChanges.isDirty) {
          setPendingAction(() => action);
      } else {
          action();
      }
  };

  const handleLogin = (user: User) => {
    const logEntry: AuditLogEntry = {
        id: `LOG-${String(data.auditLog.length + 1).padStart(3, '0')}`,
        timestamp: new Date().toISOString(),
        userId: user.id,
        action: 'LOGIN',
        entityType: 'System',
        entityId: 'Auth',
        details: `User ${user.name} logged in.`,
        status: 'Success'
    };
    setData(prev => ({ ...prev, auditLog: [logEntry, ...prev.auditLog] }));
    
    setCurrentUser(user);
    setAppState('Landing');

    // Load persisted custom reports for this user
    try {
        const savedReports = localStorage.getItem(`mapsc_custom_reports_${user.id}`);
        if (savedReports) {
            setCustomReportKeys(JSON.parse(savedReports));
        } else {
            setCustomReportKeys([]);
        }
    } catch (e) {
        console.error("Failed to load custom reports", e);
        setCustomReportKeys([]);
    }
  };
  
  const handleLogout = () => {
    handleNavigationAttempt(() => {
        if (currentUser) {
            const logEntry: AuditLogEntry = {
                id: `LOG-${String(data.auditLog.length + 1).padStart(3, '0')}`,
                timestamp: new Date().toISOString(),
                userId: currentUser.id,
                action: 'LOGOUT',
                entityType: 'System',
                entityId: 'Auth',
                details: `User ${currentUser.name} logged out.`,
                status: 'Success'
            };
            setData(prev => ({ ...prev, auditLog: [logEntry, ...prev.auditLog] }));
        }
        setCurrentUser(null);
        setAppState('Login');
        setCustomReportKeys([]);
    });
  };

  const handleNavigateFromLanding = (view: View) => {
    setCurrentView(view);
    setAppState('MainApp');
  };
  
  const handleGoToLanding = () => {
      handleNavigationAttempt(() => {
          setAppState('Landing');
      });
  }

  const handleSetCurrentView = (view: View) => {
    handleNavigationAttempt(() => {
        if (view !== 'Reporting & Analytics') {
            setActiveReport(null);
        }
        setCurrentView(view);
        if (window.innerWidth < 768) { // Only close on mobile
            setIsSidebarOpen(false);
        }
    });
  };
  
  const handleNavigateToReport = (reportName: ReportType) => {
    handleNavigationAttempt(() => {
        setActiveReport(reportName);
        setCurrentView('Reporting & Analytics');
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    });
  };

  const handleClearReport = () => {
    setActiveReport(null);
  };

  const handleViewAsset = (assetId: string) => {
    handleNavigationAttempt(() => {
        setSelectedAssetId(assetId);
        setCurrentView('Asset Detail');
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    });
  };
  
  const handleBackToAssets = () => {
    handleNavigationAttempt(() => {
        setSelectedAssetId(null);
        setCurrentView('Assets');
    });
  }

  const handleViewWorkOrder = (workOrderId: string) => {
    handleNavigationAttempt(() => {
        setSelectedWorkOrderId(workOrderId);
        setCurrentView('Work Order Detail');
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    });
  };

  const handleBackToWorkOrders = () => {
    handleNavigationAttempt(() => {
        setSelectedWorkOrderId(null);
        setCurrentView('Work Orders');
    });
  };

  const handleViewVendor = (vendorId: string) => {
    handleNavigationAttempt(() => {
        setSelectedVendorId(vendorId);
        setCurrentView('Vendor Detail');
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    });
  };

  const handleBackToVendors = () => {
    handleNavigationAttempt(() => {
        setSelectedVendorId(null);
        setCurrentView('Vendors');
    });
  };

  const handleCreatePoFromRfq = (rfqId: string) => {
    handleNavigationAttempt(() => {
        setRfqIdForPoCreation(rfqId);
        setCurrentView('Purchase Orders');
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    });
  };

  // Navigation Modal Handlers
  const confirmExitWithoutSaving = () => {
      setUnsavedChanges({ isDirty: false, onSave: async () => true });
      if (pendingAction) pendingAction();
      setPendingAction(null);
  };

  const confirmSaveAndExit = async () => {
      if (unsavedChanges.onSave) {
          const success = await unsavedChanges.onSave();
          if (success) {
              setUnsavedChanges({ isDirty: false, onSave: async () => true });
              if (pendingAction) pendingAction();
              setPendingAction(null);
          }
      }
  };

  const cancelNavigation = () => {
      setPendingAction(null);
  };


  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
// FIX: Cast string literal to ReportType to satisfy the updated handleNavigateToReport function signature.
        return <Dashboard onNavigate={handleSetCurrentView} onNavigateToReport={handleNavigateToReport as (reportName: string) => void} currentUser={currentUser} />;
      case 'Messages':
        return <Messages currentUser={currentUser} />;
      case 'Assets':
        return <AssetList onViewAsset={handleViewAsset} currentUser={currentUser} />;
      case 'Asset Location':
        return <AssetLocationManagement currentUser={currentUser} />;
      case 'Asset Detail':
        return selectedAssetId ? <AssetDetail assetId={selectedAssetId} onBack={handleBackToAssets} currentUser={currentUser} /> : <AssetList onViewAsset={handleViewAsset} currentUser={currentUser}/>;
      case 'Asset Meters':
        return <AllMetersList currentUser={currentUser} />;
      case 'Asset Documentation':
        return <AllDocumentsList currentUser={currentUser} />;
      case 'Asset History':
        return <AllHistoryList />;
      case 'Work Requests':
        return <WorkRequestList currentUser={currentUser} />;
      case 'Work Orders':
        return <WorkOrderList onViewWorkOrder={handleViewWorkOrder} currentUser={currentUser} />;
      case 'Work Order Detail':
        return selectedWorkOrderId 
            ? <WorkOrderDetail 
                workOrderId={selectedWorkOrderId} 
                onBack={handleBackToWorkOrders} 
                currentUser={currentUser} 
                setUnsavedChanges={setUnsavedChanges}
              /> 
            : <WorkOrderList onViewWorkOrder={handleViewWorkOrder} currentUser={currentUser} />;
      case 'Labor Allocation':
        return <LaborAllocation currentUser={currentUser} />;
      case 'Procedures':
        return <ProcedureList currentUser={currentUser} />;
      case 'Preventive Maintenance':
        return <PreventiveMaintenanceList currentUser={currentUser} />;
      case 'Projects':
        return <ProjectList currentUser={currentUser} />;
      case 'Warehousing':
        return <Warehousing currentUser={currentUser} />;
      case 'Parts Catalog':
        return <PartsCatalog currentUser={currentUser} />;
      case 'Inventory Transactions':
        return <InventoryTransactions currentUser={currentUser} />;
      case 'Purchase Requisitions':
        return <PurchaseRequisitionList currentUser={currentUser}/>;
      case 'RFQs':
        return <RFQList onCreatePO={handleCreatePoFromRfq} currentUser={currentUser} />;
      case 'Purchase Orders':
        return <PurchaseOrderList rfqToCreateFromId={rfqIdForPoCreation} onCreationDone={() => setRfqIdForPoCreation(null)} currentUser={currentUser} />;
      case 'Invoice Reconciliation':
        return <InvoiceReconciliationList currentUser={currentUser} />;
      case 'Vendors':
        return <VendorList onViewVendor={handleViewVendor} currentUser={currentUser} />;
      case 'Vendor Detail':
        return selectedVendorId ? <VendorDetail vendorId={selectedVendorId} onBack={handleBackToVendors} /> : <VendorList onViewVendor={handleViewVendor} currentUser={currentUser} />;
      case 'Inventory Alerts':
        return <InventoryAlerts currentUser={currentUser} />;
      case 'Cycle Counting':
        return <CycleCountList currentUser={currentUser} />;
      case 'Personnel Management':
        return <PersonnelManagement currentUser={currentUser} />;
      case 'Reporting & Analytics':
        return (
          <ReportingAnalytics
            initialReport={activeReport}
            onClearReport={handleClearReport}
            currentUser={currentUser}
            customReportKeys={customReportKeys}
            setCustomReportKeys={setCustomReportKeys}
          />
        );
      case 'Asset Health Score':
        return <AssetHealthScoreReport onBack={() => handleSetCurrentView('Reporting & Analytics')} currentUser={currentUser} />;
      case 'Admin & Settings':
        return <AdminPanel onNavigate={handleSetCurrentView} currentUser={currentUser} />;
      case 'System Settings':
        return <SystemSettings onBack={() => handleSetCurrentView('Admin & Settings')} currentUser={currentUser} />;
      case 'Audit Trails':
        return <AuditTrail onBack={() => handleSetCurrentView('Admin & Settings')} />;
      case 'User Rights & Permissions':
        return <UserRightsReport onBack={() => handleSetCurrentView('Admin & Settings')} />;
      default:
// FIX: Cast string literal to ReportType to satisfy the updated handleNavigateToReport function signature.
        return <Dashboard onNavigate={handleSetCurrentView} onNavigateToReport={handleNavigateToReport as (reportName: string) => void} currentUser={currentUser} />;
    }
  };

  const getHeaderTitle = () => {
    if (currentView === 'Asset Detail' && selectedAssetId) {
        return `Asset: ${data.assets.find(a => a.id === selectedAssetId)?.name || selectedAssetId}`;
    }
    if (currentView === 'Work Order Detail' && selectedWorkOrderId) {
        return `Work Order: ${selectedWorkOrderId}`;
    }
    if (currentView === 'Vendor Detail' && selectedVendorId) {
        return `Vendor: ${data.vendors.find(v => v.id === selectedVendorId)?.name || selectedVendorId}`;
    }
    return currentView;
  }
  
  return (
    <ThemeProvider>
      <SettingsContext.Provider value={settingsContextValue}>
        <DataContext.Provider value={contextValue}>
          {appState === 'Login' ? (
            <LoginPage onLogin={handleLogin} />
          ) : appState === 'Landing' ? (
            <LandingPage onNavigate={handleNavigateFromLanding} onLogout={handleLogout} currentUser={currentUser} />
          ) : (
            <div className="relative flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
              <Sidebar
                currentView={currentView}
                setCurrentView={handleSetCurrentView}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                currentUser={currentUser}
              />
              <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : ''}`}>
                <Header
                  currentView={getHeaderTitle()}
                  toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                  onGoToLanding={handleGoToLanding}
                  onLogout={handleLogout}
                  onViewAsset={handleViewAsset}
                  onViewWorkOrder={handleViewWorkOrder}
                  onNavigate={handleSetCurrentView}
                  onViewVendor={handleViewVendor}
                  currentUser={currentUser}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                  <div className="container mx-auto px-4 sm:px-6 py-8">
                    <ErrorBoundary>
                        {renderView()}
                    </ErrorBoundary>
                  </div>
                </main>
              </div>
              
              {pendingAction && (
                  <Modal
                      isOpen={!!pendingAction}
                      onClose={cancelNavigation}
                      title="Unsaved Changes"
                      footer={
                          <div className="flex justify-between w-full">
                              <Button variant="secondary" onClick={cancelNavigation}>Cancel</Button>
                              <div className="flex space-x-2">
                                  <Button variant="danger" onClick={confirmExitWithoutSaving}>Exit Without Saving</Button>
                                  <Button variant="primary" onClick={confirmSaveAndExit}>Save & Exit</Button>
                              </div>
                          </div>
                      }
                  >
                      <p>You have unsaved changes in the active Work Order. Do you want to save them before leaving?</p>
                  </Modal>
              )}
            </div>
          )}
        </DataContext.Provider>
      </SettingsContext.Provider>
    </ThemeProvider>
  );
};

export default App;

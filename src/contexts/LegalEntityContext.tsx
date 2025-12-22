import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LegalEntity, getPrimaryLegalEntity, getLegalEntityById } from '../data/mockLegalEntities';

interface LegalEntityContextType {
  activeLegalEntity: LegalEntity | null;
  setActiveLegalEntity: (entity: LegalEntity) => void;
  isLoading: boolean;
}

const LegalEntityContext = createContext<LegalEntityContextType | undefined>(undefined);

export const useLegalEntity = () => {
  const context = useContext(LegalEntityContext);
  if (!context) {
    throw new Error('useLegalEntity must be used within a LegalEntityProvider');
  }
  return context;
};

interface LegalEntityProviderProps {
  children: ReactNode;
}

export const LegalEntityProvider = ({ children }: LegalEntityProviderProps) => {
  const [activeLegalEntity, setActiveLegalEntityState] = useState<LegalEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with primary legal entity or load from localStorage
  useEffect(() => {
    const initializeLegalEntity = () => {
      try {
        // Check localStorage for saved active entity
        const savedEntityId = localStorage.getItem('activeLegalEntityId');
        
        if (savedEntityId) {
          const entity = getLegalEntityById(savedEntityId);
          if (entity && entity.status === 'active') {
            setActiveLegalEntityState(entity);
            setIsLoading(false);
            return;
          }
        }

        // Fall back to primary entity
        const primaryEntity = getPrimaryLegalEntity();
        if (primaryEntity) {
          setActiveLegalEntityState(primaryEntity);
          localStorage.setItem('activeLegalEntityId', primaryEntity.id);
        }
      } catch (error) {
        console.error('Error initializing legal entity:', error);
        // Fall back to primary entity
        const primaryEntity = getPrimaryLegalEntity();
        if (primaryEntity) {
          setActiveLegalEntityState(primaryEntity);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeLegalEntity();
  }, []);

  const setActiveLegalEntity = (entity: LegalEntity) => {
    setActiveLegalEntityState(entity);
    localStorage.setItem('activeLegalEntityId', entity.id);
    
    // Log the switch for audit trail
    console.log('[Legal Entity Switch]', {
      from: activeLegalEntity?.name,
      to: entity.name,
      timestamp: new Date().toISOString(),
    });

    // In production, this would trigger:
    // - API call to update user session
    // - Analytics event
    // - Audit log entry
  };

  return (
    <LegalEntityContext.Provider
      value={{
        activeLegalEntity,
        setActiveLegalEntity,
        isLoading,
      }}
    >
      {children}
    </LegalEntityContext.Provider>
  );
};

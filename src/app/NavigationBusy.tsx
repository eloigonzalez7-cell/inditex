import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type NavigationBusyContextValue = {
  isBusy: boolean;
  begin: () => void;
  end: () => void;
};

const NavigationBusyContext = createContext<NavigationBusyContextValue | null>(null);

export function NavigationBusyProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(0);

  const begin = useCallback(() => {
    setPending((count) => count + 1);
  }, []);

  const end = useCallback(() => {
    setPending((count) => Math.max(0, count - 1));
  }, []);

  const value = useMemo(
    () => ({
      isBusy: pending > 0,
      begin,
      end,
    }),
    [pending, begin, end],
  );

  return (
    <NavigationBusyContext.Provider value={value}>{children}</NavigationBusyContext.Provider>
  );
}

export function useNavigationBusy() {
  const ctx = useContext(NavigationBusyContext);
  if (!ctx) {
    throw new Error('useNavigationBusy must be used within NavigationBusyProvider');
  }
  return ctx;
}

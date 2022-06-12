import {
  useState,
  useEffect,
  Suspense as ReactSuspense,
  ComponentProps,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import CustomError from "../custom-error";

const Suspense = ({
  fallback,
  children,
}: ComponentProps<typeof ReactSuspense>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={CustomError}>
      {mounted ? (
        <ReactSuspense fallback={fallback}>{children}</ReactSuspense>
      ) : (
        fallback
      )}
    </ErrorBoundary>
  );
};

export default Suspense;

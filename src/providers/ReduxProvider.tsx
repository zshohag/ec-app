// "use client";

// import { store } from "@/redux/store";
// import { Provider } from "react-redux";


// export function ReduxProvider({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }


// lib/providers/redux-provider.tsx
"use client";

import { Provider } from 'react-redux';
import { store } from '@/lib/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
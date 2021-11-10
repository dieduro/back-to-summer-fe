import React, { useContext, createContext } from 'react';

//Context
export const TriviaContext = createContext(null);

//Provider
export const TriviaContextProvider = ({ children }) => {
  const [triviaContext, setTriviaContext] = React.useState(null);

  //ComponentDidMouunt
  React.useEffect(() => {

  }, []);

  //
  const values = React.useMemo(() => (
    { triviaContext,      // States que seran visibles en el contexto.
        setTriviaContext,   // Funciones que son exportadas para manejo externo.
    }), 
    [ 
        triviaContext ]);   // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <TriviaContext.Provider value={values}>{children}</TriviaContext.Provider>;
}

//
export function useTriviaContext() {
  const context = useContext(TriviaContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useTriviaContext;
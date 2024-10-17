import { createContext } from "react"

const ReservoirContext = createContext(null);

export const ReservoirProvider = ({ children }) => {
    
    // TODO

    return (
        <ReservoirContext.Provider value={{}}>
            {children}
        </ReservoirContext.Provider>
    );
}
import { createContext, SetStateAction, useContext } from "react";

interface ChoiceContext {
    step: number;
    setStep: React.Dispatch<SetStateAction<number>>;
    solution: string;
    setSolution: React.Dispatch<SetStateAction<string>>;
    priceRange: string;
    setPriceRange: React.Dispatch<SetStateAction<string>>;
    averageBill: string;
    setAverageBill: React.Dispatch<SetStateAction<string>>;
    existingSystem: string;
    setExistingSystem: React.Dispatch<SetStateAction<string>>;
    preferredSystemSize: string;
    setPreferredSystemSize: React.Dispatch<SetStateAction<string>>;
    houseStories: string;
    setHouseStories: React.Dispatch<SetStateAction<string>>;
}
export const UserChoiceContext = createContext<ChoiceContext | undefined>(
    undefined,
);

export const useUserChoiceContext = () => {
    const context = useContext(UserChoiceContext);
    if (context == undefined) {
        throw new Error("Please Wrap the Component in userChoiceContext");
    }
    return context;
};

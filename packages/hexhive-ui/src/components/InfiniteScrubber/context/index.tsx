import React from 'react'

export const InfiniteScrubberContext = React.createContext<{
    playing?: boolean;
    speed?: number;
    rewinding?: boolean;
    fastForwarding?: boolean;
    play?: () => void;
    pause?: () => void;
    rewind?: () => void;
    fastForward?: () => void;
}>({

})

export const InfiniteScrubberProvider = InfiniteScrubberContext.Provider;

export const useScrubberContext = () => React.useContext(InfiniteScrubberContext);
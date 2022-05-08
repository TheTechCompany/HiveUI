import { useContext } from "react";
import { TimelineContext } from "../context";

export const useDataItem = (id: string | number) => {
    const { tasks } = useContext(TimelineContext)

    let item = tasks?.map((x, ix) => ({...x, index: ix})).find((a) => a.id == id)
    return item //data?.map((x, ix) => ({...x, index: ix})).find((a) => a.id == id)
}

export const useData = () => {
    const { tasks } = useContext(TimelineContext)

    return tasks?.map((x, ix) => ({...x, index: ix}));
}

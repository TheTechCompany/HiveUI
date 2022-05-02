export interface ScheduleItem {
    id?: string;
  
    people?: Array<{id?: string, name?: string}>
    equipment?: Array<string | undefined | null>
  
    files?: any[];
    
    project: {displayId: string, name: string, id: string};
    notes?: Array<string | undefined | null>,
    managers?: Array<{id?: string, name?: string}>;
    owner?: {id: string, name: string};
    date?: Date;
  }
  
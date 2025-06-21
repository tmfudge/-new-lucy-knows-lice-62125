import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  status: 'clear' | 'infected' | 'pending' | 'needs-check';
  lastChecked: string;
  notes: string;
  treatmentStartDate?: string;
}

export interface TreatmentTask {
  id: string;
  day: number;
  title: string;
  description: string;
  timeEstimate: string;
  critical: boolean;
  completed: boolean;
  completedDate?: string;
}

export interface CleaningTask {
  id: string;
  category: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  timeEstimate: string;
  description: string;
  completed: boolean;
  completedDate?: string;
}

export interface RecheckEvent {
  id: string;
  date: string;
  day: number;
  checkType: 'critical' | 'important' | null;
  priority: 'high' | 'medium' | 'low';
  description: string;
  completed: boolean;
  findings?: string;
}

export interface TreatmentState {
  treatmentStartDate: string | null;
  familyMembers: FamilyMember[];
  treatmentTasks: TreatmentTask[];
  cleaningTasks: CleaningTask[];
  recheckEvents: RecheckEvent[];
  emergencyStepsCompleted: string[];
  currentDay: number;
  progressPhotos: { date: string; description: string; url?: string }[];
}

type TreatmentAction =
  | { type: 'SET_TREATMENT_START_DATE'; payload: string }
  | { type: 'ADD_FAMILY_MEMBER'; payload: FamilyMember }
  | { type: 'UPDATE_FAMILY_MEMBER'; payload: { id: string; updates: Partial<FamilyMember> } }
  | { type: 'TOGGLE_TREATMENT_TASK'; payload: string }
  | { type: 'TOGGLE_CLEANING_TASK'; payload: string }
  | { type: 'TOGGLE_RECHECK_EVENT'; payload: { id: string; findings?: string } }
  | { type: 'TOGGLE_EMERGENCY_STEP'; payload: string }
  | { type: 'ADD_PROGRESS_PHOTO'; payload: { description: string; url?: string } }
  | { type: 'LOAD_STATE'; payload: TreatmentState };

const initialState: TreatmentState = {
  treatmentStartDate: null,
  familyMembers: [
    {
      id: '1',
      name: 'Emma',
      relationship: 'Child',
      status: 'infected',
      lastChecked: new Date().toISOString().split('T')[0],
      notes: 'Initial case - treatment needed',
    },
    {
      id: '2',
      name: 'Mom',
      relationship: 'Parent',
      status: 'pending',
      lastChecked: '',
      notes: 'Needs screening',
    },
    {
      id: '3',
      name: 'Dad',
      relationship: 'Parent',
      status: 'pending',
      lastChecked: '',
      notes: 'Needs screening',
    },
  ],
  treatmentTasks: [
    // Day 1
    { id: 'day1-prep', day: 1, title: 'Prepare Treatment Area', description: 'Set up in bathroom with good lighting, towels, and all supplies ready.', timeEstimate: '10 minutes', critical: true, completed: false },
    { id: 'day1-enzyme', day: 1, title: 'Apply Enzyme Treatment', description: 'Saturate hair completely with enzyme solution. Don\'t miss any spots.', timeEstimate: '5 minutes', critical: true, completed: false },
    { id: 'day1-wait', day: 1, title: 'Processing Time', description: 'Let enzymes work to dissolve nit cement. Keep hair damp, cover with shower cap.', timeEstimate: '45 minutes', critical: true, completed: false },
    { id: 'day1-comb', day: 1, title: 'Metal Comb Removal', description: 'Systematic combing in 1/4 inch sections. Wipe comb after each stroke.', timeEstimate: '30-60 minutes', critical: true, completed: false },
    { id: 'day1-rinse', day: 1, title: 'Final Rinse & Dry', description: 'Thorough rinse with warm water. Dry hair and do final visual check.', timeEstimate: '15 minutes', critical: false, completed: false },
    
    // Day 2
    { id: 'day2-inspect', day: 2, title: 'Visual Inspection', description: 'Check for any live lice or new nits. Focus on problem areas.', timeEstimate: '15 minutes', critical: true, completed: false },
    { id: 'day2-spot', day: 2, title: 'Spot Treatment', description: 'If any lice found, repeat enzyme treatment on affected areas only.', timeEstimate: '20 minutes', critical: false, completed: false },
    { id: 'day2-comb', day: 2, title: 'Light Combing', description: 'Quick comb-through to remove any loosened debris.', timeEstimate: '15 minutes', critical: false, completed: false },
    
    // Day 3
    { id: 'day3-full', day: 3, title: 'Full Head Inspection', description: 'Thorough check of entire head. Any live lice means treatment needed.', timeEstimate: '20 minutes', critical: true, completed: false },
    { id: 'day3-treat', day: 3, title: 'Retreat if Necessary', description: 'If live lice found, repeat full Day 1 protocol.', timeEstimate: '60 minutes', critical: true, completed: false },
    { id: 'day3-document', day: 3, title: 'Document Results', description: 'Take photos, note findings for tracking progress.', timeEstimate: '5 minutes', critical: false, completed: false },
  ],
  cleaningTasks: [
    // High Priority - Day 1
    { id: 'clean-1', category: 'Bedding', task: 'Wash all bedding in hot water (130°F+)', priority: 'high', timeEstimate: '15 min', description: 'Sheets, pillowcases, blankets from infected person\'s bed', completed: false },
    { id: 'clean-2', category: 'Clothing', task: 'Wash clothes worn in last 2 days', priority: 'high', timeEstimate: '20 min', description: 'Hot water wash and high heat dry for 40+ minutes', completed: false },
    { id: 'clean-3', category: 'Personal Items', task: 'Bag personal items for 2 weeks', priority: 'high', timeEstimate: '10 min', description: 'Stuffed animals, pillows, hats that can\'t be washed', completed: false },
    { id: 'clean-4', category: 'Hair Tools', task: 'Soak brushes and combs in hot water', priority: 'high', timeEstimate: '5 min', description: '130°F water for 10 minutes, then clean thoroughly', completed: false },
    
    // Medium Priority - Day 2-3
    { id: 'clean-5', category: 'Furniture', task: 'Vacuum upholstered furniture', priority: 'medium', timeEstimate: '20 min', description: 'Focus on areas where head contact occurs', completed: false },
    { id: 'clean-6', category: 'Car', task: 'Vacuum car seats and headrests', priority: 'medium', timeEstimate: '15 min', description: 'Pay attention to fabric seats and headrests', completed: false },
    { id: 'clean-7', category: 'Bedding', task: 'Wash other family bedding', priority: 'medium', timeEstimate: '30 min', description: 'Preventive washing of all household bedding', completed: false },
    { id: 'clean-8', category: 'Floors', task: 'Vacuum carpets and rugs', priority: 'medium', timeEstimate: '25 min', description: 'Focus on bedrooms and common areas', completed: false },
  ],
  recheckEvents: [],
  emergencyStepsCompleted: [],
  currentDay: 1,
  progressPhotos: [],
};

const treatmentReducer = (state: TreatmentState, action: TreatmentAction): TreatmentState => {
  switch (action.type) {
    case 'SET_TREATMENT_START_DATE': {
      const startDate = action.payload;
      const recheckEvents = generateRecheckEvents(startDate);
      const currentDay = calculateCurrentDay(startDate);
      
      return {
        ...state,
        treatmentStartDate: startDate,
        recheckEvents,
        currentDay,
        familyMembers: state.familyMembers.map(member => 
          member.status === 'infected' 
            ? { ...member, treatmentStartDate: startDate }
            : member
        ),
      };
    }
    
    case 'ADD_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: [...state.familyMembers, action.payload],
      };
    
    case 'UPDATE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.map(member =>
          member.id === action.payload.id
            ? { ...member, ...action.payload.updates }
            : member
        ),
      };
    
    case 'TOGGLE_TREATMENT_TASK':
      return {
        ...state,
        treatmentTasks: state.treatmentTasks.map(task =>
          task.id === action.payload
            ? { 
                ...task, 
                completed: !task.completed,
                completedDate: !task.completed ? new Date().toISOString() : undefined
              }
            : task
        ),
      };
    
    case 'TOGGLE_CLEANING_TASK':
      return {
        ...state,
        cleaningTasks: state.cleaningTasks.map(task =>
          task.id === action.payload
            ? { 
                ...task, 
                completed: !task.completed,
                completedDate: !task.completed ? new Date().toISOString() : undefined
              }
            : task
        ),
      };
    
    case 'TOGGLE_RECHECK_EVENT':
      return {
        ...state,
        recheckEvents: state.recheckEvents.map(event =>
          event.id === action.payload.id
            ? { 
                ...event, 
                completed: !event.completed,
                findings: action.payload.findings || event.findings
              }
            : event
        ),
      };
    
    case 'TOGGLE_EMERGENCY_STEP':
      const stepId = action.payload;
      const isCompleted = state.emergencyStepsCompleted.includes(stepId);
      
      return {
        ...state,
        emergencyStepsCompleted: isCompleted
          ? state.emergencyStepsCompleted.filter(id => id !== stepId)
          : [...state.emergencyStepsCompleted, stepId],
      };
    
    case 'ADD_PROGRESS_PHOTO':
      return {
        ...state,
        progressPhotos: [
          ...state.progressPhotos,
          {
            date: new Date().toISOString(),
            description: action.payload.description,
            url: action.payload.url,
          },
        ],
      };
    
    case 'LOAD_STATE':
      return action.payload;
    
    default:
      return state;
  }
};

// Helper functions
const generateRecheckEvents = (startDate: string): RecheckEvent[] => {
  const events: RecheckEvent[] = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < 21; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    
    let checkType: 'critical' | 'important' | null = null;
    let priority: 'high' | 'medium' | 'low' = 'low';
    let description = 'Optional visual check';
    
    // Critical check days
    if ([0, 2, 6, 13, 20].includes(i)) {
      checkType = 'critical';
      priority = 'high';
      description = 'Thorough inspection required';
    }
    // Important check days
    else if ([1, 3, 4, 7, 10, 14, 17].includes(i)) {
      checkType = 'important';
      priority = 'medium';
      description = 'Quick visual inspection';
    }
    
    events.push({
      id: `recheck-${i + 1}`,
      date: date.toISOString().split('T')[0],
      day: i + 1,
      checkType,
      priority,
      description,
      completed: false,
    });
  }
  
  return events;
};

const calculateCurrentDay = (startDate: string): number => {
  const start = new Date(startDate);
  const today = new Date();
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(21, diffDays));
};

const TreatmentContext = createContext<{
  state: TreatmentState;
  dispatch: React.Dispatch<TreatmentAction>;
} | null>(null);

export const TreatmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(treatmentReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('treatmentState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('treatmentState', JSON.stringify(state));
  }, [state]);

  return (
    <TreatmentContext.Provider value={{ state, dispatch }}>
      {children}
    </TreatmentContext.Provider>
  );
};

export const useTreatment = () => {
  const context = useContext(TreatmentContext);
  if (!context) {
    throw new Error('useTreatment must be used within a TreatmentProvider');
  }
  return context;
};
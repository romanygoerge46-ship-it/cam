export interface UserProfile {
  name: string;
  weight: number; // kg
  height: number; // cm
  age: number;
}

export interface AnalysisResult {
  foodName: string;
  calories: number;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  advice: string;
}

export enum AppView {
  ONBOARDING = 'ONBOARDING',
  CAMERA = 'CAMERA',
  ANALYSIS = 'ANALYSIS',
}

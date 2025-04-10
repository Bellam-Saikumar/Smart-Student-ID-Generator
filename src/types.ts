export interface StudentData {
  name: string;
  rollNumber: string;
  class: string;
  division: string;
  allergies: string[];
  photo: string;
  rackNumber: string;
  busRoute: string;
}

export interface Template {
  id: 'modern' | 'classic';
  name: string;
}
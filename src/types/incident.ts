
export interface AISafetyIncident {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  status: 'Open' | 'Resolved' | 'Under Investigation';
  category: string;
}

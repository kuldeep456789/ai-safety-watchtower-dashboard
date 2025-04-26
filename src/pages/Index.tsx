
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AddIncidentForm from '@/components/AddIncidentForm';
import IncidentTable from '@/components/IncidentTable';
import { AISafetyIncident } from '@/types/incident';

const Index = () => {
  const [incidents, setIncidents] = useState<AISafetyIncident[]>([
    {
      id: '1',
      title: 'Unexpected Model Behavior',
      description: 'AI model produced inconsistent results in critical decision-making',
      severity: 'High',
      category: 'Model Reliability',
      status: 'Under Investigation',
      date: '2025-04-25',
    },
    {
      id: '2',
      title: 'Data Privacy Breach',
      description: 'Potential exposure of sensitive training data',
      severity: 'Critical',
      category: 'Privacy',
      status: 'Open',
      date: '2025-04-26',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddIncident = (data: Omit<AISafetyIncident, 'id'>) => {
    const newIncident = {
      ...data,
      id: uuidv4(),
    };
    setIncidents([...incidents, newIncident]);
  };

  const filteredIncidents = incidents.filter((incident) =>
    Object.values(incident).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">AI Safety Incident Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Report New Incident</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Report New Incident</DialogTitle>
              </DialogHeader>
              <AddIncidentForm onSubmit={handleAddIncident} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <IncidentTable 
            incidents={filteredIncidents}
            onDelete={(id) => setIncidents(incidents.filter(i => i.id !== id))}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

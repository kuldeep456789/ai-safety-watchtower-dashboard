import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AddIncidentForm from '@/components/AddIncidentForm';
import IncidentTable from '@/components/IncidentTable';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';
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

  const stats = {
    total: incidents.length,
    critical: incidents.filter(i => i.severity === 'Critical').length,
    open: incidents.filter(i => i.status === 'Open').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                AI Safety Incident Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage AI safety incidents in real-time
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Shield className="w-4 h-4 mr-2" />
                  Report New Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Report New Incident</DialogTitle>
                </DialogHeader>
                <AddIncidentForm onSubmit={handleAddIncident} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="flex items-center p-6">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Incidents</p>
                  <h3 className="text-2xl font-bold">{stats.total}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="flex items-center p-6">
                <div className="rounded-full bg-red-100 p-3 mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Incidents</p>
                  <h3 className="text-2xl font-bold">{stats.critical}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="flex items-center p-6">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Open Cases</p>
                  <h3 className="text-2xl font-bold">{stats.open}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10"
              />
            </div>
          </div>

          <div className="rounded-lg border bg-white/50 backdrop-blur-sm shadow-sm">
            <IncidentTable 
              incidents={filteredIncidents}
              onDelete={(id) => setIncidents(incidents.filter(i => i.id !== id))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

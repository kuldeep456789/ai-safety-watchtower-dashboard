
import React from 'react';
import DataTable from '@/components/DataTable';
import AddDataForm from '@/components/AddDataForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Data Management Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <AddDataForm onSubmit={(data) => console.log(data)} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Index;

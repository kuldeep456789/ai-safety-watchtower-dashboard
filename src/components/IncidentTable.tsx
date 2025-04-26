
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AISafetyIncident } from '@/types/incident';
import { cn } from '@/lib/utils';

interface IncidentTableProps {
  incidents: AISafetyIncident[];
  onDelete: (id: string) => void;
}

const severityColors = {
  Low: 'bg-blue-100 text-blue-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-orange-100 text-orange-800',
  Critical: 'bg-red-100 text-red-800',
};

const statusColors = {
  Open: 'bg-green-100 text-green-800',
  Resolved: 'bg-gray-100 text-gray-800',
  'Under Investigation': 'bg-purple-100 text-purple-800',
};

const IncidentTable = ({ incidents, onDelete }: IncidentTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell className="font-medium">{incident.title}</TableCell>
              <TableCell>{incident.category}</TableCell>
              <TableCell>
                <Badge className={cn("font-medium", severityColors[incident.severity])}>
                  {incident.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn("font-medium", statusColors[incident.status])}>
                  {incident.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(incident.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncidentTable;

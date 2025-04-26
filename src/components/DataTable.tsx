
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronUp, ChevronDown } from "lucide-react";

interface DataItem {
  id: string;
  name: string;
  category: string;
  value: number;
  date: string;
}

const DataTable = () => {
  const [data, setData] = React.useState<DataItem[]>([]);
  const [sortField, setSortField] = React.useState<keyof DataItem | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = React.useState('');
  const { toast } = useToast();

  // Add sample data
  React.useEffect(() => {
    setData([
      { id: '1', name: 'Item 1', category: 'A', value: 100, date: '2024-01-01' },
      { id: '2', name: 'Item 2', category: 'B', value: 200, date: '2024-01-02' },
      { id: '3', name: 'Item 3', category: 'A', value: 300, date: '2024-01-03' },
    ]);
  }, []);

  const handleSort = (field: keyof DataItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    let filteredData = [...data];
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (sortField) {
      filteredData.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filteredData;
  }, [data, sortField, sortDirection, searchTerm]);

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "The item has been successfully removed.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                Name {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </TableHead>
              <TableHead onClick={() => handleSort('category')} className="cursor-pointer">
                Category {sortField === 'category' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </TableHead>
              <TableHead onClick={() => handleSort('value')} className="cursor-pointer">
                Value {sortField === 'value' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </TableHead>
              <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
                Date {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;

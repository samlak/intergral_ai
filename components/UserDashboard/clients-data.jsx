import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail } from "lucide-react";
import Link from "next/link";

const clients = [
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
  {
    name: "Salami Haruna",
    email: "samlak1999@gmail.com",
  },
];

export default function ClientsData() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[50px]"> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.name}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <Link href={`mailto:${client.email}`} className="text-primary">
                  <Mail className="h-5 w-5 " />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

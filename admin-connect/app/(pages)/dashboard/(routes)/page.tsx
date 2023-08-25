"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Activity, Client, Plan } from "@prisma/client";
import axios from "axios";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardInterface {
  clientList: Client[] | [];
  // planList: Plan[] | []
  // activityList: Activity[] | []
}

const DashboardBody: React.FC<DashboardInterface> = ({
  clientList,
  // planList,
  // activityList,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            {clientList.length === 5
              ? `Top 5 Clients`
              : `Clients (${clientList.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {clientList.length ? <ul>{clientList.map((client) => <div className="flex space-x-3" key={client.id}><User2/> <span>{client.name}</span> </div>)}</ul> : "No Clients, add some!"}
        </CardContent>
      </Card>
    </div>
  );
};

export default function Dashboard() {
  const [clientList, setClientList] = useState<Client[] | []>([]);
  useEffect(() => {
    const getDashboard = async () => await axios.get(`/api/dashboard`);
    getDashboard().then(({ data }) => {
      setClientList(data.clientList);
    });
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="A dashboard of your clients, programs, and activities."
        />
        <DashboardBody clientList={clientList} />
      </div>
    </div>
  );
}

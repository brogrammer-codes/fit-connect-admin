"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Activity, Client, Plan } from "@prisma/client";
import axios from "axios";
import { Book, DumbbellIcon, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardInterface {
  clientList: Client[] | [];
  planList: Plan[] | []
  activityList: Activity[] | []
}

const DashboardBody: React.FC<DashboardInterface> = ({
  clientList,
  planList,
  activityList,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <Card className="bg-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            {clientList.length === 5
              ? `Top 5 Clients`
              : `Clients (${clientList.length})`}
          </CardTitle>
          <User2 />
        </CardHeader>
        <CardContent>
          {clientList.length ? (
            <ul>
              {clientList.map((client) => (
                <Link className="flex space-x-3 hover:bg-slate-400 rounded p-2" key={client.id} href={`/clients/${client.id}`}>
                   <span>{client.name}</span>{" "}
                </Link>
              ))}
            </ul>
          ) : (
            "No Clients, add some!"
          )}
        </CardContent>
      </Card>
      <Card className="bg-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            {activityList.length === 5
              ? `Top 5 Activities`
              : `Activities (${activityList.length})`}
          </CardTitle>
              <DumbbellIcon />
        </CardHeader>
        <CardContent>
          {activityList.length ? (
            <ul>
              {activityList.map((activity) => (
                <Link className="flex space-x-3 hover:bg-slate-400 rounded p-2" key={activity.id} href={`/activities/${activity.id}`}>
                   <span>{activity.name}</span>{" "}
                </Link>
              ))}
            </ul>
          ) : (
            "No Activities, add some!"
          )}
        </CardContent>
      </Card>
      <Card className="bg-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            {planList.length === 5
              ? `Top 5 Plans`
              : `Plans (${planList.length})`}
          </CardTitle>
              <Book />
        </CardHeader>
        <CardContent>
          {planList.length ? (
            <ul>
              {planList.map((plan) => (
                <Link className="flex space-x-3 hover:bg-slate-400 rounded p-2" key={plan.id} href={`/plans/${plan.id}`}>
                   <span>{plan.name}</span>{" "}
                </Link>
              ))}
            </ul>
          ) : (
            "No Activities, add some!"
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function Dashboard() {
  const [clientList, setClientList] = useState<Client[] | []>([]);
  const [activityList, setActivityList] = useState<Activity[] | []>([]);
  const [planList, setPlanList] = useState<Plan[] | []>([]);
  useEffect(() => {
    const getDashboard = async () => await axios.get(`/api/dashboard`);
    getDashboard().then(({ data }) => {
      setClientList(data.clientList);
      setActivityList(data.activityList)
      setPlanList(data.planList)
    });
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="A dashboard of your clients, programs, and activities."
        />
        <DashboardBody clientList={clientList} activityList={activityList} planList={planList}/>
      </div>
    </div>
  );
}

"use client";
import { Heading } from "@/components/ui/heading";
import { Activity, Client, Plan } from "@prisma/client";
import axios from "axios";

import { useEffect, useState } from "react";
import { DashboardBody } from "../components/dashboard-body";



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

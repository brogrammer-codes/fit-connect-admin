import { Heading } from "@/components/ui/heading";

export default function Dashboard() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="A dashboard of your clients, programs, and activities."/>
      </div>
    </div>
  );
}

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

const DashboardBody: React.FC<{}> = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="A dashboard of your clients, programs, and activities."
        />
        <DashboardBody />
      </div>
    </div>
  );
}

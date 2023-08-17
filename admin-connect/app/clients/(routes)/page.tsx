import { ClientDisplay } from "./components/client-display";

export default function Clients() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientDisplay />
      </div>
    </div>
  );
}

import { Heading } from "@/components/ui/heading";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col px-10 py-3 items-center">
      <div className="max-w-2xl space-y-5 pt-4">
      <Heading
        title="Welcome to Fit Connect Admin Portal"
        description="Empowering Your Coaching
          Excellence"
      />
        <h2 className="text-xl font-bold">Unlock Your Coaching Potential</h2>
        <p className="text-md ">
          Welcome to the Fit Connect Admin Portal - your hub for transforming
          fitness coaching. With advanced tools, insights, and seamless
          management, our portal empowers you to take your coaching to the next
          level.
        </p>
        <h2 className="text-xl font-bold">Why Fit Connect Admin Portal?</h2>
        <p className="text-md ">
          Fit Connect Admin Portal is designed with coaches like you in mind. We
          understand the unique challenges and goals you have when guiding your
          clients. Our platform equips you with the resources you need to excel
          in your coaching journey:
        </p>
        <ul>
          <li>
            <span className="font-bold">Client Management:</span>Easily manage
            and organize your clients&apos; profiles, progress, and customized
            plans all in one place.
          </li>
          <li>
            <span className="font-bold">Plan Creation:</span>Craft tailored
            workout plans that align with your clients&apos; goals, preferences,
            and fitness levels. Our intuitive interface makes plan creation a
            breeze.
          </li>
          <li>
            <span className="font-bold">Engagement Tools: </span>Keep your
            clients engaged and motivated with direct messaging, progress
            tracking, and interactive challenges.
          </li>
          <li>
            <span className="font-bold">Insights and Analytics: </span>Gain deep
            insights into your clients&apos; performance, allowing you to make
            data-driven decisions for more effective coaching.
          </li>
          <li>
            <span className="font-bold">Community Building: </span>Create a
            supportive network with fellow coaches, share best practices, and
            collaborate on enhancing your coaching strategies.
          </li>
        </ul>
        <h2 className="text-xl font-bold">Elevate Your Coaching Experience</h2>
        <p className="text-md ">
          At Fit Connect, we believe that great coaches deserve great tools. Our
          Admin Portal empowers you to make a lasting impact on your
          clients&apos; fitness journeys. By streamlining tasks and providing
          actionable insights, you can focus on what you do best - inspiring and
          guiding others to reach their full potential.
        </p>
        <h2 className="text-xl font-bold">Ready to Transform Your Coaching?</h2>
        <p className="text-md ">
          Join Fit Connect Admin Portal and revolutionize the way you coach.
          Start today and experience the difference of having the ultimate
          coaching platform at your fingertips. Elevate your coaching, elevate
          your success.
        </p>
      </div>
    </div>
  );
}

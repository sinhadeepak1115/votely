import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to PollMaster</h1>
          <p className="text-xl mb-8">
            Create and participate in polls easily. Get instant results and
            insights.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/create">
              <Button size="lg">Create a Poll</Button>
            </Link>
            <Link href="/polls">
              <Button size="lg" variant="outline">
                View Trending Polls
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

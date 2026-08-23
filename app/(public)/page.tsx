// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Small crimes. Big laughs.</div>

        <p className="mt-8">
          Turn your office into a playground. Create secret missions, coordinate harmless pranks,
          and transform mundane workdays into memorable adventures.
        </p>

        <p className="mt-4">
          From desk drops to surprise deliveries, Pocket Heist helps you plan the perfect prank.
          Track active missions, manage assignments, and build your archive of legendary heists.
        </p>
        

        <p className="mt-4">
          Ready to get started? Log in to view your active heists or create a new mission today.
        </p>
      </div>
    </div>
  )
}

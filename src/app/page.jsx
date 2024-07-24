import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Edunify</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add School Card */}
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Add School</h2>
          <p className="mb-4">Add new schools to the database and manage school information easily.</p>
          <Link href="/addSchool" className="btn-primary">
            Go to Add School
          </Link>
        </div>

        {/* Show Schools Card */}
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Show Schools</h2>
          <p className="mb-4">View the list of all schools and their details.</p>
          <Link href="/showSchools" className="btn-primary">
            Go to Show Schools
          </Link>
        </div>
      </div>
    </div>
  );
}

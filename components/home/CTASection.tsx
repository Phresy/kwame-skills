import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>

        <p className="text-xl text-gray-600 mb-8">
          Join thousands of local workers and customers already using
          Kwame Skills
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/register?role=skiller">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition">
              Offer Your Services
            </button>
          </Link>

          <Link href="/register?role=client">
            <button className="px-8 py-3 border-2 border-gray-300 rounded-full font-semibold hover:border-blue-600 transition">
              Find a Local Pro
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
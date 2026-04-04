export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide text-[#6b2d2c] mb-6">
          BROOKI
        </h1>
        <h2 className="text-xl font-semibold text-black mb-1">Sign in</h2>
        <p className="text-gray-500 text-sm mb-6">
          Sign in or create an account
        </p>
        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium text-sm mb-6">
          Continue with shop
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6b2d2c] mb-4"
        />
        <button className="w-full bg-[#6b2d2c] text-white py-3 rounded-xl font-semibold text-sm mb-4">
          Continue
        </button>
        <label className="flex items-center gap-2 text-sm text-gray-700 mb-6 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-[#6b2d2c]" />
          Email me with news and offers
        </label>
        <p className="text-xs text-gray-400">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of service</span>
        </p>
      </div>
      <p className="mt-6 text-sm text-pink-300 cursor-pointer">
        Privacy policy
      </p>
    </div>
  );
}

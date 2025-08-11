export default function SearchBar({ value, onChange, onSubmit, onCurrentLocation }) {
  return (
    <div className="flex gap-2 w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex gap-2 flex-1"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter city (e.g. London)"
          className="flex-1 px-4 py-2 rounded-md border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700"
        >
          Search
        </button>
      </form>
      <button
        onClick={onCurrentLocation}
        className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700"
        title="Get current location weather"
      >
        📍
      </button>
    </div>
  );
}

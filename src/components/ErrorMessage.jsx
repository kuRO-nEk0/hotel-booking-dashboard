export function ErrorMessage({ message }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center max-w-lg mx-auto mt-20 shadow-sm">
      <div className="text-rose-500 text-5xl mb-4">⚠️</div>
      <h3 className="text-xl font-bold text-rose-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-rose-600 mb-8">{message}</p>
      
      {/* A friendly action to help the user recover from the error */}
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
      >
        Reload Dashboard
      </button>
    </div>
  );
}

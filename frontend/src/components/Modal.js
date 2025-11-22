export default function Modal({ children, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
          
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-500 text-white w-7 h-7 rounded-full"
          >
            ✕
          </button>
  
          {children}
        </div>
      </div>
    );
  }
  
/**
 * Utility function to show a "Coming soon..." dialog
 */
export function showComingSoonDialog() {
  // Create a modal dialog backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
  backdrop.style.animation = 'fadeIn 0.3s ease-in-out';
  
  // Create the modal content
  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-xl p-8 max-w-md w-full mx-4 flex flex-col items-center text-center';
  modal.style.animation = 'scaleIn 0.3s ease-in-out';
  modal.innerHTML = `
    <div class="w-32 h-32 relative mb-6">
      <img src="/logo.jpeg" alt="askexperts.io" class="w-full h-full object-contain" />
    </div>
    <h3 class="text-2xl font-bold text-[#0F172A] mb-2">Coming soon...</h3>
    <p class="text-gray-600 mb-6">We're working hard to bring you something amazing!</p>
    <button class="bg-[#6A4C93] hover:bg-[#5A3C83] text-white py-2 px-6 rounded-full font-medium transition-colors" id="close-modal">
      Got it
    </button>
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Add to DOM
  document.body.appendChild(backdrop);
  backdrop.appendChild(modal);
  
  // Close modal when clicking the close button or backdrop
  const closeModal = () => {
    backdrop.style.animation = 'fadeIn 0.3s ease-in-out reverse';
    modal.style.animation = 'scaleIn 0.3s ease-in-out reverse';
    setTimeout(() => {
      backdrop.remove();
      style.remove();
    }, 300);
  };
  
  document.getElementById('close-modal')?.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}
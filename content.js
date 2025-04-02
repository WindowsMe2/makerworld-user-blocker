let blockedUsers = [];

// Initial setup
loadBlockedUsers();
applyFilters();

// Listen for DOM changes to filter new content
const observer = new MutationObserver(function(mutations) {
  applyFilters();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateBlockedUsers') {
    loadBlockedUsers();
    applyFilters();
  }
});

function loadBlockedUsers() {
  chrome.storage.sync.get(['blockedUsers'], function(result) {
    blockedUsers = result.blockedUsers || [];
    applyFilters();
  });
}

function applyFilters() {
  // Target the design cards in the makerworld.com layout
  const modelCards = document.querySelectorAll('.js-design-card');
  
  modelCards.forEach(card => {
    // Find the author name span within the card
    const authorNameElement = card.querySelector('.author-name');
    
    if (authorNameElement) {
      const username = authorNameElement.textContent.trim();
      
      if (username && blockedUsers.includes(username)) {
        // Hide the entire design card
        const parentContainer = card.closest('.mw-css-0');
        if (parentContainer) {
          parentContainer.style.display = 'none';
        } else {
          card.style.display = 'none';
        }
        
        // Optional: Replace with blocked message
        if (!card.classList.contains('blocked-message-added')) {
          const blockedMsg = document.createElement('div');
          blockedMsg.className = 'blocked-content-message';
          blockedMsg.textContent = 'Content from blocked user hidden';
          blockedMsg.style.padding = '10px';
          blockedMsg.style.margin = '10px 0';
          blockedMsg.style.backgroundColor = '#f8f8f8';
          blockedMsg.style.border = '1px solid #ddd';
          blockedMsg.style.borderRadius = '4px';
          blockedMsg.style.textAlign = 'center';
          blockedMsg.style.color = '#666';
          
          // Insert message before the hidden card
          if (parentContainer) {
            parentContainer.parentNode.insertBefore(blockedMsg, parentContainer);
          } else {
            card.parentNode.insertBefore(blockedMsg, card);
          }
          card.classList.add('blocked-message-added');
        }
      }
    }
  });
}

// Additional check for new content loading (infinite scroll)
window.addEventListener('scroll', debounce(function() {
  applyFilters();
}, 200));

// Helper function for debouncing
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

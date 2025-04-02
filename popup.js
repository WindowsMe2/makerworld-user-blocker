document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.getElementById('addBtn');
  const newUserInput = document.getElementById('newUser');
  const blockedList = document.getElementById('blockedList');

  // Load blocked users from storage and display them
  loadBlockedUsers();

  // Add new user to block list
  addBtn.addEventListener('click', function() {
    const username = newUserInput.value.trim();
    if (username) {
      chrome.storage.sync.get(['blockedUsers'], function(result) {
        const blockedUsers = result.blockedUsers || [];
        
        // Check if user is already blocked
        if (!blockedUsers.includes(username)) {
          blockedUsers.push(username);
          chrome.storage.sync.set({blockedUsers: blockedUsers}, function() {
            addUserToList(username);
            newUserInput.value = '';
            
            // Notify content script of the update
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              if (tabs[0] && tabs[0].url.includes('makerworld.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'updateBlockedUsers'});
              }
            });
          });
        } else {
          alert('This user is already blocked');
          newUserInput.value = '';
        }
      });
    }
  });

  // Enter key functionality
  newUserInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      addBtn.click();
    }
  });

  function loadBlockedUsers() {
    chrome.storage.sync.get(['blockedUsers'], function(result) {
      const blockedUsers = result.blockedUsers || [];
      blockedList.innerHTML = '';
      
      if (blockedUsers.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No users blocked yet';
        emptyMessage.style.padding = '10px';
        emptyMessage.style.color = '#666';
        blockedList.appendChild(emptyMessage);
      } else {
        blockedUsers.forEach(username => {
          addUserToList(username);
        });
      }
    });
  }

  function addUserToList(username) {
    const li = document.createElement('li');
    
    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = username;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', function() {
      removeUser(username, li);
    });
    
    li.appendChild(usernameSpan);
    li.appendChild(removeBtn);
    blockedList.appendChild(li);
  }

  function removeUser(username, listItem) {
    chrome.storage.sync.get(['blockedUsers'], function(result) {
      let blockedUsers = result.blockedUsers || [];
      blockedUsers = blockedUsers.filter(user => user !== username);
      
      chrome.storage.sync.set({blockedUsers: blockedUsers}, function() {
        listItem.remove();
        
        // Check if the list is now empty
        if (blockedUsers.length === 0) {
          const emptyMessage = document.createElement('p');
          emptyMessage.textContent = 'No users blocked yet';
          emptyMessage.style.padding = '10px';
          emptyMessage.style.color = '#666';
          blockedList.appendChild(emptyMessage);
        }
        
        // Notify content script of the update
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs[0] && tabs[0].url.includes('makerworld.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'updateBlockedUsers'});
          }
        });
      });
    });
  }
});

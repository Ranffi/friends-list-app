const axios = require('axios');

const render = (friends) => {
  const friendsList = document.querySelector('#friends-list');
  const listHTML = friends.map(friend => {
    return `
      <li class='friend' data-id='${friend.id}'>
        <h2>${friend.name}</h2>
        <span>${friend.rating}</span>
        <button class='add'>+</button>
        <button class='minus'>-</button>
        <button class='delete'>x</button>
      </li>
    `
  }).join('');
  friendsList.innerHTML = listHTML;
};

const init = async() => {
  const response = await axios.get('/api/friends');
  const friends = response.data;
  render(friends);
}

init();

document.querySelector('ul').addEventListener('click', async(event) => {
  if (event.target.tagName === 'BUTTON'){
    const buttonType = event.target.className;
    const id = event.target.parentNode.getAttribute('data-id');
    if (buttonType === 'add'){
      await axios.put(`/api/friends/${id}`, {
        method: 'add'
      })
    } else if (buttonType === 'minus') {
      await axios.put(`/api/friends/${id}`, {
        method: 'minus'
      })
    } else if (buttonType === 'delete') {
      console.log('delete');
      await axios.delete(`/api/friends/${id}`, {});
    }
    init();
  }
})
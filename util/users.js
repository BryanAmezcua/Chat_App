const users = [];

// Join user to chat

const userJoin = (id, userName, chatRoom) => {

    const user = { id, userName, chatRoom };

    users.push(user);
    return user;
};

// User leaves chat room
const userLeavesChatRoom = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

// Get all users in a room
const getRoomUsers = (room) => {
    return users.filter(user.room === room);
};

module.exports = {
    userJoin,
    userLeavesChatRoom,
    getRoomUsers

};
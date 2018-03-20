import { db } from '../fire/firestore';


const definedRole = function() {

  const roles = ['nurse', 'villager', 'mafia', 'villager', 'cop', 'mafia', 'villager', 'villager', 'mafia', 'villager', 'villager', 'villager', 'mafia', 'villager', 'villager', 'mafia']

  const placedRoles = [];

  const randomNumber = max => Math.floor(Math.random() * Math.floor(max));
  const startingIndex = randomNumber(17);

  for(let i = 0; i < roles.length; i++) {
    let pointer = (i + startingIndex) % roles.length;
    placedRoles.push(roles[pointer]);
  }
  db.collection("rooms").doc("room1").collection("roles").doc("roles").set({roles: placedRoles});
  return placedRoles;
}

export default definedRole;

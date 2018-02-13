console.log("home.js");
particlesJS.load('particles-js', './js/particles2.json'
 , function(){
  	console.log("Particles Loaded");
  }

);

// console.clear();
// let canvas = document.createElement("canvas");
// let ctx = canvas.getContext("2d");

// const PADDING = 5;
// const MARGIN = 20;
// const CURVATURE = 0.2;
// const CONNECTABLE = 150;
// const FOCUSABLE = 200;
// const ELEMENTS = 300;

// let elements = [];
// let connections = [];
// let mouse = { x: 0, y: 0 }

// function setup() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   $('#canvas-container').append(canvas);
  
//   mouse.x = canvas.width / 2;
//   mouse.y = canvas.width / 2;
  
//   window.addEventListener("mousemove", event => {
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
//   });
  
//   for (let i = 0; i < ELEMENTS; i++) {
//     let element = {
//       id: i,
//       size: 10 + Math.random() * 10,
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height
//     };
    
//     if (!willOverlap(element)) {
//       elements.push(element);
//     }
//   }
  
//   for (let i = 0; i < 50; i++) {
//     let to = elements[Math.floor(Math.random() * elements.length)];
//     let candidates = elements.filter(element => distance(to, element) < CONNECTABLE);
//     let from = candidates[Math.floor(Math.random() * candidates.length)];
//     let connection = { to: to.id, from: from.id };
//     let existing = findConnection(connection.from, connection.to);
    
//     if (to !== from && !existing) {
//       connections.push(connection);
//     }
//   }
  
//   removeOrphans();
// }

// function render() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//   let drawn = {};
  
//   for (let from of elements) {
//     for (let to of elements) {
//       if (from === to) continue;
//       if (drawn[[from.id, to.id]]) continue;
//       drawn[[from.id, to.id]] = true;
//       drawn[[to.id, from.id]] = true;
      
//       let dist = distance(from, to);
//       if (dist > CONNECTABLE) continue;
//       let focus = distance(from, mouse);
//       if (focus > FOCUSABLE) continue;
//       let alpha = (1 - dist / CONNECTABLE) * (1 - focus / FOCUSABLE);

//       let vector = [from.x - to.x, from.y - to.y];
//       let normal = [-vector[1], vector[0]];
//       let offset = [normal[0] * CURVATURE, normal[1] * CURVATURE];

//       let midpoint = {
//         x: (from.x + to.x) / 2,
//         y: (from.y + to.y) / 2
//       };

//       let handle = {
//         x: offset[0] + midpoint.x,
//         y: offset[1] + midpoint.y
//       };

//       ctx.strokeStyle = `rgba(227, 208, 0, ${alpha})`;
//       ctx.lineWidth = 3;
//       ctx.beginPath();
//       ctx.moveTo(from.x, from.y);
//       ctx.quadraticCurveTo(handle.x, handle.y, to.x, to.y)
//       ctx.stroke();
//     }
//   }
  
//   for (let element of elements) {
//     let focus = distance(element, mouse);
//     if (focus > FOCUSABLE) continue;
//     let alpha = 1 - focus / FOCUSABLE;
    
//     ctx.fillStyle = `#F8E71C`;
//     ctx.beginPath();
//     ctx.arc(element.x, element.y, element.size + PADDING, 0, Math.PI * 2, false);
//     ctx.fill();
//     ctx.fillStyle = `rgba(255, 235, 0, ${alpha})`;
    
//     ctx.beginPath();
//     ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2, false);
//     ctx.fill();
//   }
// }

// function distance(p, q) {
//   return Math.sqrt(Math.pow(q.y - p.y, 2) + Math.pow(q.x - p.x, 2));
// }

// function willOverlap(element) {
//   return elements.some(other => {
//     return distance(element, other) < element.size + other.size + MARGIN;
//   });
// }

// function removeOrphans() {
//   let orphans = new Set(elements.map(element => element.id));
  
//   for (let connection of connections) {
//     orphans.delete(connection.to);
//     orphans.delete(connection.from);
//   }
  
//   elements = elements.filter(element => {
//     return !orphans.has(element.id);
//   });
// }

// function findElement(id) {
//   return elements.find(element => element.id === id);
// }

// function findConnection(to, from) {
//   return connections.find(connection => (
//     (connection.to === to && connection.from === from) ||
//     (connection.to === from && connection.from === to)
//   ));
// }

// function getConnections(elementId) {
//   return connections.find(connection => (
//     connection.from === elementId ||
//     connection.to === elementId
//   ));
// }

// function play() {
//   setTimeout(play, 30);
//   render();
// }

// setup();
// play();
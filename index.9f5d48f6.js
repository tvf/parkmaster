function e(e,t){e.strokeRect(-t.wheel_diameter/2,-t.wheel_width/2,t.wheel_diameter,t.wheel_width)}function t(t,a){t.resetTransform(),t.clearRect(0,0,720,720),t.translate(360,360),t.scale(40,-40),t.lineJoin="round";t.lineWidth=.02,t.translate(a.x,a.y),t.rotate(a.theta),t.beginPath(),t.arc(0,0,.05,0,2*Math.PI),t.fill(),function(e,t){e.strokeRect(-(t.box_length-t.L)/2,-t.box_width/2,t.box_length,t.box_width)}(t,a),t.save(),t.translate(0,a.gauge/2),e(t,a),t.restore(),t.save(),t.translate(0,-a.gauge/2),e(t,a),t.restore();let i=0,n=0,h=1/0;0!=a.phi&&(h=a.L/Math.tan(Math.abs(a.phi)),i=Math.sign(a.phi)*Math.atan(a.L/(h+a.gauge/2)),n=Math.sign(a.phi)*Math.atan(a.L/(h-a.gauge/2))),t.save(),t.strokeStyle="red",t.beginPath(),isFinite(h)?t.arc(0,Math.sign(a.phi)*h,h,0,2*Math.PI):(t.moveTo(-1e3,0),t.lineTo(1e3,0)),t.stroke(),t.closePath(),t.restore(),t.save(),t.translate(a.L,a.gauge/2),t.rotate(a.phi>0?n:i),e(t,a),t.restore(),t.save(),t.translate(a.L,-a.gauge/2),t.rotate(a.phi>0?i:n),e(t,a),t.restore()}!function(){const e={L:3,box_length:4,box_width:2,wheel_width:.25,wheel_diameter:.75,gauge:1.5,x:0,y:0,theta:Math.PI/2,s:0,phi:0},a=document.getElementById("simulation").getContext("2d");a&&t(a,e);let i,n,h=!1,r=!1,o=!1,s=!1;window.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&(h=!0),"ArrowRight"===e.key&&(r=!0),"ArrowUp"===e.key&&(o=!0),"ArrowDown"===e.key&&(s=!0),(h||r||o||s)&&window.requestAnimationFrame(l)})),window.addEventListener("keyup",(e=>{"ArrowLeft"===e.key&&(h=!1),"ArrowRight"===e.key&&(r=!1),"ArrowUp"===e.key&&(o=!1),"ArrowDown"===e.key&&(s=!1)}));let w=!1;function l(d){void 0===i&&(i=d);const g=d-n;isFinite(g)&&n!==d&&(w||(e.x+=g/400*e.s*Math.cos(e.theta),e.y+=g/400*e.s*Math.sin(e.theta),e.theta+=g/400*e.s/e.L*Math.tan(e.phi),h&&(e.phi+=g/1e3),r&&(e.phi-=g/1e3),e.phi=Math.min(e.phi,.4*Math.PI),e.phi=Math.max(e.phi,.4*-Math.PI),e.s=o?1:s?-1:0),a&&t(a,e)),n=d,h||r||o||s?(window.requestAnimationFrame(l),w=!1):w=!0}window.requestAnimationFrame(l)}();
//# sourceMappingURL=index.9f5d48f6.js.map

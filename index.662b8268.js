function e(e,t){e.strokeRect(-t.wheel_diameter/2,-t.wheel_width/2,t.wheel_diameter,t.wheel_width)}function t(t,a,i){t.resetTransform(),t.clearRect(0,0,720,720),t.translate(360,360),t.scale(i,-i),t.lineJoin="round";t.lineWidth=.02,t.translate(a.x,a.y),t.rotate(a.theta),t.beginPath(),t.arc(0,0,.05,0,2*Math.PI),t.fill(),function(e,t){e.strokeRect(-(t.box_length-t.L)/2,-t.box_width/2,t.box_length,t.box_width)}(t,a),t.save(),t.translate(0,a.gauge/2),e(t,a),t.restore(),t.save(),t.translate(0,-a.gauge/2),e(t,a),t.restore();let n=0,h=0,r=1/0;0!=a.phi&&(r=a.L/Math.tan(Math.abs(a.phi)),n=Math.sign(a.phi)*Math.atan(a.L/(r+a.gauge/2)),h=Math.sign(a.phi)*Math.atan(a.L/(r-a.gauge/2))),t.save(),t.strokeStyle="red",t.beginPath(),isFinite(r)?t.arc(0,Math.sign(a.phi)*r,r,0,2*Math.PI):(t.moveTo(-1e3,0),t.lineTo(1e3,0)),t.stroke(),t.closePath(),t.restore(),t.save(),t.translate(a.L,a.gauge/2),t.rotate(a.phi>0?h:n),e(t,a),t.restore(),t.save(),t.translate(a.L,-a.gauge/2),t.rotate(a.phi>0?n:h),e(t,a),t.restore()}!function(){const e={L:3,box_length:4,box_width:2,wheel_width:.25,wheel_diameter:.75,gauge:1.5,x:0,y:0,theta:Math.PI/2,s:0,phi:0};let a=40;const i=document.getElementById("simulation").getContext("2d");i&&t(i,e,a);let n,h,r=!1,o=!1,s=!1,w=!1;window.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&(r=!0),"ArrowRight"===e.key&&(o=!0),"ArrowUp"===e.key&&(s=!0),"ArrowDown"===e.key&&(w=!0);let t=!1;"+"===e.key&&(a*=2,t=!0),"-"===e.key&&(a/=2,t=!0),(t||r||o||s||w)&&window.requestAnimationFrame(d)})),window.addEventListener("keyup",(e=>{"ArrowLeft"===e.key&&(r=!1),"ArrowRight"===e.key&&(o=!1),"ArrowUp"===e.key&&(s=!1),"ArrowDown"===e.key&&(w=!1)}));let l=!1;function d(g){void 0===n&&(n=g);const u=g-h;isFinite(u)&&h!==g&&(l||(e.x+=u/400*e.s*Math.cos(e.theta),e.y+=u/400*e.s*Math.sin(e.theta),e.theta+=u/400*e.s/e.L*Math.tan(e.phi),r&&(e.phi+=u/1e3),o&&(e.phi-=u/1e3),e.phi=Math.min(e.phi,.4*Math.PI),e.phi=Math.max(e.phi,.4*-Math.PI),e.s=s?1:w?-1:0),i&&t(i,e,a)),h=g,r||o||s||w?(window.requestAnimationFrame(d),l=!1):l=!0}window.requestAnimationFrame(d)}();
//# sourceMappingURL=index.662b8268.js.map
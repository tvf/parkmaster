function e(e,t){e.strokeRect(-t.wheel_diameter/2,-t.wheel_width/2,t.wheel_diameter,t.wheel_width)}function t(t,a,r){t.resetTransform(),t.clearRect(0,0,720,720),t.translate(360,360),t.scale(r,-r),t.lineJoin="round";t.lineWidth=.02,t.translate(a.x,a.y),t.rotate(a.theta),t.beginPath(),t.arc(0,0,.05,0,2*Math.PI),t.fill(),function(e,t){e.strokeRect(-(t.box_length-t.L)/2,-t.box_width/2,t.box_length,t.box_width)}(t,a),t.save(),t.translate(0,a.gauge/2),e(t,a),t.restore(),t.save(),t.translate(0,-a.gauge/2),e(t,a),t.restore();let i=0,h=0,n=1/0;0!=a.phi&&(n=a.L/Math.tan(Math.abs(a.phi)),i=Math.sign(a.phi)*Math.atan(a.L/(n+a.gauge/2)),h=Math.sign(a.phi)*Math.atan(a.L/(n-a.gauge/2))),t.save(),t.strokeStyle="red",t.beginPath(),isFinite(n)?t.arc(0,Math.sign(a.phi)*n,n,0,2*Math.PI):(t.moveTo(-1e3,0),t.lineTo(1e3,0)),t.stroke(),t.closePath(),t.restore(),t.save(),t.translate(a.L,a.gauge/2),t.rotate(a.phi>0?h:i),e(t,a),t.restore(),t.save(),t.translate(a.L,-a.gauge/2),t.rotate(a.phi>0?i:h),e(t,a),t.restore(),a.trailers.forEach((r=>{t.rotate(r.theta),t.translate(-r.L,0),t.save(),t.translate(0,r.gauge/2),e(t,a),t.restore(),t.save(),t.translate(0,-r.gauge/2),e(t,a),t.restore(),t.strokeRect(-r.box_length/2,-r.box_width/2,r.box_length,r.box_width),t.strokeRect(r.box_length/2,0,r.L-r.box_length/2,0),t.beginPath(),t.arc(r.L,0,.05,0,2*Math.PI),t.fill()}))}!function(){const e={L:3,box_length:4,box_width:2,wheel_width:.25,wheel_diameter:.75,gauge:1.5,x:0,y:0,theta:Math.PI/2,s:0,phi:0,trailers:[]};let a=40;const r=document.getElementById("simulation").getContext("2d");r&&t(r,e,a);let i,h,n=!1,o=!1,s=!1,l=!1;window.addEventListener("keydown",(t=>{"ArrowLeft"===t.key&&(n=!0),"ArrowRight"===t.key&&(o=!0),"ArrowUp"===t.key&&(s=!0),"ArrowDown"===t.key&&(l=!0);let r=!1;if("+"===t.key&&(a*=2,r=!0),"-"===t.key&&(a/=2,r=!0),"t"===t.key){let t={L:3,box_length:2,box_width:2,wheel_width:.25,wheel_diameter:.75,gauge:1.5,theta:0};e.trailers.push(t),r=!0}(r||n||o||s||l)&&window.requestAnimationFrame(w)})),window.addEventListener("keyup",(e=>{"ArrowLeft"===e.key&&(n=!1),"ArrowRight"===e.key&&(o=!1),"ArrowUp"===e.key&&(s=!1),"ArrowDown"===e.key&&(l=!1)}));let g=!1;function w(d){void 0===i&&(i=d);const c=d-h;if(isFinite(c)&&h!==d){if(!g){e.x+=c/400*e.s*Math.cos(e.theta),e.y+=c/400*e.s*Math.sin(e.theta);let t=c/400*e.s/e.L*Math.tan(e.phi);e.theta+=t;let a=t;for(var u=0;u<e.trailers.length;++u){let r=1;for(var _=0;_<u;++_)r*=Math.cos(-e.trailers[_].theta);t=c/400*e.s/e.trailers[u].L*r*Math.sin(-e.trailers[u].theta)-a,a+=t,e.trailers[u].theta+=t}n&&(e.phi+=c/1e3),o&&(e.phi-=c/1e3),e.phi=Math.min(e.phi,.4*Math.PI),e.phi=Math.max(e.phi,.4*-Math.PI),e.s=s?1:l?-1:0}r&&t(r,e,a)}h=d,n||o||s||l?(window.requestAnimationFrame(w),g=!1):g=!0}window.requestAnimationFrame(w)}();
//# sourceMappingURL=index.3f2553a9.js.map

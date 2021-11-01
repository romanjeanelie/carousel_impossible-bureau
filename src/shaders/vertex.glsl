  precision mediump float; 

  uniform float uOffset;
  varying vec2 vUv; 


  void main(){

    vec3 newPosition = position; 
    float offset = -0.3;
    float circle = distance(vec2(uv.x + uOffset, uv.y), vec2(0.5));
     circle = smoothstep(0.4, 1., circle) * uOffset * 4.;
    newPosition.x += 1. - circle * 200.; 
    newPosition.z += 1.- circle * 80.; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);

    vUv = uv;
  }
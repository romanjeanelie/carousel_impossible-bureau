  precision mediump float; 

  uniform float uOffset;
  varying vec2 vUv; 
  varying float vCircle; 


  void main(){
    vec3 newPosition = position; 

    // Circle
    float circle = distance(vec2(uv.x + uOffset, uv.y), vec2(0.5));
    circle = smoothstep(0.4, 1., circle) * uOffset * 4.;

    // Update vertices position
    newPosition.x += 1. - circle * 200.; 
    newPosition.z += 1.- circle * 90.; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);

    vUv = uv;
    vCircle = circle;
  }
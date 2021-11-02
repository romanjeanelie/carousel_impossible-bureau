  precision mediump float; 

  uniform sampler2D uTexture; 
  uniform vec3 uColor;
  uniform float uOffset;
  
  varying vec2 vUv; 
  varying float vCircle; 


  void main(){
    vec3 color = vec3(0.); 
  
    vec3 texture = texture2D(uTexture, vUv + vCircle * 0.01).rgb; 

    gl_FragColor = vec4(texture, 1.);
    
  }
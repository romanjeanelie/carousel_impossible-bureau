  precision mediump float; 

  uniform sampler2D uTexture; 
  uniform vec3 uColor;
  uniform float uOffset;
  

  varying vec2 vUv; 

  void main(){
    vec3 color = vec3(0.); 

    float offset = -0.5;
    float circle = distance(vec2(vUv.x + uOffset, vUv.y), vec2(0.5));
    circle = smoothstep(0.4, 1., circle);
    color += circle * uOffset * 20.; 
    vec3 texture = texture2D(uTexture, vUv + circle * 0.05).rgb; 

    gl_FragColor = vec4(texture, 1.);
    
  }
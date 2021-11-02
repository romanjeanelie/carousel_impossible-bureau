const useAnimation = (refs) => {
  const hide = () => {
    refs.current.forEach((ref, i) => {
      ref.style.opacity = 0;
    });
  };
  const display = (i) => {
    refs.current[i].style.opacity = 1;
  };

  return [display, hide];
};

export default useAnimation;

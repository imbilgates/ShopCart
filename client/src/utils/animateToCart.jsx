export const animateToCart = (imageEl) => {
  const cartIcon = document.getElementById("cart-icon");
  if (!imageEl || !cartIcon) return;

  const imgRect = imageEl.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const clone = imageEl.cloneNode(true);
  clone.style.position = "fixed";
  clone.style.zIndex = "1000";
  clone.style.left = `${imgRect.left}px`;
  clone.style.top = `${imgRect.top}px`;
  clone.style.width = `${imgRect.width}px`;
  clone.style.height = `${imgRect.height}px`;
  clone.style.borderRadius = "12px";
  clone.style.pointerEvents = "none";
  clone.style.willChange = "transform, opacity";
  clone.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease";

  document.body.appendChild(clone);

  // Calculate the translate distances
  const translateX = cartRect.left + cartRect.width / 2 - imgRect.left - imgRect.width / 2;
  const translateY = cartRect.top + cartRect.height / 2 - imgRect.top - imgRect.height / 2;

  requestAnimationFrame(() => {
    clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.2) rotate(360deg)`;
    clone.style.opacity = "0";
  });

  setTimeout(() => {
    document.body.removeChild(clone);
  }, 900);
};

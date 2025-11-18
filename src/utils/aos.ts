import AOS from 'aos';

export const initAOS = () => {
  if (typeof window !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      anchorPlacement: 'top-bottom',
    });
  }
};

export const refreshAOS = () => {
  if (typeof window !== 'undefined') {
    AOS.refresh();
  }
};

export const aosConfig = {
  fadeUp: {
    'data-aos': 'fade-up',
    'data-aos-duration': '600',
  },
  fadeDown: {
    'data-aos': 'fade-down',
    'data-aos-duration': '600',
  },
  fadeLeft: {
    'data-aos': 'fade-left',
    'data-aos-duration': '600',
  },
  fadeRight: {
    'data-aos': 'fade-right',
    'data-aos-duration': '600',
  },
  zoomIn: {
    'data-aos': 'zoom-in',
    'data-aos-duration': '600',
  },
  slideUp: {
    'data-aos': 'slide-up',
    'data-aos-duration': '600',
  },
  slideDown: {
    'data-aos': 'slide-down',
    'data-aos-duration': '600',
  },
  slideLeft: {
    'data-aos': 'slide-left',
    'data-aos-duration': '600',
  },
  slideRight: {
    'data-aos': 'slide-right',
    'data-aos-duration': '600',
  },
};

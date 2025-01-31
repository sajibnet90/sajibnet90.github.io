
//assets/js/main.js
(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);


  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/* 
Project details 
Script to load project details 

*/
document.addEventListener('DOMContentLoaded', function() {  
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  const projects = {
    'workshop-booking': {
      title: 'Workshop Booking System',
      description: 'This project is built using the MERN Stack (MongoDB, Express.js, React, and Node.js). The primary purpose of this application is to streamline the process of creating and managing tickets for car repair requests from customers. It allows service providers to efficiently accept and track repair requests, ensuring a smooth and organized workflow. Key features include real-time updates, user authentication, and a responsive user interface.',
      images: [
        'assets/img/portfolio/Wrk2.png',
        'assets/img/portfolio/Wrk3.png',
        'assets/img/portfolio/Wrk4.png',
        'assets/img/portfolio/Wrk5.png',
        'assets/img/portfolio/Wrk6.png'
      ],
      info: [
        { label: 'Category', value: 'Web Application' },
        { label: 'Client', value: 'School Project' },
        { label: 'Project date', value: 'April, 2024' },
        { label: 'Project Repo', value: '<a href="https://github.com/sajibnet90/WorkshopAppointment-MERN-JWT-RolebasedAuthentication.git">Workshop Booking System</a>' }
      ]
    },
    'shopping-list': {
      title: 'Shopping List App',
      description: 'This is a real-time, shareable shopping list application built with React Native and Firebase. It allows users to collaboratively create and manage shopping lists, ensuring everyone stays updated with the latest changes. Key features include real-time synchronization, user authentication, and a user-friendly interface designed for seamless collaboration.',
      images: [
        'assets/img/portfolio/Shpl-1.jpg',
        'assets/img/portfolio/Shpl-2.jpg',
        'assets/img/portfolio/Shpl-3.jpg',
        'assets/img/portfolio/Shpl-4.jpg',
        'assets/img/portfolio/Shpl-5.jpg',
        'assets/img/portfolio/Shpl-6.jpg'
      ],
      info: [
        { label: 'Category', value: 'Mobile Application' },
        { label: 'Client', value: 'School Project' },
        { label: 'Project date', value: 'August, 2024' },
        { label: 'Project Repo', value: '<a href="https://github.com/sajibnet90/ShoppingListApp.git">ShoppingListApp</a>' }
      ]
    },

    'weather-station': {
      title: 'Weather Station',
      description: 'This project aims to develop a functional weather station to measure wind direction and speed, enhancing our understanding of embedded systems. The hardware components include an Arduino Mega, which processes sensor data and displays readings on a 16x2 LCD display. A 4x4 keypad is used for user input, while an Ethernet module enables internet connectivity, allowing data transmission to a Raspberry Pi broker. Additional components such as a breadboard, wires, connectors, and resistors facilitate circuit assembly. The software is developed using Arduino IDE with C++, utilizing libraries like LiquidCrystal.h for LCD control, Keypad.h for keypad input, Ethernet.h for connectivity, ArduinoJson.h for JSON handling, TimerOne.h for timer management, and PubSubClient.h for MQTT communication. Initial circuit simulations were conducted using Tinkercad. This project strengthens our portfolio while deepening our knowledge of embedded systems and IoT integration.',
      images: [
        'assets/img/portfolio/weatherStation.png',
        'assets/img/portfolio/weatherStation2.png'
      ],
      info: [
        { label: 'Category', value: 'Embedded System Project' },
        { label: 'Client', value: 'School Project' },
        { label: 'Project date', value: 'January, 2023' },
        { label: 'Project Repo', value: '<a href="https://github.com/sajibnet90/embedded-exercise-weatherSystem">Weather System</a>' }
      ]
    },

    'flight-status': {
      title: 'React-Native FlightStatus-Weather App',
      description: 'This project is a React-Native application that provides real-time flight status and weather updates. It integrates with various APIs to fetch flight information and weather data, offering users a seamless experience to track flights and check weather conditions.',
      images: [
        'assets/img/portfolio/flight1.jpg',
        'assets/img/portfolio/flight2.jpg',
        'assets/img/portfolio/flight3.png',
        'assets/img/portfolio/flight4.png',
        'assets/img/portfolio/flight5.png',
      ],
      info: [
        { label: 'Category', value: 'Mobile Application' },
        { label: 'Client', value: 'Personal Project' },
        { label: 'Project date', value: 'August, 2023' },
        { label: 'Project Repo', value: '<a href="https://github.com/sajibnet90/React-native-FlightWeatherApp.git">FlightStatusWeatherApp</a>' }
      ]
    },

    'expo-location-battery-map-app': {
      title: 'Expo Location Battery Map App',
      description: 'This project is a mobile application built with Expo that tracks the device\'s location and battery status, and displays the information on a map. It leverages Expo\'s Location and Battery APIs to provide real-time updates.',
      images: [
        'assets/img/portfolio/location-battery1.png',
        'assets/img/portfolio/location-battery2.jpg',
        'assets/img/portfolio/location-battery3.jpg',
      ],
      info: [
        { label: 'Category', value: 'Mobile Application' },
        { label: 'Client', value: 'Personal Project' },
        { label: 'Project date', value: 'October, 2023' },
        { label: 'Project Repo', value: '<a href="https://github.com/sajibnet90/Expo-Location-Battery-Map-App">Expo-Location-Battery-Map-App</a>' }
      ]
  },

  'superstore': {
  title: 'SuperStore Data Management System',
  description: 'A command-line Java application for managing SuperStore data. Features include customer search functionality, order management, sales analytics, and detailed business reporting. The system processes data from CSV files and implements core Java concepts to handle customer information and sales tracking. Includes robust error handling and data validation to ensure data integrity.',
  images: [
    'assets/img/portfolio/superstore1.png',
    'assets/img/portfolio/superstore2.png',
    'assets/img/portfolio/superstore3.png'
  ],
  info: [
    { label: 'Category', value: 'Web Application' },
    { label: 'Client', value: 'School Project' },
    { label: 'Project date', value: 'December, 2023' },
    { label: 'Project Repo', value: '<a href="https://github.com/sajibnet90/SuperStore-Final-Project">SuperStore-Final-Project</a>' }
  ]
},


    'sea-photos': {
      title: 'Sea Photography',
      description: ' Here is some photos of Sea.',
      images: [
        'assets/img/portfolio/Sea1.jpg',
        'assets/img/portfolio/Sea2.jpg'
      ],
      info: [
        { label: 'Category', value: 'Photography' },
        { label: 'Client', value: 'Personal Project' },
        { label: 'Project date', value: 'March, 2022' },
        { label: 'Project Repo', value: '<a href=" "> Not Applicable </a>' }
      ]
    }
    // Add more projects as needed
  };

  if (projectId && projects[projectId]) {
    const project = projects[projectId];

    document.getElementById('project-title').innerText = project.title;
    document.getElementById('project-description').innerHTML = project.description;

    const projectInfo = document.getElementById('project-info');
    project.info.forEach(infoItem => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${infoItem.label}</strong>: ${infoItem.value}`;
      projectInfo.appendChild(li);
    });

    const portfolioImages = document.getElementById('portfolio-images');
    project.images.forEach(image => {
      const div = document.createElement('div');
      div.className = 'swiper-slide';
      div.innerHTML = `<img src="${image}" alt="">`;
      portfolioImages.appendChild(div);
    });

    // initSwiper(); // Initialize Swiper after loading content
  } 
  // else {
  //   document.getElementById('project-title').innerText = 'Project Not Found';
  //   document.getElementById('project-description').innerText = 'The project you are looking for does not exist.';
  // }
});


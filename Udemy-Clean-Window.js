// ==UserScript==
// @name         Udemy Clean Window
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds a toggle button to hide certain elements on Udemy course pages and adjusts max-height of specific element
// @author       iNdra
// @match        https://www.udemy.com/course/*
// @downloadURL  https://github.com/indramal/Udemy-Clean-Window/blob/main/Udemy-Clean-Window.js
// @updateURL    https://github.com/indramal/Udemy-Clean-Window/blob/main/Udemy-Clean-Window.js
// @homepageURL  https://github.com/indramal/Udemy-Clean-Window/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Function to add toggle button
  function addToggleButton() {
    // Select the target element before which the button should be added
    const targetElement = document.querySelector(
      '.app--row--E-WFM.app--dashboard--Z4Zxm',
    );

    if (targetElement) {
      // Create the toggle button
      const buttonCleanText = 'Clean Window';
      const toggleButton = document.createElement('button');
      toggleButton.innerText = buttonCleanText;

      // Style the button
      toggleButton.style.backgroundColor = '#3498db';
      toggleButton.style.color = '#fff';
      toggleButton.style.border = 'none';
      toggleButton.style.padding = '10px 20px';
      toggleButton.style.borderRadius = '5px';
      toggleButton.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.2)';
      toggleButton.style.cursor = 'pointer';
      toggleButton.style.marginBottom = '10px';

      // Add the toggle functionality
      toggleButton.addEventListener('click', function () {
        // Get the height of the element with the specified classes
        const headerElement = document.querySelector(
          '.app--row--E-WFM.app--header--QuLOL',
        );
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;

        if (window.scrollY !== headerHeight) {
          window.scrollTo({
            top: 0, // Scroll to the top of the page
            left: 0, // No horizontal scroll
            behavior: 'smooth', // Smooth scrolling
          });
          console.log(window.scrollY);
        }

        let visibility = 'hidden';
        const videoTitleElement = document.querySelector(
          '.video-viewer--title-overlay--YZQuH',
        );
        // If the video title is hidden, restore elements visibility and open course content sidebar
        const shouldRestoreVisibility =
          videoTitleElement?.style.visibility === 'hidden';

        // Select the button with the data-purpose attribute
        let openOrCloseSidebarButton = document.querySelector(
          '[data-purpose="sidebar-button-close"]',
        );

        if (shouldRestoreVisibility) {
          toggleButton.textContent = buttonCleanText;
          visibility = 'visible';
          openOrCloseSidebarButton = document.querySelector(
            '[data-purpose="open-course-content"]',
          );
        } else {
          toggleButton.textContent = 'Restore Window';
        }

        openOrCloseSidebarButton?.click(); // Programmatically click the button

        // Toggle the shaka-control-bar element
        const shakaElement = document.querySelector(
          '.shaka-control-bar--control-bar-container--OfnMI',
        );
        if (shakaElement) {
          shakaElement.style.visibility = visibility;
        }

        // Toggle the video-viewer--header-gradient element
        const shadowbarElement = document.querySelector(
          '.video-viewer--header-gradient--x4Zw0',
        );
        if (shadowbarElement) {
          shadowbarElement.style.visibility = visibility;
        }

        // Toggle the video-viewer--title-overlay element
        if (videoTitleElement) {
          videoTitleElement.style.visibility = visibility;
        }

        // Toggle the next-and-previous--container elements
        const nextAndPreviousElements = document.querySelectorAll(
          '.next-and-previous--container--kZxyo',
        );
        nextAndPreviousElements.forEach(function (element) {
          element.style.visibility = visibility;
        });

        const curriculumElements = document.querySelectorAll(
          '.curriculum-item-view--scaled-height-limiter--lEOjL.curriculum-item-view--no-sidebar--LGmz-',
        );
        curriculumElements.forEach(function (element) {
          element.style.maxHeight = 'calc(100vh - 35px)';
        });

        if (window.scrollY !== headerHeight) {
          // Then, after scrolling to the top, scroll down by the header height
          setTimeout(function () {
            window.scrollBy({
              top: headerHeight, // Scroll vertically by the header height
              left: 0, // No horizontal scroll
              behavior: 'smooth', // Smooth scrolling
            });
            console.log(window.scrollY);
          }, 500); // Delay to ensure the first scroll is completed
        }
      });

      // Insert the button before the target element
      targetElement.parentNode.insertBefore(toggleButton, targetElement);
    }
  }

  // Run the functions when the DOM is fully loaded
  window.addEventListener('load', function () {
    addToggleButton();
  });
})();

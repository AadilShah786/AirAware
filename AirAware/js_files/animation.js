// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define animations for each section
const animation=()=>{
    const featureAnimation = gsap.from(".trowharm", {
        opacity: 0,
        x: -400,
        duration: 1,
        stagger: 0.4, // stagger for a nice effect
        ease: "power4.out",
        // scrub:true,
      });
      ScrollTrigger.create({
        trigger: "#harmTable",
        animation: featureAnimation,
        start: "top 70%", // Adjusted start value for delayed animation
        end: "bottom 20%",
        toggleActions: "play none none none", // restart animation every time section enters or leaves viewport
        markers: true, // for debugging, remove in production
        scrub:true,
        once:true,
    });

    const featureAnimation2 = gsap.from(".trowsafe", {
        opacity: 0,
        x: 400,
        duration: 1,
        stagger: 0.8, // stagger for a nice effect
        ease: "power4.out",
        // scrub:true,
      });
      ScrollTrigger.create({
        trigger: "#harmTable",
        animation: featureAnimation2,
        start: "top 70%", // Adjusted start value for delayed animation
        end: "bottom 20%",
        toggleActions: "play none none none", // play animation once, no reverse or restarting actions
        markers: true, // for debugging, remove in production
        scrub: true,
        once:true,
    });
      
}


// const testimonialAnimation = gsap.from(".testimonial-card", {
//   opacity: 0,
//   y: 100,
//   duration: 0.4,
//   stagger: 0.3, // stagger for a nice effect
//   ease: "power4.out",
// });

// const contactAnimation = gsap.from(".contact-form", {
//   opacity: 0,
//   y: 100,
//   duration: 1,
//   ease: "power4.out",
// });

// Attach ScrollTrigger to sections

// ScrollTrigger.create({
//     trigger: ".testimonial-card",
//     animation: testimonialAnimation,
//     start: "top 30%", // Adjusted start value for delayed animation
//     end: "bottom 20%",
//     markers: true, // for debugging, remove in production
// });
  
// ScrollTrigger.create({
//     trigger: "#contact",
//     animation: contactAnimation,
//     start: "top 30%", // Adjusted start value for delayed animation
//     end: "bottom 20%",
//     markers: true, // for debugging, remove in production
// });

  export default animation;
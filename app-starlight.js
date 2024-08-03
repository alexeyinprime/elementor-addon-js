// console.log('DOM loaded')

// import * as starlight from "./js/starlight-modules"
// starlight.slInScopeObserver()
// starlight.slParallax()

slInScopeObserver()
slParallax()

document.breakpoints = [430,768,1420,1920]
// document.slMediaBreakpointWidth = starlight.slMediaBreakpointWidth
document.slMediaBreakpointWidth = slMediaBreakpointWidth

/**
 * Breakpoint change observer
 * 
 * @param {Array} bpArray - breakpoints array
 * @returns {number | false} - new breakpoint or false if not changed
 */
function slMediaBreakpointWidth(bpArray = [1920]) {
  bpArray.sort((a, b) => b - a)
  for (const bp of bpArray) {
    if ( window.matchMedia('(min-width: '+ bp +'px)').matches ) {
      return document.mediaMinWidth != bp ? document.mediaMinWidth = bp : false
    }
  }
  return document.mediaMinWidth != 1 ? document.mediaMinWidth = 1 : false
}
/**
 * Elements inscope observer - set class 'sl-inscope' or 'sl-outscope' for selectors '.sl-scope-observe'
 * 
 * @returns void
 */
function slInScopeObserver() {
  const scopeEl = document.querySelectorAll('.sl-scope-observe')
  if (!scopeEl.length) return

  const windowHeight = window.innerHeight
  setElInScope(scopeEl)
  document.addEventListener('scroll', () => setElInScope(scopeEl))

  function setElInScope(scopeEl = []) {
    scopeEl.forEach(el => {
      const elHeight = el.parentNode.offsetHeight,
            elScrollOffset = el.parentNode.getBoundingClientRect().y
      if (elScrollOffset < windowHeight && elScrollOffset + elHeight > 0) {
        // console.log(elScrollOffset, elScrollOffset+elHeight)
        if(el.classList.contains('sl-outscope')) el.classList.remove('sl-outscope')
        if(!el.classList.contains('sl-inscope')) el.classList.add('sl-inscope')
      } else {
        if(!el.classList.contains('sl-outscope')) el.classList.add('sl-outscope')
        if(el.classList.contains('sl-inscope')) el.classList.remove('sl-inscope')
      }
    })
  }  
}
/**
 * Parallax handler for selectors '.starlight-parallax' on scroll events
 * 
 * @param {(0...1)} [data-parallax-speed=1] of selectors '.starlight-parallax-inner'
 * @param {(0...1)} [data-parallax-amp=0] of selectors '.starlight-parallax-inner' - addition amplitude of parallax element
 * @returns void
 */
function slParallax() {
  const parallaxWrappers = document.querySelectorAll('.starlight-parallax')
  if (!parallaxWrappers.length) return

  const windowHeight = window.innerHeight

  document.addEventListener('scroll', () => {
    parallaxWrappers.forEach(parallaxWrapper => {
      const parallaxWrapperHeight = parallaxWrapper.offsetHeight,
            parallaxWrapperScroll = parallaxWrapper.getBoundingClientRect().y
      if (parallaxWrapperScroll < windowHeight && parallaxWrapperScroll + parallaxWrapperHeight > 0) {
        const  parallaxElements = parallaxWrapper.querySelectorAll('.starlight-parallax-inner')
        if (!parallaxElements.length) return

        parallaxElements.forEach(el => {
          const speed = Number(el.getAttribute("data-parallax-speed")) || 1,
                amp = Number(el.getAttribute("data-parallax-amp")) || 0,
                heightWED = parallaxWrapperHeight - el.offsetHeight, // Wrapper - Element height difference
                kScroll = (windowHeight - parallaxWrapperScroll) / (windowHeight + parallaxWrapperHeight), // k = {0...1}
                offset = (kScroll - (kScroll - .5) * (1 - speed)) * heightWED + (kScroll - .5) * amp * parallaxWrapperHeight
          el.style.transform = 'translateY('+offset+'px)'
        }) // elements forEach
      }
    }) // wrappers forEach
  })
}

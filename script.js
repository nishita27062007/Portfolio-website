/***********************
  UTILITY FUNCTIONS
************************/
// Debounce function for performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Easing function for smooth animations
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/***********************
  DARK / LIGHT MODE (ENHANCED)
************************/
const toggleBtn = document.getElementById("themeToggle")

function setTheme(mode) {
  document.body.classList.toggle("dark", mode === "dark")
  toggleBtn.textContent = mode === "dark" ? "🌞" : "🌙"
  localStorage.setItem("theme", mode)

  // Smooth transition effect
  document.body.style.transition = "background-color 0.5s ease, color 0.5s ease"
}

toggleBtn?.addEventListener("click", (event) => {
  const isDark = document.body.classList.contains("dark")
  setTheme(isDark ? "light" : "dark")

  // Add ripple effect on button click
  createRipple(event)
})

// Ripple effect for button clicks
function createRipple(event) {
  const button = event.currentTarget
  const ripple = document.createElement("span")
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
  `

  button.style.position = "relative"
  button.style.overflow = "hidden"
  button.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

// Add ripple animation styles
if (!document.getElementById("ripple-styles")) {
  const style = document.createElement("style")
  style.id = "ripple-styles"
  style.textContent = `
    @keyframes ripple-animation {
      to { transform: scale(4); opacity: 0; }
    }
  `
  document.head.appendChild(style)
}

/***********************
  HERO TYPING EFFECT (ENHANCED WITH CURSOR)
************************/
const heroText = ["Computer Engineering Student", "Creative Thinker", "Problem Solver", "Aspiring Developer"]

function startHeroTyping() {
  const el = document.querySelector(".hero p")
  if (!el) return

  let i = 0,
    j = 0,
    deleting = false

  function type() {
    const currentText = heroText[i].slice(0, j)
    el.innerHTML = currentText + '<span class="typing-cursor">|</span>'

    if (!deleting) {
      j++
      if (j === heroText[i].length + 1) {
        deleting = true
        setTimeout(type, 1500)
        return
      }
    } else {
      j--
      if (j === 0) {
        deleting = false
        i = (i + 1) % heroText.length
      }
    }
    setTimeout(type, deleting ? 30 : 80)
  }
  type()
}

// Add cursor blink animation
if (!document.getElementById("cursor-styles")) {
  const style = document.createElement("style")
  style.id = "cursor-styles"
  style.textContent = `
    .typing-cursor {
      animation: blink 0.7s infinite;
      font-weight: bold;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `
  document.head.appendChild(style)
}

/***********************
  ABOUT TYPING (ENHANCED)
************************/
const aboutContent = `
I am Nishita Bhadouria, a Computer Engineering student with a strong
interest in understanding concepts in depth. I possess good communication
skills and have a creative inclination towards dance and art.
Academically focused and creatively balanced, I enjoy continuous learning
and self-improvement.
`

function startAboutTyping() {
  const el = document.getElementById("aboutText")
  if (!el) return

  let i = 0
  let lastTime = performance.now()

  function type(currentTime) {
    const deltaTime = currentTime - lastTime

    if (deltaTime > 15) {
      if (i < aboutContent.length) {
        el.textContent += aboutContent.charAt(i++)
        lastTime = currentTime
      } else {
        return
      }
    }

    if (i < aboutContent.length) {
      requestAnimationFrame(type)
    }
  }

  el.textContent = ""
  requestAnimationFrame(type)
}

/***********************
  JOURNEY / EDUCATION (UPDATED FOR NEON CARD LAYOUT)
************************/
const journeyData = [
  {
    category: "Education",
    title: "Divine Child High School",
    year: "2012 - 2023",
    description: "Completed my schooling with strong academic foundation. HSC SCORE 90.6"
  },
  {
    category: "Education",
    title: "AAVP Patel Jr. College",
    year: "2023 - 2025",
    description: "Pursued junior college, building critical thinking skills. HSC SECOND RANK IN SCIENCE DEPARTMENT"
  },
  {
    category: "Education",
    title: "Fr. Conceicao Rodrigues College of Engineering",
    year: "2025 - Present",
    description: "Currently pursuing Computer Engineering, expanding technical expertise."
  }
]

function renderJourney() {
  const container = document.getElementById("journeyGrid");
  if (!container) return;

  // New map structure to support the Indicator (dot/line) and the Card
  container.innerHTML = journeyData
    .map(
      (item, index) => `
      <div class="journey-item reveal" style="transition-delay: ${index * 0.15}s">
        <div class="journey-indicator">
          <div class="dot"></div>
          <div class="line"></div>
        </div>
        
        <div class="journey-card">
          <span class="card-category">${item.category}</span>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-description">${item.description}</p>
          <span class="card-date">${item.year}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function observeJourney() {
  // Update observer to look for the journey-item container
  document.querySelectorAll(".journey-item").forEach((el) => observer.observe(el))
}

/***********************
  SKILLS (ENHANCED WITH STAGGERED ANIMATION)
************************/
const skills = [
  { name: "C", level: 90 },
  { name: "C++", level: 85 },
  { name: "HTML", level: 95 },
  { name: "MySQL", level: 80 },
  { name: "LaTeX", level: 70 },
  { name: "Canva", level: 85 },
  { name: "Communication", level: 90 },
  { name: "Leadership", level: 85 },
]

function renderSkills() {
  const grid = document.getElementById("skillsGrid")
  if (!grid) return

  grid.innerHTML = skills
    .map(
      (skill, index) => `
    <div class="skill reveal" style="transition-delay: ${index * 0.1}s">
      <span>${skill.name}</span>
      <div class="progress">
        <div class="progress-bar" data-level="${skill.level}"></div>
      </div>
      <span class="skill-percentage">0%</span>
    </div>
  `
    )
    .join("")
}

/***********************
  INTERSECTION OBSERVER (BETTER PERFORMANCE)
************************/
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")

      // Animate progress bars smoothly
      const bar = entry.target.querySelector(".progress-bar")
      const percentage = entry.target.querySelector(".skill-percentage")

      if (bar) {
        const targetLevel = Number.parseInt(bar.dataset.level)
        animateProgressBar(bar, percentage, targetLevel)
      }

      // Unobserve after animation
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

function animateProgressBar(bar, percentageEl, targetLevel) {
  const start = 0
  const duration = 1500
  const startTime = performance.now()

  function animate(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutCubic(progress)
    const currentLevel = Math.floor(easedProgress * targetLevel)

    bar.style.width = currentLevel + "%"
    if (percentageEl) {
      percentageEl.textContent = currentLevel + "%"
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function observeElements() {
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
}

/***********************
  SMOOTH SCROLL + NAV (ENHANCED)
************************/
document.querySelectorAll(".navbar nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const target = document.querySelector(link.getAttribute("href"))

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      history.pushState(null, "", link.getAttribute("href"))
    }
  })
})

const highlightNav = debounce(() => {
  const scrollY = window.scrollY + 100

  document.querySelectorAll("section[id]").forEach((sec) => {
    const link = document.querySelector(`a[href="#${sec.id}"]`)
    const top = sec.offsetTop
    const height = sec.offsetHeight

    if (scrollY >= top && scrollY < top + height) {
      link?.classList.add("active-link")
    } else {
      link?.classList.remove("active-link")
    }
  })
}, 50)

/***********************
  SCROLL TO TOP BUTTON (NEW FEATURE)
************************/
function createScrollToTop() {
  if (document.getElementById("scrollToTop")) return

  const btn = document.createElement("button")
  btn.id = "scrollToTop"
  btn.innerHTML = "↑"
  btn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  `

  document.body.appendChild(btn)

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })

  // Show/hide on scroll
  const toggleButton = debounce(() => {
    if (window.scrollY > 300) {
      btn.style.opacity = "1"
      btn.style.transform = "scale(1)"
    } else {
      btn.style.opacity = "0"
      btn.style.transform = "scale(0)"
    }
  }, 100)

  window.addEventListener("scroll", toggleButton)
}

/***********************
  CURSOR TRAIL EFFECT (NEW UNIQUE FEATURE)
************************/
const cursorTrail = []
const maxTrailLength = 20

function createCursorTrail() {
  document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      animation: fade-trail 0.8s ease-out forwards;
    `

    document.body.appendChild(trail)
    cursorTrail.push(trail)

    if (cursorTrail.length > maxTrailLength) {
      const oldTrail = cursorTrail.shift()
      oldTrail?.remove()
    }

    setTimeout(() => trail.remove(), 800)
  })

  // Add animation styles
  if (!document.getElementById("trail-styles")) {
    const style = document.createElement("style")
    style.id = "trail-styles"
    style.textContent = `
      @keyframes fade-trail {
        to {
          opacity: 0;
          transform: scale(0);
        }
      }
    `
    document.head.appendChild(style)
  }
}

/***********************
  PARALLAX EFFECT (NEW FEATURE)
************************/
function addParallax() {
  const parallaxElements = document.querySelectorAll(".hero, .about")

  const handleParallax = debounce(() => {
    const scrolled = window.scrollY

    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + index * 0.2
      const yPos = -(scrolled * speed)
      el.style.transform = `translateY(${yPos}px)`
    })
  }, 10)

  window.addEventListener("scroll", handleParallax)
}

/***********************
  LANDING PAGE (ENHANCED)
************************/
document.getElementById("enterSiteBtn")?.addEventListener("click", (e) => {
  const landingPage = document.querySelector(".landing-page")

  // Add fade-out animation
  landingPage.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  landingPage.style.opacity = "0"
  landingPage.style.transform = "scale(0.95)"

  setTimeout(() => {
    landingPage.style.display = "none"
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
  }, 500)

  createRipple(e)
})

/***********************
  KEYBOARD SHORTCUTS (NEW FEATURE)
************************/
function setupKeyboardShortcuts() {
  const shortcuts = {
    1: "#home",
    2: "#about",
    3: "#skills",
    4: "#contact",
  }

  document.addEventListener("keydown", (e) => {
    if (e.altKey && shortcuts[e.key]) {
      e.preventDefault()
      document.querySelector(shortcuts[e.key])?.scrollIntoView({ behavior: "smooth" })
    }
  })
}

/***********************
  FORM SUBMIT (ENHANCED)
************************/
const form = document.querySelector(".contact form")
const sendBtn = document.getElementById("sendBtn")
const successMsg = document.querySelector(".success-msg")

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate form
    const inputs = form.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false
        input.style.borderColor = "#ef4444"
        setTimeout(() => (input.style.borderColor = ""), 2000)
      }
    })

    if (!isValid) return

    sendBtn.classList.add("loading")
    sendBtn.disabled = true

    setTimeout(() => {
      sendBtn.classList.remove("loading")
      sendBtn.disabled = false

      if (successMsg) {
        successMsg.style.display = "block"
        successMsg.style.animation = "slideInUp 0.5s ease forwards"
      }

      form.reset()

      setTimeout(() => {
        if (successMsg) {
          successMsg.style.animation = "fadeOut 0.5s ease"
          setTimeout(() => (successMsg.style.display = "none"), 500)
        }
      }, 4000)
    }, 2000)
  })
}

/***********************
  LOADING ANIMATION
************************/
function showLoadingAnimation() {
  const landing = document.querySelector(".landing-page")
  if (landing) {
    landing.style.opacity = "0"
    setTimeout(() => {
      landing.style.transition = "opacity 0.8s ease"
      landing.style.opacity = "1"
    }, 100)
  }
}

/***********************
  INIT (ENHANCED)
************************/
window.addEventListener("DOMContentLoaded", () => {
  showLoadingAnimation()
  setTheme(localStorage.getItem("theme") || "light")
  startHeroTyping()
  renderSkills()
  renderJourney() 
  observeElements()
  observeJourney()
  createScrollToTop()
  createCursorTrail()
  addParallax()
  setupKeyboardShortcuts()

  // Delay about typing for better UX
  setTimeout(startAboutTyping, 500)
})

window.addEventListener("scroll", () => {
  highlightNav()
})

// Add smooth scroll behavior to all links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  if (!anchor.closest(".navbar")) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      target?.scrollIntoView({ behavior: "smooth" })
    })
  }
})

/***********************
  PERFORMANCE OPTIMIZATION
************************/
// Reduce animations on low-end devices
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.style.setProperty("--transition-speed", "0s")
}

// Pause animations when tab is not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.style.animationPlayState = "paused"
  } else {
    document.body.style.animationPlayState = "running"
  }
})

console.log("🚀 Enhanced JavaScript loaded successfully!")
console.log("💡 Keyboard shortcuts: Alt + 1-4 to navigate sections")
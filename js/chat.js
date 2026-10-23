/**
 * Baljeet Singh Portfolio — Interactive Chat Widget
 * Matches screenshot visual design & provides responsive instant assistance
 */

(function () {
  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", initChatWidget);

  function initChatWidget() {
    // Prevent duplicate initialization
    if (document.getElementById("portfolioChatWidget")) return;

    // Create Widget HTML
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "portfolio-chat-widget";
    widgetContainer.id = "portfolioChatWidget";

    widgetContainer.innerHTML = `
      <!-- Powered By Badge -->
      <div class="chat-powered-pill" id="chatPoweredPill">
        <i class="fas fa-sparkles" style="color: #7c5dfa;"></i> Powered by Baljeet
      </div>

      <!-- Main Chat Window -->
      <div class="portfolio-chat-window" id="chatWindow" role="dialog" aria-label="Customer Support Chat">
        <!-- Header -->
        <div class="chat-window-header">
          <div class="chat-header-left">
            <button class="chat-back-btn" id="chatCloseBtn" aria-label="Close chat">
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="chat-header-title">Customer Support</span>
          </div>
          <button class="chat-menu-btn" id="chatMenuBtn" aria-label="Chat options">
            <i class="fas fa-bars"></i>
          </button>
        </div>

        <!-- Messages Area -->
        <div class="chat-window-messages" id="chatMessages">
          <!-- Initial Bot Message -->
          <div class="chat-msg-row">
            <div class="chat-bot-avatar">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="#E0E7FF"/>
                <circle cx="32" cy="24" r="12" fill="#6366F1"/>
                <path d="M12 56C12 45 21 39 32 39C43 39 52 45 52 56" fill="#4F46E5"/>
              </svg>
            </div>
            <div class="chat-msg-content">
              <span class="chat-sender-label">Customer Support</span>
              <div class="chat-bubble-bot">
                👋 Hi ,I am Baljeet Singh !<br>How can I help ?
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="chat-quick-actions" id="chatQuickActions">
            <button class="chat-action-chip" data-action="question">I have a question</button>
            <button class="chat-action-chip" data-action="about">About me</button>
            <button class="chat-action-chip" data-action="collab">Contact for collaboration</button>
            <button class="chat-action-chip" data-action="connect">Connect With Me</button>
          </div>
        </div>

        <!-- Input Footer -->
        <div class="chat-window-footer">
          <form class="chat-input-form" id="chatForm">
            <input 
              type="text" 
              class="chat-text-input" 
              id="chatInput" 
              placeholder="Type here and press enter.." 
              autocomplete="off"
            />
            <button type="button" class="chat-icon-btn" id="chatAttachBtn" title="Quick Links" aria-label="Attachment">
              <i class="fas fa-paperclip"></i>
            </button>
            <button type="button" class="chat-icon-btn" id="chatEmojiBtn" title="Insert Emoji" aria-label="Insert Emoji">
              <i class="far fa-smile"></i>
            </button>
            <button type="submit" class="chat-icon-btn chat-send-btn" title="Send message" aria-label="Send">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- Floating Launcher Button -->
      <button class="chat-launcher-btn" id="chatLauncherBtn" aria-label="Open live chat">
        <span class="chat-launcher-badge"></span>
        <i class="fas fa-comment-dots btn-icon-open"></i>
        <i class="fas fa-chevron-down btn-icon-close"></i>
      </button>
    `;

    document.body.appendChild(widgetContainer);

    // Elements
    const launcherBtn = document.getElementById("chatLauncherBtn");
    const closeBtn = document.getElementById("chatCloseBtn");
    const chatMessages = document.getElementById("chatMessages");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const quickActions = document.getElementById("chatQuickActions");
    const attachBtn = document.getElementById("chatAttachBtn");
    const emojiBtn = document.getElementById("chatEmojiBtn");

    // Toggle chat window
    function toggleChat() {
      const isOpen = widgetContainer.classList.toggle("is-open");
      if (isOpen) {
        setTimeout(() => chatInput.focus(), 300);
        scrollToBottom();
      }
    }

    launcherBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);

    // Emoji button helper
    emojiBtn.addEventListener("click", () => {
      const emojis = ["👋", "🚀", "💻", "🔥", "✨", "🙌", "⭐"];
      const randEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      chatInput.value += randEmoji + " ";
      chatInput.focus();
    });

    // Attachment button helper -> gives quick contact shortcuts
    attachBtn.addEventListener("click", () => {
      botReply(
        "Here are my direct contact channels & resources:<br>" +
        "• 📧 <a href='mailto:baljeet.rathor2005@gmail.com'>baljeet.rathor2005@gmail.com</a><br>" +
        "• 💼 <a href='https://www.linkedin.com/in/baljeet-singh-8613b7317/' target='_blank' rel='noopener'>LinkedIn Profile</a><br>" +
        "• 🐙 <a href='https://github.com/B-ramgharia' target='_blank' rel='noopener'>GitHub Repositories</a><br>" +
        "• 🌐 <a href='projects.html'>View All Projects</a>"
      );
    });

    // Quick Action Handler
    quickActions.addEventListener("click", (e) => {
      const chip = e.target.closest(".chat-action-chip");
      if (!chip) return;

      const action = chip.dataset.action;
      const text = chip.textContent.trim();

      // Show user message
      addUserMessage(text);

      // Bot responses based on action
      setTimeout(() => {
        if (action === "about") {
          botReply(
            "I'm <strong>Baljeet Singh</strong>, a final-year <strong>B.Tech CSE-Data Science</strong> student. " +
            "I specialize in Full-Stack Web Development (Python, Flask, JavaScript) and Machine Learning data pipelines. " +
            "I love building real-world solutions that solve real problems!"
          );
        } else if (action === "collab") {
          botReply(
            "I'd love to collaborate on exciting projects or internships! 🚀<br><br>" +
            "📬 <strong>Email:</strong> <a href='mailto:baljeet.rathor2005@gmail.com'>baljeet.rathor2005@gmail.com</a><br>" +
            "💼 <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/baljeet-singh-8613b7317/' target='_blank' rel='noopener'>Baljeet Singh</a><br>" +
            "Feel free to drop a message anytime!"
          );
        } else if (action === "connect") {
          botReply(
            "Let's connect across platforms:<br><br>" +
            "🔗 <a href='https://www.linkedin.com/in/baljeet-singh-8613b7317/' target='_blank' rel='noopener'>LinkedIn Profile</a><br>" +
            "🐙 <a href='https://github.com/B-ramgharia' target='_blank' rel='noopener'>GitHub: @B-ramgharia</a><br>" +
            "✉️ <a href='mailto:baljeet.rathor2005@gmail.com'>Send Direct Email</a>"
          );
        } else if (action === "question") {
          botReply(
            "Ask me anything! Feel free to type below about:<br>" +
            "• <strong>Projects</strong> (Food-Vision AI, Diary App, ML models)<br>" +
            "• <strong>Skills</strong> (Python, Flask, TensorFlow, JavaScript)<br>" +
            "• <strong>Education</strong> (B.Tech CSE-DS)<br>" +
            "• Or how to contact me directly!"
          );
        }
      }, 500);
    });

    // Form Submission
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      addUserMessage(message);
      chatInput.value = "";

      // Process input
      handleUserQuery(message);
    });

    // Smart query processor
    function handleUserQuery(query) {
      showTypingIndicator();

      const q = query.toLowerCase();

      setTimeout(() => {
        removeTypingIndicator();

        if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
          botReply("Hello there! 😊 How can I assist you with Baljeet's portfolio today?");
        } else if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
          botReply(
            "Baljeet has built several impactful projects:<br>" +
            "1. <strong>Food-Vision AI:</strong> Computer vision food recognition & calorie estimator.<br>" +
            "2. <strong>Personal Diary Web App:</strong> Flask & SQLite secure journaling tool.<br>" +
            "3. <strong>Academic ML & Data Projects:</strong> NumPy, Pandas & Scikit-learn models.<br>" +
            "👉 <a href='projects.html'>Click here to see all projects with live demos!</a>"
          );
        } else if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("python")) {
          botReply(
            "Baljeet's core technical stack includes:<br>" +
            "• <strong>Languages:</strong> Python, C++, JavaScript, HTML5, CSS3, SQL<br>" +
            "• <strong>Frameworks:</strong> Flask, TensorFlow, Scikit-learn<br>" +
            "• <strong>Tools & DB:</strong> Git, GitHub, SQLite, Pandas, NumPy<br>" +
            "• <strong>Specialization:</strong> Data Science & Machine Learning"
          );
        } else if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("phone")) {
          botReply(
            "You can contact Baljeet directly:<br>" +
            "📧 Email: <a href='mailto:baljeet.rathor2005@gmail.com'>baljeet.rathor2005@gmail.com</a><br>" +
            "💼 LinkedIn: <a href='https://www.linkedin.com/in/baljeet-singh-8613b7317/' target='_blank' rel='noopener'>baljeet-singh-8613b7317</a><br>" +
            "Or fill out the Contact form on the homepage!"
          );
        } else if (q.includes("education") || q.includes("college") || q.includes("degree")) {
          botReply(
            "Baljeet is pursuing his <strong>B.Tech in Computer Science and Engineering (Data Science)</strong>, graduating in 2026."
          );
        } else if (q.includes("github")) {
          botReply(
            "Check out Baljeet's open-source repositories here:<br>" +
            "🐙 <a href='https://github.com/B-ramgharia' target='_blank' rel='noopener'>github.com/B-ramgharia</a>"
          );
        } else {
          botReply(
            "Thank you for reaching out! To discuss further or for inquiries, please email Baljeet at <a href='mailto:baljeet.rathor2005@gmail.com'>baljeet.rathor2005@gmail.com</a> or connect on <a href='https://www.linkedin.com/in/baljeet-singh-8613b7317/' target='_blank' rel='noopener'>LinkedIn</a>."
          );
        }
      }, 700);
    }

    // Add user message bubble
    function addUserMessage(text) {
      const msg = document.createElement("div");
      msg.className = "chat-msg-user";
      msg.textContent = text;
      chatMessages.appendChild(msg);
      scrollToBottom();
    }

    // Add bot reply bubble
    function botReply(htmlText) {
      const row = document.createElement("div");
      row.className = "chat-msg-row";
      row.innerHTML = `
        <div class="chat-bot-avatar">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="#E0E7FF"/>
            <circle cx="32" cy="24" r="12" fill="#6366F1"/>
            <path d="M12 56C12 45 21 39 32 39C43 39 52 45 52 56" fill="#4F46E5"/>
          </svg>
        </div>
        <div class="chat-msg-content">
          <span class="chat-sender-label">Customer Support</span>
          <div class="chat-bubble-bot">${htmlText}</div>
        </div>
      `;
      chatMessages.appendChild(row);
      scrollToBottom();
    }

    // Typing indicator
    function showTypingIndicator() {
      const typing = document.createElement("div");
      typing.className = "chat-typing-indicator";
      typing.id = "chatTyping";
      typing.innerHTML = `
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
      `;
      chatMessages.appendChild(typing);
      scrollToBottom();
    }

    function removeTypingIndicator() {
      const typing = document.getElementById("chatTyping");
      if (typing) typing.remove();
    }

    function scrollToBottom() {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
})();

class SocketService {
  constructor() {
    this.ws = null;
    this.listeners = {};
    this.messageBuffer = []; // store messages before connection
    this.url = null;
  }

  connect(url = "ws://localhost:3000") {
    if (this.ws) return this.ws; // already connected

    this.url = url;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("WebSocket connected");

      // flush buffered messages
      this.messageBuffer.forEach(msg => {
        this.ws.send(JSON.stringify(msg));
      });
      this.messageBuffer = [];

      // fire connect event
      if (this.listeners.connect) this.listeners.connect();
    };

    this.ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        const callback = this.listeners[data.type];
        if (callback) callback(data.data);
      } catch (err) {
        console.error("Invalid WS payload", err);
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket closed. Reconnecting...");
      setTimeout(() => this.connect(this.url), 1000);
    };

    return this.ws;
  }

  send(type, payload = {}) {
    const message = { type, payload };
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      console.log("Message sent:", message);
    } else {
      console.log("Socket not ready, buffering message:", message);
      this.messageBuffer.push(message);
    }
  }

  addListener(type, callback) {
    this.listeners[type] = callback;
  }

  removeListener(type) {
    delete this.listeners[type];
  }
}

const socketService = new SocketService();
export default socketService;

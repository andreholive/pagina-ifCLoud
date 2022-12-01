import socketIOClient from 'socket.io-client';

export default class WebSocketServices {
    constructor(engine){
        this.projectId = localStorage.getItem("projectID");
        this.token = localStorage.getItem("scopedToken");
        this.userId = localStorage.getItem("userId");
        this.engine = engine;
        this.socket = socketIOClient(`http://localhost:3333?token=${this.token}&userId=${this.userId}&projectId=${this.projectId}`, {
            reconnectionAttempts: 5,
        });
        this.startWebSocket();
    }

    _socket = () => this.socket;

    startWebSocket(){

        this.socket.on(this.userId, (msg) => {
            console.log('CHEGOU', msg);
            this.engine.fireEvent(msg.data, msg.action);
        });

        this.socket.on('connect', () => {
            this.socket.emit(this.projectId, {action: 'diagramLoad', data:''});
        });

        this.socket.on('reconnect_attempt', (attemptNumber) => {
            //diagram.setLocked(true)
        });

        this.socket.on('reconnect', () => {
            console.log('RE CONNECT');
        });

        this.socket.on('reconnect_failed', () => {
            //diagram.setLocked(true)
        });

        this.socket.on('disconnect', () => {
  
        });
    }

}
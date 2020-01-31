const websocket = new WebSocket('ws://localhost:3002');

websocket.onopen = () => {
    console.log('Success in connecting with web socket server');

    websocket.onmessage = (messageEvent) => {
        const tableRows = messageEvent.data;
        document.getElementById('tablebody').innerHTML = tableRows;
    };
};

websocket.onerror = () => {
    console.log('Unable to connect with ws server');
};
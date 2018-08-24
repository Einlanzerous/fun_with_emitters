const {generateMessage, generateLocationMessage} = require('../utils/message');

describe('generateMessage', () => {
    test('Should generate correct message object', () => {
        const from = 'Jimmy Johns';
        const text = 'I wish I had sponsored the NALCS';
        const generatedMessage = generateMessage(from, text);
        
        expect(generatedMessage).toHaveProperty('from', from);
        expect(generatedMessage).toHaveProperty('text', text);
        expect(generatedMessage.createdAt).toBeGreaterThan(0);
    });

    test('Should generate correct location message object', () => {
        const from = 'Spies';
        const latitude = 45.454;
        const longitude = -50.505;
        const expectedUrl = 'https://www.bing.com/maps/search?q=45.454,-50.505';
        const generatedLocationMessage = generateLocationMessage(from, latitude, longitude);

        expect(generatedLocationMessage).toHaveProperty('from', from);
        expect(generatedLocationMessage).toHaveProperty('url', expectedUrl);
        expect(generatedLocationMessage.createdAt).toBeGreaterThan(0);
    })
});
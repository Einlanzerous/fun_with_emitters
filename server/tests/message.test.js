const {generateMessage} = require('../utils/message');

describe('generateMessage', () => {
    test('Should generate correct message object', () => {
        const from = 'Jimmy Johns'
        const text = 'I wish I had sponsored the NALCS'
        const generatedMessage = generateMessage(from, text);
        
        expect(generatedMessage).toHaveProperty('from', from);
        expect(generatedMessage).toHaveProperty('text', text);
        expect(generatedMessage.createdAt).toBeGreaterThan(0);
    });
});
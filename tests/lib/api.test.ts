const mockCreate = jest.fn().mockResolvedValue({
  choices: [{ message: { content: 'idea' } }],
});

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: { completions: { create: mockCreate } },
  }));
});

import { generateIdeas } from '@/lib/api';

test('generateIdeas calls openai', async () => {
  const res = await generateIdeas(['a'], ['b']);
  expect(res).toBe('idea');
  expect(mockCreate).toHaveBeenCalled();
});

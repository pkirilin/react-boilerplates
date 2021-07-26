import asJestMock from './asJestMock';

type FetchMockWithExtensions = jest.Mock<Promise<Response>> & FetchMockExtensions;

type FetchMockExtensions = {
  mockResponseTextOnce: (responseText: string) => FetchMockWithExtensions;
};

export default function asFetchMock(): FetchMockWithExtensions {
  const fetchMock = asJestMock(global.fetch);
  const fetchMockExtensions: FetchMockExtensions = {
    mockResponseTextOnce(responseText: string) {
      fetchMock.mockResolvedValueOnce({
        ...new Response(),
        text: jest.fn().mockResolvedValueOnce(responseText),
        clone: jest.fn(),
      });

      return Object.assign(this, fetchMock);
    },
  };

  return Object.assign(fetchMockExtensions, fetchMock);
}

import './test-utils/customExpects';
import '@testing-library/jest-dom';

global.fetch = jest.fn() as jest.Mock<Promise<Response>>;

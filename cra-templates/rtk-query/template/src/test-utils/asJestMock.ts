// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func<TResult> = (...args: any[]) => TResult;

export default function asJestMock<TResult>(func: Func<TResult>): jest.Mock<TResult> {
  return func as jest.Mock<TResult>;
}

import { TaskIsCompletedPipe } from './task-is-completed.pipe';

describe('TaskIsCompletedPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskIsCompletedPipe();
    expect(pipe).toBeTruthy();
  });
});

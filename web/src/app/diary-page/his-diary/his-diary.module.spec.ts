import { HisDiaryModule } from './his-diary.module';

describe('HisDiaryModule', () => {
  let hisDiaryModule: HisDiaryModule;

  beforeEach(() => {
    hisDiaryModule = new HisDiaryModule();
  });

  it('should create an instance', () => {
    expect(hisDiaryModule).toBeTruthy();
  });
});

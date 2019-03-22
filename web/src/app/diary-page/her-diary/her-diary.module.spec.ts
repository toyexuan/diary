import { HerDiaryModule } from './her-diary.module';

describe('HerDiaryModule', () => {
  let herDiaryModule: HerDiaryModule;

  beforeEach(() => {
    herDiaryModule = new HerDiaryModule();
  });

  it('should create an instance', () => {
    expect(herDiaryModule).toBeTruthy();
  });
});
